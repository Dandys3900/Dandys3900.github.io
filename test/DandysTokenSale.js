const DandysTokenSale = artifacts.require("DandysTokenSale");

contract("DandysTokenSale", function(accounts) {
    var tokenSaleInstance;

    it("Initializing contract with the correct values", function() {
        return DandysTokenSale.deployed().then(function(instance) {
            tokenSaleInstance = instance; //keep track of the instance
            return tokenSaleInstance.address;
        }).then(function(address) {
            assert.notEqual(address, 0x0, "Correct address was used!");
        });
    });
});