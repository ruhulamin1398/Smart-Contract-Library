

const PausableToken = artifacts.require("PausableToken");
const BN = require('bn.js');

contract("PausableToken", (accounts) => {
  const [owner, addr1, addr2, ...addrs] = accounts;
  const initialSupply = new BN('1000').mul(new BN('10').pow(new BN('18'))); // 1000 * 10^18

  let token;

  beforeEach(async () => {
    token = await PausableToken.new(initialSupply);
  });

  describe("Pausable", () => {
    it("Should pause and unpause token transfers", async () => {
      // Initially not paused
      await token.transfer(addr1, new BN('100').mul(new BN('10').pow(new BN('18'))), { from: owner });
      let balance = await token.balanceOf(addr1);
      assert(balance.eq(new BN('100').mul(new BN('10').pow(new BN('18')))), "Tokens were not transferred");

      // Pause the contract
      await token.pause({ from: owner });

      // Attempt to transfer while paused (should fail)
      try {
        await token.transfer(addr2, new BN('50').mul(new BN('10').pow(new BN('18'))), { from: addr1 });
        assert.fail("Transfer did not fail while paused");
      } catch (error) {
        assert.include(error.message, "Pausable: paused", "Expected 'Pausable: paused' error");
      }

      // Unpause the contract
      await token.unpause({ from: owner });

      // Transfer should succeed after unpausing
      await token.transfer(addr2, new BN('50').mul(new BN('10').pow(new BN('18'))), { from: addr1 });
      balance = await token.balanceOf(addr2);
      assert(balance.eq(new BN('50').mul(new BN('10').pow(new BN('18')))), "Tokens were not transferred after unpause");
    });

    it("Should emit Paused and Unpaused events", async () => {
      // Pause the contract
      let receipt = await token.pause({ from: owner });
      assert(receipt.logs.some(log => log.event === "Paused" && log.args.account === owner), "Paused event not emitted correctly");

      // Unpause the contract
      receipt = await token.unpause({ from: owner });
      assert(receipt.logs.some(log => log.event === "Unpaused" && log.args.account === owner), "Unpaused event not emitted correctly");
    });

    it("Should only allow owner to pause and unpause", async () => {
      // Attempt to pause from non-owner account
      try {
        await token.pause({ from: addr1 });
        assert.fail("Non-owner was able to pause");
      } catch (error) {
        assert.include(error.message, "Caller is not the owner", "Expected 'Caller is not the owner' error");
      }

      // Attempt to unpause from non-owner account
      await token.pause({ from: owner });
      try {
        await token.unpause({ from: addr1 });
        assert.fail("Non-owner was able to unpause");
      } catch (error) {
        assert.include(error.message, "Caller is not the owner", "Expected 'Caller is not the owner' error");
      }
    });
  });
});
