# ARCoin 

## Overview

The ARCoin Staking Platform is an Ethereum-based system that enables users to stake ARCoin tokens and earn rewards based on an annual percentage yield (APY). This README provides an overview of the smart contracts and tests included in this repository.

## Contract Structure

### Contracts

- **ARCoin.sol**: Implements the ARCoin ERC20 token with additional staking functionality.
- **Staking.sol**: Manages the staking functionality of the ARCoin platform.

### Inheritance

- **ARCoin.sol**:
  - Inherits from `ERC20`, `Ownable`, and `Pausable` contracts provided by OpenZeppelin.
- **Staking.sol**:
  - Inherits from `ERC20` and `Ownable` contracts provided by OpenZeppelin.

### State Variables

- **ARCoin.sol**:
  - `stakingInfo`: Maps staking information for each staker.
- **Staking.sol**:
  - None

### Events

- **ARCoin.sol**:
  - `Staked`: Emitted when a user stakes tokens.
  - `Unstaked`: Emitted when a user unstakes tokens.
- **Staking.sol**:
  - None

## Functions

- **ARCoin.sol**:
  - `stake(uint amount, uint apy)`: Allows a user to stake tokens with a specified APY.
  - `unstake()`: Allows a user to unstake tokens and receive rewards.
  - `calculateInterest(StakingInfo memory info)`: Calculates interest accrued for a staking position.
  - `pause()`: Pauses staking operations.
  - `unpause()`: Unpauses staking operations.
- **Staking.sol**:
  - None

## Testing

### Test Setup

- **Framework**: Truffle with Mocha testing library.
- **Contracts**: ARCoin and Staking contracts.
- **Test Accounts**: Owner and signer accounts.

### Test Cases

- **Staking Tests**: Ensure users can stake tokens with correct APY.
- **Unstaking Tests**: Verify users can unstake tokens and receive rewards.
- **Pause Tests**: Confirm the contract can be paused and unpaused by the owner.



## License

The ARCoin Staking Platform is licensed under the MIT License.


