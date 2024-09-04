// migrations/2_deploy_contracts.js

const StateVariable = artifacts.require("StateVariable"); 

module.exports = function (deployer) {  
  deployer.deploy(StateVariable);
};
