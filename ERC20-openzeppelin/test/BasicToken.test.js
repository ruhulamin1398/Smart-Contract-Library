// SPDX-License-Identifier: MIT
const BasicToken = artifacts.require("BasicToken");

contract("BasicToken", (accounts) => {
  let basicTokenInstance;

  const initialSupply = 1000;

  beforeEach(async () => {
    basicTokenInstance = await BasicToken.new(initialSupply);
  });

  it("should deploy with the correct name and symbol", async () => {
    const name = await basicTokenInstance.name();
    const symbol = await basicTokenInstance.symbol();

    assert.equal(name, "BasicToken", "Name is incorrect");
    assert.equal(symbol, "BSC", "Symbol is incorrect");
  });

  it("should assign the initial supply to the deployer", async () => {
    const deployerBalance = await basicTokenInstance.balanceOf(accounts[0]);

    assert.equal(deployerBalance, initialSupply, "Initial supply not assigned to deployer");
  });

  it("should transfer tokens correctly", async () => {
    const sender = accounts[0];
    const receiver = accounts[1];
    const amount = 100;

    await basicTokenInstance.transfer(receiver, amount, { from: sender });

    const senderBalance = await basicTokenInstance.balanceOf(sender);
    const receiverBalance = await basicTokenInstance.balanceOf(receiver);

    assert.equal(senderBalance.toNumber(), initialSupply - amount, "Sender balance incorrect");
    assert.equal(receiverBalance.toNumber(), amount, "Receiver balance incorrect");
  });
});
