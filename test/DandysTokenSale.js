const DandysToken = artifacts.require("DandysToken");
const DandysTokenSale = artifacts.require("DandysTokenSale");

contract("DandysTokenSale", function(accounts) {
    var tokenInstance;
    var tokenSaleInstance;
    var admin = accounts[0]; // By default admin accoutn is the first one in the blockchain
    var buyer = accounts[1]; // Randomly selected
    var tokenPrice = 1000000000000000; // =0.001ETH, see "etherconverter.online"
    var tokensAvailable = 750000; // 75% of all available tokens, randomly selected
    var numberOfTokens;
    var value;

    it("Initializing contract with the correct values", function() {
        return DandysTokenSale.deployed().then(function(instance) {
            tokenSaleInstance = instance;
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
            tokenSaleInstance = instance;
            return tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, { from: admin }); // Transfer 75% of the available tokens to the Smart Contract
        }).then(function(receipt) {
            numberOfTokens = 11;
            value = numberOfTokens * tokenPrice; // In wei
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: value });
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "Event was triggered!");
            assert.equal(receipt.logs[0].event, "Sell", "It is Sell event");
            assert.equal(receipt.logs[0].args._buyer, buyer, "Which account has bought the tokens");
            assert.equal(receipt.logs[0].args._amount, numberOfTokens, "The number of sold tokens");
            return tokenSaleInstance.tokensSold();
        }).then(function(amount) {
            assert.equal(amount.toNumber(), numberOfTokens, "Number of sold tokens and bought tokens are same"); // Amount of the sold tokens should be equal to the number of the bought tokens
            return tokenInstance.balanceOf(buyer);
        }).then(function(accountbalance) {
            assert.equal(accountbalance.toNumber(), numberOfTokens);
            return tokenInstance.balanceOf(tokenSaleInstance.address);
        }).then(function(accountbalance) {
            assert.equal(accountbalance.toNumber(), (tokensAvailable - numberOfTokens)); // Balance of the Smart Contract should be lower by 11 tokens, since we bought them
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 1 }); // Again in wei, we try to buy 11 tokens for only 1 wei, which should not pass
        }).then(assert.file).catch(function(error) {
            assert(error.message.indexOf("revert") >= 0, "msg.value must be equal to price of tokens in wei");
            return tokenSaleInstance.buyTokens(755000, { from: buyer, value: value });
        }).then(assert.file).catch(function(error) {
            assert(error.message.indexOf("revert") >= 0, "We cannot buy more tokens that are availableon our account");
        });
    });

    it("Ending tokens sale", function() {
        return DandysToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return DandysTokenSale.deployed();
        }).then(function(instance) {
            tokenSaleInstance = instance;
            return tokenSaleInstance.endSale({ from: buyer }); // Token sale can be ended only by the admin
        }).then(assert.file).catch(function(error) {
            assert(error.message.indexOf("revert") >= 0, "Only admin can end the DandysToken sale!");
            return tokenSaleInstance.endSale({ from: admin });
        }).then(function(receipt) {
            return tokenInstance.balanceOf(admin);
        }).then(function(accountbalance) {
            assert.equal(accountbalance.toNumber(), 999989, "The rest of the tokens were succesfully transfered back to admin"); // Test if the rest of the tokens from ended Smart Contract was transfered back to the admin
        });
    });
});