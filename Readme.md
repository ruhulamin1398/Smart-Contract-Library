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

To explore the project in detail and access the codebase, visit the project page [here](/Staking-token-contract/).

Feel free to dive into the code, run the tests, and contribute to the project's development! If you have any questions or feedback, don't hesitate to reach out. Thank you for your interest in our project!
