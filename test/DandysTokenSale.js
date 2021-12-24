const DandysToken = artifacts.require("DandysToken");
const DandysTokenSale = artifacts.require("DandysTokenSale");

contract("DandysTokenSale", function(accounts) {
    var tokenInstance;
    var tokenSaleInstance;
    var admin = accounts[0]; //In DandysToken.sol we set balance of msg.sender to all tokens, and msg.sender is by default the first account - accounts[0]
    var buyer = accounts[1]; //random selection
    var tokenPrice = 1000000000000000; //in wei - 0.001eth, the way we keep track of ether in solidity, the smallest unit of ethrium crypto, viz. etherconverter.online
    var tokensAvailable = 750000; //75% of 1mil tokens, randomly selected
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
        return DandysToken.deployed().then(function(instance) {
            ///Use our token instance first
            tokenInstance = instance;
            return DandysTokenSale.deployed();
        }).then(function(instance) {
            // Then token sale instance, we have now access to both tokens instances
            tokenSaleInstance = instance; //keep track of the instance
            // Provision of 75% of all tokens get to TokenSale contract
            return tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, { from: admin });
        }).then(function(receipt) { //receipt because it is transaction
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
            assert.equal(amount.toNumber(), numberOfTokens, "Number of sold tokens and bought tokens are same"); //we just bought some tokens and we want to make sure that the same amount of tokens was sold
            return tokenInstance.balanceOf(buyer);
        }).then(function(accountbalance) {
            assert.equal(accountbalance.toNumber(), numberOfTokens);
            return tokenInstance.balanceOf(tokenSaleInstance.address);
        }).then(function(accountbalance) {
            //The buyer has bought 11 tokens from our smart contract, see line 42, so now balance of smart contract should be lower by 11, THE SMART CONTRACT IS IN FACT A BANK WHERE BUYERS CAN BU TOKENS
            assert.equal(accountbalance.toNumber(), (tokensAvailable - numberOfTokens));
            //Try to buy tokens different from the ether value
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 1 }); //in wei, we try to buy 11 tokens for only 1 wei, which should not pass
        }).then(assert.file).catch(function(error) {
            assert(error.message.indexOf("revert") >= 0, "msg.value must be equal to price of tokens in wei");
            // We want to buy more tokens that TokenSale has (with the correct value), it has 750000 tokens, see line 38
            return tokenSaleInstance.buyTokens(755000, { from: buyer, value: value });
        }).then(assert.file).catch(function(error) {
            assert(error.message.indexOf("revert") >= 0, "We cannot buy more tokens that are availableon our account");
        });
    });
});