const ARCoin = artifacts.require("SuperShopRewards");

module.exports = function (deployer) {
  deployer.deploy(ARCoin,500);
};
