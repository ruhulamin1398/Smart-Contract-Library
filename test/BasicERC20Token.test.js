// test/BasicERC20Token.test.js

const BasicERC20Token = artifacts.require("BasicERC20Token");
const BN = require('bn.js');

contract("BasicERC20Token", (accounts) => {
    console.log("accounts :   " ,accounts   )
  const [owner, addr1, addr2, ...addrs] = accounts;
  const initialSupply = new BN('1000').mul(new BN('10').pow(new BN('18'))); // 1000 * 10^18

  let token;

  beforeEach(async () => {
    token = await BasicERC20Token.new(initialSupply);
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      const ownerBalance = await token.balanceOf(owner);
      console.log("Owner Balance:", ownerBalance.toString());
      console.log("Initial Supply:", initialSupply.toString());
      assert(ownerBalance.eq(initialSupply), "Initial supply is not assigned to the owner");
    });
  });

  describe("Transactions", () => {
    it("Should transfer tokens between accounts", async () => {
      await token.transfer(addr1, new BN('50').mul(new BN('10').pow(new BN('18'))), { from: owner });
      const addr1Balance = await token.balanceOf(addr1);
      assert(addr1Balance.eq(new BN('50').mul(new BN('10').pow(new BN('18')))), "Tokens were not transferred to addr1");

      await token.transfer(addr2, new BN('20').mul(new BN('10').pow(new BN('18'))), { from: addr1 });
      const addr2Balance = await token.balanceOf(addr2);
      assert(addr2Balance.eq(new BN('20').mul(new BN('10').pow(new BN('18')))), "Tokens were not transferred to addr2");
      
 
    });


 
      it("Should transfer tokens between accounts", async () => {
        await token.transfer(addr1, new BN('60').mul(new BN('10').pow(new BN('18'))), { from: owner });
        const addr1Balance = await token.balanceOf(addr1);
        assert(addr1Balance.eq(new BN('60').mul(new BN('10').pow(new BN('18')))), "Tokens were not transferred to addr1");
  
        await token.transfer(addr2, new BN('20').mul(new BN('10').pow(new BN('18'))), { from: addr1 });
        const addr2Balance = await token.balanceOf(addr2);
        assert(addr2Balance.eq(new BN('20').mul(new BN('10').pow(new BN('18')))), "Tokens were not transferred to addr2");

        assert(addr2Balance.eq(new BN('20').mul(new BN('10').pow(new BN('18')))), "Tokens were not transferred to addr2");

   
        const addr1NewBalance = await token.balanceOf(addr1);
        assert(addr1NewBalance.eq(new BN('40').mul(new BN('10').pow(new BN('18')))), "Balance of addr1 wasn't updated");



      });



    it("Should fail if sender doesn’t have enough tokens", async () => {
      let balance = await token.balanceOf(owner);
      let amount = balance.add(new BN('1'));

      try {
        await token.transfer(addr1, amount, { from: owner });
        assert.fail("Expected transfer to fail due to insufficient balance");
      } catch (error) {
        assert.include(error.message, "Insufficient balance", "Expected 'Insufficient balance' error");
      }
    });

    it("Should update balances after transfers", async () => {
      let initialOwnerBalance = await token.balanceOf(owner);

      await token.transfer(addr1, new BN('100').mul(new BN('10').pow(new BN('18'))), { from: owner });
      await token.transfer(addr2, new BN('50').mul(new BN('10').pow(new BN('18'))), { from: addr1 });

      let finalOwnerBalance = await token.balanceOf(owner);
      let addr1Balance = await token.balanceOf(addr1);
      let addr2Balance = await token.balanceOf(addr2);

      assert(finalOwnerBalance.eq(initialOwnerBalance.sub(new BN('100').mul(new BN('10').pow(new BN('18'))))), "Owner balance is incorrect");
      assert(addr1Balance.eq(new BN('50').mul(new BN('10').pow(new BN('18')))), "Addr1 balance is incorrect");
      assert(addr2Balance.eq(new BN('50').mul(new BN('10').pow(new BN('18')))), "Addr2 balance is incorrect");
    });
  });
});
