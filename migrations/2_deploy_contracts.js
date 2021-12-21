/*Reason why these files are number is because it help truffle to keep the right execution order*/

const DandysToken = artifacts.require("DandysToken");
const DandysTokenSale = artifacts.require("DandysTokenSale");

module.exports = function (deployer) {
  deployer.deploy(DandysToken, 1000000); //set value for constructor, number of tokens
  deployer.deploy(DandysTokenSale);
};
