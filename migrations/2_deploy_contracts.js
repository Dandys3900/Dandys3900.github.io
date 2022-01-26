/*Reason why these files are number is because it help truffle to keep the right execution order*/

const DandysToken = artifacts.require("DandysToken");
const DandysTokenSale = artifacts.require("DandysTokenSale");

/************************************************************************/
/*  Create instances of both DandysToken and DandysTokenSale and set    */
/*  token price to exact amount of wei(smallest denomination of ether). */
/************************************************************************/
module.exports = function (deployer) {
  deployer.deploy(DandysToken, 1000000).then(function() {
    var tokenPrice = 1000000000000000;
    return deployer.deploy(DandysTokenSale, DandysToken.address, tokenPrice); //pass to constructor address of deployed token
  }); //set value for constructor, number of tokens
};
