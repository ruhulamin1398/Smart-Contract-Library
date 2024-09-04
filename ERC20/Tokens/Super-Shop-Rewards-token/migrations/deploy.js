const tkArtifects = artifacts.require("SuperShopRewards");

module.exports = function (deployer) {
  deployer.deploy(tkArtifects,500);
};
