// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";


contract LoanManagementToken is ERC20, Ownable {
    using SafeMath for uint256;

    struct Loan {
        uint256 collateral;
        uint256 amount;
        uint256 interestRate; // Annual interest rate in basis points (100 basis points = 1%)
        uint256 startTime;
        bool isActive;
    }

    mapping(address => Loan) public loans;
    mapping(address => uint256) public collaterals;

    uint256 public collateralRatio; // Required collateral ratio (e.g., 150% = 1.5 * loan amount)
    uint256 public liquidationThreshold; // Threshold at which collateral can be liquidated

    event LoanTaken(address indexed borrower, uint256 amount, uint256 collateral, uint256 interestRate);
    event LoanRepaid(address indexed borrower, uint256 amount);
    event LoanLiquidated(address indexed borrower, uint256 collateral);

    constructor(string memory name, string memory symbol, uint256 _collateralRatio, uint256 _liquidationThreshold) 
        ERC20(name, symbol) 
    {
        require(_collateralRatio >= 100, "Collateral ratio must be at least 100%");
        require(_liquidationThreshold <= _collateralRatio, "Liquidation threshold must be less than or equal to collateral ratio");
        
        collateralRatio = _collateralRatio;
        liquidationThreshold = _liquidationThreshold;
    }

    function takeLoan(uint256 loanAmount, uint256 interestRate) external payable {
        require(loans[msg.sender].isActive == false, "Active loan exists");
        uint256 requiredCollateral = loanAmount.mul(collateralRatio).div(100);
        require(msg.value >= requiredCollateral, "Insufficient collateral");

        loans[msg.sender] = Loan({
            collateral: msg.value,
            amount: loanAmount,
            interestRate: interestRate,
            startTime: block.timestamp,
            isActive: true
        });

        _mint(msg.sender, loanAmount);
        emit LoanTaken(msg.sender, loanAmount, msg.value, interestRate);
    }

    function repayLoan() external {
        Loan storage loan = loans[msg.sender];
        require(loan.isActive, "No active loan");

        uint256 accruedInterest = calculateInterest(msg.sender);
        uint256 totalRepayment = loan.amount.add(accruedInterest);

        require(balanceOf(msg.sender) >= totalRepayment, "Insufficient balance to repay loan");

        _burn(msg.sender, totalRepayment);
        payable(msg.sender).transfer(loan.collateral);

        loan.isActive = false;
        emit LoanRepaid(msg.sender, totalRepayment);
    }

    function liquidateLoan(address borrower) external onlyOwner {
        Loan storage loan = loans[borrower];
        require(loan.isActive, "No active loan");

        uint256 accruedInterest = calculateInterest(borrower);
        uint256 totalRepayment = loan.amount.add(accruedInterest);
        uint256 requiredCollateral = totalRepayment.mul(collateralRatio).div(100);

        if (loan.collateral < requiredCollateral) {
            payable(owner()).transfer(loan.collateral);
            _burn(borrower, loan.amount);

            loan.isActive = false;
            emit LoanLiquidated(borrower, loan.collateral);
        }
    }

    function calculateInterest(address borrower) public view returns (uint256) {
        Loan storage loan = loans[borrower];
        if (!loan.isActive) return 0;

        uint256 loanDuration = block.timestamp.sub(loan.startTime);
        uint256 annualInterest = loan.amount.mul(loan.interestRate).div(10000);
        uint256 accruedInterest = annualInterest.mul(loanDuration).div(365 days);

        return accruedInterest;
    }

    function updateCollateralRatio(uint256 newRatio) external onlyOwner {
        require(newRatio >= 100, "Collateral ratio must be at least 100%");
        collateralRatio = newRatio;
    }

    function updateLiquidationThreshold(uint256 newThreshold) external onlyOwner {
        require(newThreshold <= collateralRatio, "Liquidation threshold must be less than or equal to collateral ratio");
        liquidationThreshold = newThreshold;
    }
}
