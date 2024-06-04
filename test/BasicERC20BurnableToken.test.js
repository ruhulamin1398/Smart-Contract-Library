// test/BasicERC20BurnableToken.test.js

const BasicERC20BurnableToken = artifacts.require("BasicERC20BurnableToken");
const BN = require('bn.js');

contract("BasicERC20BurnableToken", (accounts) => {
  const [owner, addr1, ...addrs] = accounts;
  const initialSupply = new BN('1000').mul(new BN('10').pow(new BN('18'))); // 1000 * 10^18

  let token;

  beforeEach(async () => {
    token = await BasicERC20BurnableToken.new(initialSupply);
  });
 
  describe("Burn", () => {
    it("Should burn tokens and reduce total supply", async () => {
      const burnAmount = new BN('100').mul(new BN('10').pow(new BN('18'))); // 100 * 10^18
      const initialOwnerBalance = await token.balanceOf(owner);

      await token.burn(burnAmount, { from: owner });

      const finalOwnerBalance = await token.balanceOf(owner);
      const finalTotalSupply = await token.totalSupply();

      assert(finalOwnerBalance.eq(initialOwnerBalance.sub(burnAmount)), "Owner balance did not reduce correctly");
      assert(finalTotalSupply.eq(initialSupply.sub(burnAmount)), "Total supply did not reduce correctly");
    });
  });
});
