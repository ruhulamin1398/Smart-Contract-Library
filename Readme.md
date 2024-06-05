## BasicERC20Token 
Implemented a  [Basic ERC20  token](/ERC20Basic/contracts/BasicERC20Token.sol)   contract with essential functionalities like transfer, approve, and transferFrom.

## Intermediate Features

### Burnable Token:
[Burnable Token](/ERC20Basic/contracts/BasicERC20BurnableToken.sol)  allows users to burn (destroy) their tokens, reducing the total supply.
#### Tests: 
Ensure tokens are burned correctly and the total supply is updated.

### Mintable Token:
[Mintable Token](/ERC20Basic/contracts/MintableToken.sol) allows the contract owner to mint (create) new tokens, increasing the total supply.
#### Tests: 
Ensure new tokens are minted correctly and assigned to the right accounts.

### Pausable Token:
 [Pausable Token](/ERC20Basic/contracts/PausableToken.sol) allows the contract owner to pause all token transfers.
#### Tests: 
Ensure token transfers are blocked when paused and allowed when unpaused.

## Advanced Features

### Capped Token:
[Capped Token](/ERC20Basic/contracts/CappedToken.sol) similar to a mintable token, but with a cap on the maximum supply.
#### Tests: 
Ensure minting cannot exceed the cap.

###   Upgradeable Token:
[proxy](/ERC20Basic//contracts/Proxy.sol),    [Upgradeable Token](/ERC20Basic/contracts/UpgradeableToken.sol), [Upgradeable Token 2](/ERC20Basic//contracts/UpgradeableTokenV2.sol)  uses a proxy pattern to allow the contract logic to be upgraded while preserving the state.
#### Tests: 
Ensure state is preserved correctly across upgrades.

###   Snapshot Token:
Allows taking snapshots of balances at specific points in time, useful for governance tokens.
#### Tests: 
Ensure snapshots capture the correct state and can be queried.
