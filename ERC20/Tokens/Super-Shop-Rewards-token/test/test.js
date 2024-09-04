const SuperShopRewards = artifacts.require("SuperShopRewards");

contract("SuperShopRewards", accounts => {
    const [owner, user1, user2] = accounts;
    const initialSupply = 3100000; // initial supply of tokens
    const DECIMALS = 18;
    const initialSupplyInUnits = BigInt(initialSupply) * BigInt(10 ** DECIMALS);

    let superShopRewards;

    beforeEach(async () => {
        superShopRewards = await SuperShopRewards.new(initialSupply);
    });

    it("should have correct name, symbol, and decimals", async () => {
        const name = await superShopRewards.name();
        const symbol = await superShopRewards.symbol();
        const decimals = await superShopRewards.decimals();

        assert.equal(name, "Super Shop Reward");
        assert.equal(symbol, "SSR");
        assert.equal(decimals.toNumber(), DECIMALS);
    });

    it("should have the correct initial supply", async () => {
        const totalSupply = await superShopRewards.totalSupply();
        assert.equal(totalSupply.toString(), initialSupplyInUnits.toString());
    });

    it("should mint new rewards by owner", async () => {
        const mintAmount = 1000;
        const mintAmountInUnits = BigInt(mintAmount) * BigInt(10 ** DECIMALS);

        await superShopRewards.mintRewards(mintAmount, { from: owner });

        const totalSupply = await superShopRewards.totalSupply();
        assert.equal(totalSupply.toString(), (initialSupplyInUnits + mintAmountInUnits).toString());
    });

    it("should transfer tokens correctly", async () => {
        const transferAmount = 500;
        const transferAmountInUnits = BigInt(transferAmount) * BigInt(10 ** DECIMALS);

        await superShopRewards.transferTokens(user1, transferAmount, { from: owner });

        const balance = await superShopRewards.balanceOf(user1);
        assert.equal(balance.toString(), transferAmountInUnits.toString());
    });

    it("should approve and transfer tokens from one account to another", async () => {
        const approveAmount = 1000;
        const transferAmount = 500;
        const approveAmountInUnits = BigInt(approveAmount) * BigInt(10 ** DECIMALS);
        const transferAmountInUnits = BigInt(transferAmount) * BigInt(10 ** DECIMALS);

        await superShopRewards.approveSpender(user1, approveAmount, { from: owner });
        const allowance = await superShopRewards.allowance(owner, user1);
        assert.equal(allowance.toString(), approveAmountInUnits.toString());

        await superShopRewards.transferTokensFrom(owner, user2, transferAmount, { from: user1 });

        const balance = await superShopRewards.balanceOf(user2);
        assert.equal(balance.toString(), transferAmountInUnits.toString());
    });

    it("should burn tokens correctly", async () => {
        const burnAmount = 500;
        const burnAmountInUnits = BigInt(burnAmount) * BigInt(10 ** DECIMALS);

        await superShopRewards.burnTokens(owner, burnAmount, { from: owner });

        const totalSupply = await superShopRewards.totalSupply();
        assert.equal(totalSupply.toString(), (initialSupplyInUnits - burnAmountInUnits).toString());
    });
});
