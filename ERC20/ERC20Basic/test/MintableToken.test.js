// test/MintableToken.test.js

const MintableToken = artifacts.require("MintableToken");
const BN = require('bn.js');

contract("MintableToken", (accounts) => {
  const [owner, addr1, addr2, ...addrs] = accounts;
  const initialSupply = new BN('1000').mul(new BN('10').pow(new BN('18'))); // 1000 * 10^18

  let token;

  beforeEach(async () => {
    token = await MintableToken.new(initialSupply);
  });

  describe("Mint", () => {
    it("Should mint tokens and increase total supply", async () => {
      const mintAmount = new BN('100').mul(new BN('10').pow(new BN('18'))); // 100 * 10^18
      const initialTotalSupply = await token.totalSupply();
      const initialBalance = await token.balanceOf(addr1);

      await token.mint(addr1, mintAmount);

      const finalTotalSupply = await token.totalSupply();
      const finalBalance = await token.balanceOf(addr1);

      assert(finalTotalSupply.eq(initialTotalSupply.add(mintAmount)), "Total supply did not increase correctly");
      assert(finalBalance.eq(initialBalance.add(mintAmount)), "Addr1 balance did not increase correctly");
    });

    it("Should emit Mint and Transfer events", async () => {
      const mintAmount = new BN('100').mul(new BN('10').pow(new BN('18'))); // 100 * 10^18

      const receipt = await token.mint(addr1, mintAmount);

      assert(receipt.logs.length > 0, "No events were emitted");
      assert(receipt.logs.some(log => log.event === "Mint" && log.args.to === addr1 && log.args.value.eq(mintAmount)), "Mint event not emitted correctly");
      assert(receipt.logs.some(log => log.event === "Transfer" && log.args.from === "0x0000000000000000000000000000000000000000" && log.args.to === addr1 && log.args.value.eq(mintAmount)), "Transfer event not emitted correctly");
    });
  });
});
