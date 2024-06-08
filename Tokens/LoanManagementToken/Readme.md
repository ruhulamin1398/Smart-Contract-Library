# StakingToken Contract  

## Overview

The `StakingToken` contract is an ERC20 token with staking functionality. It allows users to stake tokens and earn interest based on an annual percentage yield (APY). The contract also supports pausing functionality, allowing the owner to halt staking and unstaking operations temporarily.

## Contract Structure

### Inheritance

The contract inherits from the following OpenZeppelin contracts:
- `ERC20`: Standard ERC20 token implementation.
- `Ownable`: Provides basic access control where an account (owner) can be granted exclusive access to specific functions.
- `Pausable`: Allows the contract to be paused and unpaused by the owner.

### Constants

- `APY_BASE`: A constant used as the base for APY calculation, set to 10,000 (representing 100%).

### State Variables

- `stakingInfo`: A mapping that stores staking information for each staker, including the staked amount, the time of staking, and the APY.

### Structs

- `StakingInfo`: A struct that holds staking details:
  - `stakedAmount`: The amount of tokens staked.
  - `createdAt`: The timestamp when tokens were staked.
  - `apy`: The annual percentage yield.

### Events

- `Staked`: Emitted when a user stakes tokens.
- `Unstaked`: Emitted when a user unstakes tokens.

## Functions

### Constructor
constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

Initializes the token with a name and symbol.

### Stake

function stake(uint amount, uint apy) external whenNotPaused


Allows a user to stake a specified amount of tokens with a given APY.

- `amount`: The number of tokens to stake.
- `apy`: The annual percentage yield.

Requirements:
- `amount` must be greater than zero.
- `apy` must be greater than zero.
- The contract must not be paused.

### Unstake
function unstake() external whenNotPaused


Allows a user to unstake their tokens and receive the staked amount plus accrued interest.

Requirements:
- The user must have staked tokens.
- The contract must not be paused.

### Calculate Interest

function calculateInterest(StakingInfo memory info) internal view returns (uint)


Calculates the interest accrued for a given staking information.

- `info`: The staking information of the user.

### Pause

function pause() external onlyOwner


Pauses the staking and unstaking operations. Can only be called by the owner.

### Unpause

function unpause() external onlyOwner


Unpauses the staking and unstaking operations. Can only be called by the owner.

---


 
# StakingToken Contract Tests  

## Overview

This documentation outlines the tests for the `StakingToken` contract, covering the main functionalities such as staking, unstaking, pausing, and unpausing operations.

## Test Setup

### Test Framework

The tests are written using the Truffle framework and Mocha testing library.

### Contracts

- `StakingToken`: The main contract being tested.

### Test Accounts

- `owner`: The account deploying the contract and performing owner-only actions.
- `signer2`: Another account interacting with the contract (e.g., staking and unstaking tokens).

## Test Cases

### Before Each Hook

Sets up the contract instance and initial balances before each test.

### Staking Tests

#### Test: Stake Tokens

```javascript
it("should allow staking of tokens", async () => {
    await stakingInstance.stake(amount, apy, { from: signer2 });
    const stakedInfo = await stakingInstance.stakingInfo(signer2);
    assert.equal(stakedInfo.stakedAmount.toString(), amount, "Staked amount is incorrect");
    assert.equal(stakedInfo.apy.toString(), apy, "APY is incorrect");
});
```

### Unstaking Tests

#### Test: Unstake Tokens

```javascript

it("should allow unstaking of tokens and calculate interest", async () => {
    await stakingInstance.stake(amount, apy, { from: signer2 });
    await time.increase(time.duration.days(365)); // Simulate one year passing
    await stakingInstance.unstake({ from: signer2 });
    const balance = await stakingInstance.balanceOf(signer2);
    const expectedBalance = new BN(amount).add(new BN(web3.utils.toWei("15", "ether")));
    assert.equal(balance.toString(), expectedBalance.toString(), "Unstaked balance is incorrect");
});
```
### Pause Tests


#### Test: Pause Contract

```javascript

it("should pause the contract", async () => {
    await stakingInstance.pause({ from: owner });
    const paused = await stakingInstance.paused();
    assert.equal(paused, true, "Contract is not paused");
});
```


#### Test: Unpause Contract

```javascript

it("should unpause the contract", async () => {
    await stakingInstance.pause({ from: owner });
    await stakingInstance.unpause({ from: owner });
    const paused = await stakingInstance.paused();
    assert.equal(paused, false, "Contract is not unpaused");
});

```

These tests ensure the StakingToken contract functions correctly for staking, unstaking, pausing, and unpausing operations. By running these tests, developers can verify the expected behavior and stability of the contract under various scenarios.