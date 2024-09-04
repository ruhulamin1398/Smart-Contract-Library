# SuperShopRewards Token Contract

## Overview

The `SuperShopRewards` contract is an ERC20 token that represents rewards for the Super Shop platform. Users can stake, transfer, mint, and burn these tokens. The contract provides functionalities to manage the total supply, balances, allowances, and ownership.

## Contract Structure

### Contracts

- **SuperShopRewards.sol**: Implements the SuperShopRewards ERC20 token.

### Inheritance

- Inherits from `ERC20` and `Ownable` contracts provided by OpenZeppelin.

### Constants

- `DECIMALS`: Specifies the number of decimal places for token values.

### Functions

- `mintRewards(uint256 amount) external onlyOwner`: Mint new tokens as rewards.
- `getTotalSupply() external view returns (uint256)`: Get the total supply of the token.
- `getBalance(address account) external view returns (uint256)`: Get the balance of a specific account.
- `transferTokens(address recipient, uint256 amount) external returns (bool)`: Transfer tokens to a specific address.
- `transferTokensFrom(address sender, address recipient, uint256 amount) external returns (bool)`: Transfer tokens from one address to another.
- `approveSpender(address spender, uint256 amount) external returns (bool)`: Approve an address to spend tokens on behalf of the owner.
- `getAllowance(address owner, address spender) external view returns (uint256)`: Check the allowance of a spender for a specific owner.
- `burnTokens(address account, uint256 amount) external onlyOwner`: Burn tokens from an account.

## Testing

### Overview

The test suite verifies the functionality of the SuperShopRewards contract using Mocha and Truffle.

### Test Cases

1. **Name, Symbol, and Decimals**: Ensure correct name, symbol, and decimal places.
2. **Initial Supply**: Verify the correct initial supply of tokens.
3. **Mint Rewards**: Confirm new tokens can be minted by the owner.
4. **Transfer Tokens**: Test token transfer functionality.
5. **Approve and Transfer Tokens**: Test approval and transfer of tokens from one account to another.
6. **Burn Tokens**: Test token burning functionality.


## License

The SuperShopRewards contract is licensed under the GPL-3.0 License.

