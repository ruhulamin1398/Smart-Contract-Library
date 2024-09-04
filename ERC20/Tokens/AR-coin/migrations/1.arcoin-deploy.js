const ARCoin = artifacts.require("ARCoin");

module.exports = function (deployer) {
  deployer.deploy(ARCoin);
};
