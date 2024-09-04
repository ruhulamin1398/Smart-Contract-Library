# LoanManagementToken Contract

## Overview

The `LoanManagementToken` contract is designed to facilitate loans with collateral management. Borrowers can take loans by providing collateral, repay the loans with interest, and owners can liquidate loans if collateral falls below a certain threshold. This contract inherits ERC20 functionality and includes additional features for managing loans and collateral.

## Contract Structure

### Inheritance

- Inherits from `ERC20` and `Ownable` contracts provided by OpenZeppelin.
- Utilizes SafeMath for arithmetic operations to prevent overflows and underflows.

### State Variables

- `loans`: Mapping to track loan details for each borrower.
- `collaterals`: Mapping to store collateral balances for each borrower.
- `collateralRatio`: Required collateral ratio for loan issuance.
- `liquidationThreshold`: Threshold for collateral liquidation.

### Structs

- `Loan`: Struct to represent loan details including collateral, loan amount, interest rate, start time, and loan status.

### Events

- `LoanTaken`: Emitted when a borrower takes a loan.
- `LoanRepaid`: Emitted when a borrower repays a loan.
- `LoanLiquidated`: Emitted when a loan is liquidated due to insufficient collateral.

## Functions

- `takeLoan(uint256 loanAmount, uint256 interestRate) external payable`: Allows borrowers to take loans by providing collateral.
- `repayLoan() external`: Allows borrowers to repay their loans.
- `liquidateLoan(address borrower) external onlyOwner`: Allows the owner to liquidate a loan if collateral is insufficient.
- `calculateInterest(address borrower) public view returns (uint256)`: Calculates the interest accrued on a loan.
- `updateCollateralRatio(uint256 newRatio) external onlyOwner`: Updates the collateral ratio.
- `updateLiquidationThreshold(uint256 newThreshold) external onlyOwner`: Updates the liquidation threshold.

## Testing

### Overview

The test suite verifies the functionality of the LoanManagementToken contract using Mocha and Truffle.

### Test Cases

1. **Loan Taking**: Ensures borrowers can take loans and receive tokens.
2. **Loan Repayment**: Verifies borrowers can repay their loans and receive collateral back.
3. **Loan Liquidation**: Tests the liquidation of loans by the owner if collateral is insufficient.
4. **Collateral Sufficiency**: Checks that loans cannot be liquidated if collateral is sufficient.


## License

The LoanManagementToken contract is licensed under the GPL-3.0 License.

