// SPDX-License-Identifier: MIT
const MintablePausableToken = artifacts.require("MintablePausableToken");

contract("MintablePausableToken", (accounts) => {
  let tokenInstance;

  const initialSupply = 1000;
  const owner = accounts[0];
  const recipient = accounts[1];

  beforeEach(async () => {
    tokenInstance = await MintablePausableToken.new(initialSupply);
  });

  it("should deploy with the correct name and symbol", async () => {
    const name = await tokenInstance.name();
    const symbol = await tokenInstance.symbol();

    assert.equal(name, "MintablePausableToken", "Name is incorrect");
    assert.equal(symbol, "MPT", "Symbol is incorrect");
  });

  it("should assign the initial supply to the deployer", async () => {
    const ownerBalance = await tokenInstance.balanceOf(owner);

    assert.equal(ownerBalance, initialSupply, "Initial supply not assigned to owner");
  });

  it("should allow minting by the owner", async () => {
    const amount = 100;

    await tokenInstance.mint(recipient, amount, { from: owner });

    const recipientBalance = await tokenInstance.balanceOf(recipient);

    assert.equal(recipientBalance, amount, "Minting failed");
  });

  it("should allow pausing and unpausing by the owner", async () => {
    await tokenInstance.pause();
  
    try {
      await tokenInstance.transfer(recipient, 100, { from: owner });
      assert.fail("Transfer should fail while paused");
    } catch (error) {
      assert(error.message.includes("ERC20Pausable: token transfer while paused"), "Unexpected error message");
    }
  
    await tokenInstance.unpause();
  
    const preBalance = await tokenInstance.balanceOf(recipient);
    await tokenInstance.transfer(recipient, 100, { from: owner });
    const postBalance = await tokenInstance.balanceOf(recipient);
  
    assert.equal(postBalance - preBalance, 100, "Transfer failed after unpausing");
  });
  
});
    