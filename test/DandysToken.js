 /*Test file with testing function
 called from truffle console by truffle test command
 Aiming to make my crypto robust*/

 //Using mocha testing API

 const DandysToken = artifacts.require("DandysToken");

 contract("DandysToken", function(accounts) {
     it("Setting the total number of supplied tokens upon deployment", function() {
        return DandysToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, "Numbers are same, OK!"); //Compare first and second argument and if they are same, print output
        });
     });
 })