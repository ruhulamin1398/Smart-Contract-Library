// test/CappedToken.test.js

const CappedToken = artifacts.require("CappedToken");
const BN = require('bn.js');

contract("CappedToken", (accounts) => {
  const [owner, addr1, ...addrs] = accounts;
  const initialSupply = new BN('1000').mul(new BN('10').pow(new BN('18'))); // 1000 * 10^18
  const cap = new BN('2000').mul(new BN('10').pow(new BN('18'))); // 2000 * 10^18

  let token;

  beforeEach(async () => {
    token = await CappedToken.new(initialSupply, cap);
  });

  describe("Cap", () => {
    it("Should have the correct cap", async () => {
      const tokenCap = await token.cap();
      assert(tokenCap.eq(cap), "Cap is not set correctly");
    });

    it("Should not allow minting beyond the cap", async () => {
      const mintAmount = new BN('1500').mul(new BN('10').pow(new BN('18'))); // 1500 * 10^18
      await token.mint(addr1, mintAmount, { from: owner });

      const overMintAmount = new BN('1000').mul(new BN('10').pow(new BN('18'))); // 1000 * 10^18
      try {
        await token.mint(addr1, overMintAmount, { from: owner });
        assert.fail("Mint did not fail when exceeding cap");
      } catch (error) {
        assert.include(error.message, "CappedToken: cap exceeded", "Expected 'CappedToken: cap exceeded' error");
        
      }
    });

    it("Should allow minting within the cap", async () => {
      const mintAmount = new BN('500').mul(new BN('10').pow(new BN('18'))); // 500 * 10^18
      await token.mint(addr1, mintAmount, { from: owner });

      const balance = await token.balanceOf(addr1);
      assert(balance.eq(mintAmount), "Tokens were not minted correctly");

      const totalSupply = await token.totalSupply();
      assert(totalSupply.eq(initialSupply.add(mintAmount)), "Total supply is not updated correctly");
    });
  });
});

