# ERC20 Token Contracts Overview

| Contract                         | Description                                              | Features                                              | Tests                                           | Code                                          |
|----------------------------------|----------------------------------------------------------|-------------------------------------------------------|-------------------------------------------------|-----------------------------------------------|
| `BasicERC20Token.sol`            | Basic ERC20 token with transfer, approve, and transferFrom functionalities. | Transfer, Approve, TransferFrom                      | N/A                                             | [solidity](/ERC20Basic/contracts/BasicERC20Token.sol), [OpenZepplin](/ERC20-openzeppelin/contracts/BasicERC20Token.sol) |
| `BasicERC20BurnableToken.sol`    | Allows burning (destroying) tokens, reducing total supply. | Burn                                                  | Ensure correct burning and total supply update | [solidity](/ERC20Basic/contracts/BasicERC20BurnableToken.sol) , [OpenZepplin](/ERC20-openzeppelin/contracts/BasicERC20BurnableToken.sol) |
| `MintableToken.sol`              | Allows contract owner to mint (create) new tokens.      | Mint                                                  | Ensure correct minting and token assignment    | [solidity](/ERC20Basic/contracts/MintableToken.sol) , [OpenZepplin](/ERC20-openzeppelin/contracts/MintablePausableToken.sol)  |
| `PausableToken.sol`              | Allows contract owner to pause all token transfers.     | Pause, Unpause                                        | Ensure token transfers are blocked when paused | [solidity](/ERC20Basic/contracts/PausableToken.sol) , [OpenZepplin](/ERC20-openzeppelin/contracts/MintablePausableToken.sol)  |
| `CappedToken.sol`                | Mintable token with a cap on the maximum supply.        | Mint, Cap                                             | Ensure minting cannot exceed the cap          | [solidity](/ERC20Basic/contracts/CappedToken.sol), [OpenZepplin](/ERC20-openzeppelin/contracts/CappedToken.sol)  |
| `UpgradeableToken.sol`           | Uses a proxy pattern to upgrade contract logic while preserving state. | Proxy, Upgrade                                        | Ensure state is preserved across upgrades     | [solidity](/ERC20Basic/contracts/UpgradeableToken.sol) , [OpenZepplin](/ERC20-openzeppelin/contracts/BasicERC20Token.sol) |
| `UpgradeableTokenV2.sol`         | Upgraded logic for the upgradeable token.               | Upgrade Logic                                         | Ensure correct state transition after upgrade | [solidity](/ERC20Basic/contracts/UpgradeableTokenV2.sol), [OpenZepplin](/ERC20-openzeppelin/contracts/BasicERC20Token.sol)  |
| `SnapshotToken.sol`              | Allows taking snapshots of balances at specific points in time. | Snapshot                                              | Ensure correct snapshotting and querying      | [solidity](/ERC20Basic/contracts/SnapshotToken.sol), [OpenZepplin](/ERC20-openzeppelin/contracts/BasicERC20Token.sol)  |


# Tokens

### 1. Stacking Token

Welcome to the project homepage! This project aims to provide a comprehensive solution for staking and unstaking tokens on the Ethereum blockchain. The core component of this project is the `StakingToken` contract, which allows users to stake their tokens, earn interest over time, and withdraw their staked tokens along with accrued interest. 

#### Features:

- **Staking**: Users can stake their tokens into the contract, locking them up for a specified period.
- **Interest Calculation**: The contract calculates interest on staked tokens based on the Annual Percentage Yield (APY) provided by the user.
- **Unstaking**: After the staking period ends, users can withdraw their staked tokens along with accrued interest.
- **Pausing**: The contract owner has the ability to pause and unpause the contract, providing additional security and control.

#### Test Coverage:

Comprehensive tests have been implemented to ensure the functionality and reliability of the `StakingToken` contract. These tests cover various scenarios, including staking, unstaking, pausing, and unpausing operations.

#### Get Started:

To explore the project in detail and access the codebase, visit the project page [here](/Tokens/Staking-token-contract/).


### 2. ARCoin     

The ARCoin Staking Platform is an Ethereum-based system for staking ARCoin tokens and earning rewards. It includes smart contracts for staking functionality, tests for ensuring contract integrity, and contribution guidelines for community involvement. 

#### Features

- Staking: Users can stake ARCoin tokens with specified annual percentage yield (APY).
- Rewards: Users earn rewards based on staking duration and APY.
- Pause/Unpause: Contract owner can pause and unpause staking operations.
- Testing: Comprehensive testing suite ensures contract functionality and reliability.
- Contributions: Community contributions are welcome via issues and pull requests.

#### Get Started:

To explore the project in detail and access the codebase, visit the project page [here](/Tokens/AR-coin/).


### 3. SuperShopRewards Token 

The `SuperShopRewards` contract is an ERC20 token that represents rewards for the Super Shop platform. Users can stake, transfer, mint, and burn these tokens. Key features include:


#### Features

- Minting new tokens as rewards
- Transfer of tokens between addresses
- Approving and transferring tokens from one account to another
- Burning tokens to reduce the total supply

#### Test Coverage

The contract is extensively tested with Mocha and Truffle to ensure the correctness of its functionalities:

- Name, symbol, and decimals are verified
- Initial supply and minting of new tokens are tested
- Token transfers and approvals are validated
- Token burning functionality is thoroughly tested

#### Get Started:

To explore the project in detail and access the codebase, visit the project page [here](/Tokens/Super-Shop-Rewards-token/).

### 4. LoanManagementToken 

The `LoanManagementToken` contract enables secure loan management with collateralization on Ethereum. Users can take loans, repay them with interest, and owners can liquidate loans if collateral falls below a specified threshold.

#### Features

- Loan Issuance: Borrowers can obtain loans by providing collateral, with the contract issuing tokens equivalent to the loan amount.
- Loan Repayment: Borrowers can repay their loans with interest, reclaiming their collateral upon repayment.
- Collateral Liquidation: Owners can liquidate loans if collateral falls below a defined threshold, ensuring loan security.
- Customizable Parameters: Owners can adjust collateral ratios and liquidation thresholds as needed.

#### Test Coverage

- Loan Taking: Ensures borrowers can successfully take loans by providing collateral.
- Loan Repayment: Verifies borrowers can repay their loans, reclaiming their collateral.
- Loan Liquidation: Tests the liquidation of loans by the owner if collateral is insufficient.
- Collateral Sufficiency: Checks that loans cannot be liquidated if collateral is sufficient.

Explore the project in detail and access the codebase [here](/Tokens/LoanManagementToken/).



# Contributing

Explain how others can contribute to your project. Include guidelines for code style, pull request submission, and any other relevant information.

1. Fork the repository
1. Create a new branch (`git checkout -b feature`)
1. Make your changes
1. Commit your changes (`git commit -am 'Add feature'`)
1. Push to the branch (`git push origin feature`)
1. Create a new Pull Request
Feel free to dive into the code, run the tests, and contribute to the project's development! If you have any questions or feedback, don't hesitate to reach out. Thank you for your interest in our project!
