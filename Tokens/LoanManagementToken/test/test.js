const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const LoanManagementToken = artifacts.require('LoanManagementToken');

contract('LoanManagementToken', accounts => {
    const [owner, borrower] = accounts;
    const collateralRatio = new BN(150); // 150%
    const liquidationThreshold = new BN(120); // 120%
    const loanAmount = web3.utils.toWei('1', 'ether');
    const interestRate = new BN(500); // 5%

    let loanManagementToken;

    beforeEach(async () => {
        loanManagementToken = await LoanManagementToken.new(
            'Loan Token',
            'LOAN',
            collateralRatio,
            liquidationThreshold
        );
    });

    it('should allow borrower to take a loan', async () => {
        const collateralAmount = new BN(loanAmount).mul(collateralRatio).div(new BN(100));
        console.log('Collateral Amount:', collateralAmount.toString());
        
        const tx = await loanManagementToken.takeLoan(loanAmount, interestRate, { from: borrower, value: collateralAmount });
        console.log('Transaction Receipt:', tx.receipt);
        
        await expectEvent(
            tx,
            'LoanTaken',
            { borrower, amount: loanAmount, collateral: collateralAmount, interestRate }
        );
        
        const borrowerBalance = await loanManagementToken.balanceOf(borrower);
        assert.strictEqual(borrowerBalance.toString(), loanAmount);
    });

    it('should allow borrower to repay the loan', async () => {
        const collateralAmount = new BN(loanAmount).mul(collateralRatio).div(new BN(100));
        await loanManagementToken.takeLoan(loanAmount, interestRate, { from: borrower, value: collateralAmount });

        const repayAmount = new BN(loanAmount).add(await loanManagementToken.calculateInterest(borrower));
        console.log('Repay Amount:', repayAmount.toString());
        await loanManagementToken.approve(loanManagementToken.address, repayAmount, { from: borrower });
        
        const tx = await loanManagementToken.repayLoan({ from: borrower });
        console.log('Transaction Receipt:', tx.receipt);

        await expectEvent(
            tx,
            'LoanRepaid',
            { borrower, amount: repayAmount }
        );

        const borrowerBalance = await loanManagementToken.balanceOf(borrower);
        assert.strictEqual(borrowerBalance.toString(), '0');
    });

    it('should allow owner to liquidate a loan if collateral is insufficient', async () => {
        const collateralAmount = web3.utils.toWei('1', 'ether');
        await loanManagementToken.takeLoan(loanAmount, interestRate, { from: borrower, value: collateralAmount });

        const newCollateralRatio = new BN(200); // Collateral ratio higher than collateral
        await loanManagementToken.updateCollateralRatio(newCollateralRatio, { from: owner });
        
        const tx = await loanManagementToken.liquidateLoan(borrower, { from: owner });
        console.log('Transaction Receipt:', tx.receipt);
        
        await expectEvent(
            tx,
            'LoanLiquidated',
            { borrower, collateral: collateralAmount }
        );
        
        const borrowerBalance = await loanManagementToken.balanceOf(borrower);
        assert.strictEqual(borrowerBalance.toString(), '0');
    });

    it('should not allow owner to liquidate a loan if collateral is sufficient', async () => {
        const collateralAmount = new BN(loanAmount).mul(collateralRatio).div(new BN(100));
        await loanManagementToken.takeLoan(loanAmount, interestRate, { from: borrower, value: collateralAmount });
        
        await expectRevert(
            loanManagementToken.liquidateLoan(borrower, { from: owner }),
            'Loan collateral is above liquidation threshold'
        );
    });
});
