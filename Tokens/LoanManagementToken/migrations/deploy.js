const tkArtifects = artifacts.require("LoanManagementToken");

const collateralRatio = 150; // 150%
const liquidationThreshold = 125; // 125%

module.exports = function (deployer) {
  deployer.deploy(tkArtifects,"Loan Token", "LTN",collateralRatio,liquidationThreshold);
};
