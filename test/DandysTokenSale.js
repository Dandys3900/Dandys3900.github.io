const DandysTokenSale = artifacts.require("DandysTokenSale");

contract("DandysTokenSale", function(accounts) {
    var tokenSaleInstance;
    var buyer = accounts[1]; //random selection
    var tokenPrice = 1000000000000000; //in wei - 0.001eth, the way we keep track of ether in solidity, the smallest unit of ethrium crypto, viz. etherconverter.online
    var numberOfTokens;
    var value;

    it("Initializing contract with the correct values", function() {
        return DandysTokenSale.deployed().then(function(instance) {
            tokenSaleInstance = instance; //keep track of the instance
            return tokenSaleInstance.address;
        }).then(function(address) {
            assert.notEqual(address, 0x0, "Correct address was used!");
            return tokenSaleInstance.tokenContract();
        }).then(function(address) {
            assert.notEqual(address, 0x0, "Correct token contract address was used!");
            return tokenSaleInstance.tokenPrice();
        }).then(function(price) {
            assert.equal(price, tokenPrice, "Token price is set correctly!");
        });
    });

    it("Testing tokens buying method", function() {
        return DandysTokenSale.deployed().then(function(instance) {
            tokenSaleInstance = instance; //keep track of the instance
            numberOfTokens = 11;
            value = numberOfTokens * tokenPrice; //total price of buyed tokens in wei
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: value });
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "Event was triggered!");
            assert.equal(receipt.logs[0].event, "Sell", "It is Sell event");
            assert.equal(receipt.logs[0].args._buyer, buyer, "Which account has bought the tokens");
            assert.equal(receipt.logs[0].args._amount, numberOfTokens, "The number of sold tokens");
            return tokenSaleInstance.tokensSold();
        }).then(function(amount) {
            assert.equal(amount.toNumber(), numberOfTokens, "Numbers are same"); //we just bought some tokens and we want to make sure that the same amount of tokens was sold
            //Try to buy different from the ether value
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 1 }); //in wei, we try to buy 11 tokens for only 1 wei, which should not pass
        }).then(assert.file).catch(function(error) {
            assert(error.message.indexOf("revert") >= 0, "msg.value must be equal to number of tokens in wei");
        });
    });
});