// migrations/2_deploy_contracts.js

const BasicERC20Token = artifacts.require("BasicERC20Token");

module.exports = function (deployer) {
  const initialSupply = 1000; // Initial supply of tokens
  deployer.deploy(BasicERC20Token, initialSupply);
};
