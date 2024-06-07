const Staking = artifacts.require("Staking");
const Chainlink = artifacts.require("Chainlink");

const BN = web3.utils.BN;

contract("Staking", (accounts) => {
  const [owner, signer2] = accounts;
  let stakingInstance, chainlinkInstance;

  const initialEthUsdPrice = 187848;
  const chainlinkUsdPrice = 867;
  const chainlinkApy = 1500;
  const chainlinkAmount = web3.utils.toWei("100", "ether");

  beforeEach(async () => {
    const ownerBalance = await web3.eth.getBalance(owner);
    const requiredBalance = web3.utils.toWei("0.9", "ether"); // Reduced required balance to 0.9 ETH

    if (web3.utils.toBN(ownerBalance).lt(web3.utils.toBN(requiredBalance))) {
      throw new Error(`Owner account needs at least ${requiredBalance} ETH. Current balance: ${ownerBalance} ETH`);
    }

    stakingInstance = await Staking.new(initialEthUsdPrice, { from: owner, value: web3.utils.toWei("0.9", "ether") });
    chainlinkInstance = await Chainlink.new({ from: signer2 });

    await stakingInstance.addToken("Chainlink", "LINK", chainlinkInstance.address, chainlinkUsdPrice, chainlinkApy, { from: owner });
    await chainlinkInstance.approve(stakingInstance.address, chainlinkAmount, { from: signer2 });
    await stakingInstance.stakedTokens("LINK", chainlinkAmount, { from: signer2 });
  });

  describe("addToken", () => {
    it("adds a token symbol", async () => {
      const tokenSymbols = await stakingInstance.getTokenSymbols();
      assert.deepEqual(tokenSymbols, ["LINK"], "Token symbol was not added correctly");
    });

    it("adds token information", async () => {
      const token = await stakingInstance.getToken("LINK");

      assert.equal(new BN(token.tokenId).toNumber(), 1, "Token ID is incorrect");
      assert.equal(token.name, "Chainlink", "Token name is incorrect");
      assert.equal(token.symbol, "LINK", "Token symbol is incorrect");
      assert.equal(token.tokenAddress, chainlinkInstance.address, "Token address is incorrect");
      assert.equal(new BN(token.usdPrice).toNumber(), chainlinkUsdPrice, "USD price is incorrect");
      assert.equal(new BN(token.apy).toNumber(), chainlinkApy, "APY is incorrect");
    });

    it("increments currentTokenId", async () => {
      const currentTokenId = await stakingInstance.currentTokenId();
      assert.equal(new BN(currentTokenId).toNumber(), 2, "Current token ID did not increment correctly");
    });
  });

  describe("stakeToken", () => {
    it("transfers tokens", async () => {
      const signerBalance = await chainlinkInstance.balanceOf(signer2);
      assert.equal(signerBalance.toString(), web3.utils.toWei("4900", "ether"), "Signer balance is incorrect");

      const contractBalance = await chainlinkInstance.balanceOf(stakingInstance.address);
      assert.equal(contractBalance.toString(), chainlinkAmount, "Contract balance is incorrect");
    });

    it("creates a position", async () => {
      const positionIds = await stakingInstance.getPositionIdsForAddress({ from: signer2 });
      assert.equal(positionIds.length, 1, "Position ID length is incorrect");

      const position = await stakingInstance.getPositionById(positionIds[0], { from: signer2 });

      assert.equal(new BN(position.positionId).toNumber(), 1, "Position ID is incorrect");
      assert.equal(position.walletAddress, signer2, "Wallet address is incorrect");
      assert.equal(position.name, "Chainlink", "Token name is incorrect");
      assert.equal(position.symbol, "LINK", "Token symbol is incorrect");
      assert.equal(new BN(position.apy).toNumber(), chainlinkApy, "APY is incorrect");
      assert.equal(position.tokenQuantity.toString(), chainlinkAmount, "Token quantity is incorrect");
      assert.equal(position.open, true, "Position is not open");
    });

    it("increments positionId", async () => {
      const currentPositionId = await stakingInstance.currentPositionId();
      assert.equal(new BN(currentPositionId).toNumber(), 2, "Current position ID did not increment correctly");
    });

    it("increases total amount of staked token", async () => {
      const totalStaked = await stakingInstance.stakedToken("LINK");
      assert.equal(totalStaked.toString(), chainlinkAmount, "Total staked token amount is incorrect");
    });
  });

  describe("calculateInterest", () => {
    it("returns interest accrued to a position", async () => {
      const apy = 1500;
      const value = web3.utils.toWei("100", "ether");
      const days = 365;

      const interestRate = await stakingInstance.calculateInterest(apy, value, days);
      assert.equal(interestRate.toString(), web3.utils.toWei("15", "ether"), "Interest rate is incorrect");
    });
  });

  describe("calculateNumberDays", () => {
    it("returns the number of days since createdDate", async () => {
      const block = await web3.eth.getBlock("latest");
      const oneYearAgo = block.timestamp - 86400 * 101;
      const days = await stakingInstance.calculateNumberDays(oneYearAgo);

      assert.equal(days.toNumber(), 101, "Number of days is incorrect");
    });
  });

  describe("closePosition", () => {
    let contractEthBalance
    let contractEthBalanceBefore, signerEthBalanceBefore;

    beforeEach(async () => {
      const block = await web3.eth.getBlock("latest");
      const newCreatedDate = block.timestamp - 86400 * 365;

      await stakingInstance.modifyCreatedDate(1, newCreatedDate, { from: owner });

      contractEthBalanceBefore = await web3.eth.getBalance(stakingInstance.address);
      signerEthBalanceBefore = await web3.eth.getBalance(signer2);

      await stakingInstance.closePosition(1, { from: signer2 });
    });

    it("returns tokens to wallet", async () => {
      const signerBalance = await chainlinkInstance.balanceOf(signer2);
      assert.equal(signerBalance.toString(), web3.utils.toWei("5000", "ether"), "Signer balance after close is incorrect");

      const contractBalance = await chainlinkInstance.balanceOf(stakingInstance.address);
      assert.equal(contractBalance.toString(), "0", "Contract balance after close is incorrect");
    });

    it("sends ether interest to wallet", async () => {
      const contractEthBalanceAfter = await web3.eth.getBalance(stakingInstance.address);
      const signerEthBalanceAfter = await web3.eth.getBalance(signer2);

      assert.isBelow(Number(contractEthBalanceAfter), Number(contractEthBalanceBefore), "Contract ETH balance after close is incorrect");
      assert.isAbove(Number(signerEthBalanceAfter), Number(signerEthBalanceBefore), "Signer ETH balance after close is incorrect");
    });

    it("closes position", async () => {
      const position = await stakingInstance.getPositionById(1, { from: signer2 });
      assert.equal(position.open, false, "Position is not closed");
    });
  });
});
