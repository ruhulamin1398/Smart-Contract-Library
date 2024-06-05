const CappedToken = artifacts.require("CappedToken");
const { BN } = require('@openzeppelin/test-helpers');

contract("CappedToken", (accounts) => {
  const [owner, addr1] = accounts;
  const initialSupply = new BN('1000').mul(new BN('10').pow(new BN('18'))); // 1000 * 10^18
  const cap = new BN('2000').mul(new BN('10').pow(new BN('18'))); // 2000 * 10^18

  let token;

  beforeEach(async () => {
    token = await CappedToken.new(initialSupply, cap);
  });

  describe("Cap", () => {
    it("Should have the correct cap", async () => {
      const tokenCap = await token.cap();
      assert.isTrue(tokenCap.eq(cap), "Cap is not set correctly");
    });

    it("Should allow minting within the cap", async () => {
      const mintAmount = new BN('500').mul(new BN('10').pow(new BN('18'))); // 500 * 10^18
      await token.mint(addr1, mintAmount, { from: owner });
    
      const balance = await token.balanceOf(addr1);
      assert.isTrue(balance.eq(mintAmount), "Tokens were not minted correctly");
    
      const totalSupply = await token.totalSupply();
      assert.isTrue(totalSupply.eq(initialSupply.add(mintAmount)), "Total supply is not updated correctly");
    });
    
    
  });
});
