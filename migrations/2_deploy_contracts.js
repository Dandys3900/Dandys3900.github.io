/*Reason why these files are number is because it help truffle to keep the right execution order*/

const DandysToken = artifacts.require("DandysToken");

module.exports = function (deployer) {
  deployer.deploy(DandysToken);
};
