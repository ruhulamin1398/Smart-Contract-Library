// test/UpgradeableToken.test.js

const Proxy = artifacts.require("Proxy");
const UpgradeableToken = artifacts.require("UpgradeableToken");
const UpgradeableTokenV2 = artifacts.require("UpgradeableTokenV2");
const BN = require('bn.js');

contract("UpgradeableToken", (accounts) => {
  const [owner, addr1, ...addrs] = accounts;
  const initialSupply = new BN('1000').mul(new BN('10').pow(new BN('18'))); // 1000 * 10^18

  let proxy;
  let token;

  beforeEach(async () => {
    const implementation = await UpgradeableToken.new();
    proxy = await Proxy.new(implementation.address);
    token = await UpgradeableToken.at(proxy.address);

    // Initialize the token with the initial supply
    await token.initialize(initialSupply, { from: owner });
  });

  it("Should set the initial supply correctly", async () => {
    const totalSupply = await token.totalSupply();
    assert(totalSupply.eq(initialSupply), `Initial supply is not set correctly: expected ${initialSupply.toString()}, got ${totalSupply.toString()}`);

    const ownerBalance = await token.balanceOf(owner);
    assert(ownerBalance.eq(initialSupply), `Owner balance is not set correctly: expected ${initialSupply.toString()}, got ${ownerBalance.toString()}`);
  });

  it("Should upgrade to a new implementation", async () => {
    const implementationV2 = await UpgradeableTokenV2.new();
    await proxy.upgradeTo(implementationV2.address);
    const tokenV2 = await UpgradeableTokenV2.at(proxy.address);
    
    const mintAmount = new BN('500').mul(new BN('10').pow(new BN('18'))); // 500 * 10^18
    await tokenV2.mint(addr1, mintAmount, { from: owner });

    const addr1Balance = await tokenV2.balanceOf(addr1);
    assert(addr1Balance.eq(mintAmount), `Minting failed after upgrade: expected ${mintAmount.toString()}, got ${addr1Balance.toString()}`);

    const expectedTotalSupply = initialSupply.add(mintAmount);
    const totalSupply = await tokenV2.totalSupply();
    assert(totalSupply.eq(expectedTotalSupply), `Total supply is incorrect after upgrade: expected ${expectedTotalSupply.toString()}, got ${totalSupply.toString()}`);
  });
});
