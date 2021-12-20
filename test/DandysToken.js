 /*Test file with testing function
 called from truffle console by truffle test command
 Aiming to make my crypto robust*/

 //Using mocha testing API

 const DandysToken = artifacts.require("DandysToken");

 contract("DandysToken", function(accounts) {
    var tokenInstance;

    it("Initializing contarct with required values", function() {
        return DandysToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name) {
            assert.equal(name, "Dandys Token", "Token has correct name, OK!");
            return tokenInstance.symbol();
        }).then(function(symbol) {
            assert.equal(symbol, "DDT", "Token has correct symbol, OK!");
            return tokenInstance.standard();
        }).then(function(standard) {
            assert.equal(standard, "DDT Token v1.0", "Token has correct standard, OK!");
        });
    });

     it("Setting the initial supply", function() {
        return DandysToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, "Numbers are same, OK!"); //Compare first and second argument and if they are same, print output
            return tokenInstance.balanceOf(accounts[0]); //the first account in our Ganache chain, accounts array is manages by Ganache itself, when not specified constroctur sets everything to the first account
        }).then(function(accountBalance) {
            assert.equal(accountBalance.toNumber(), 1000000, "Initial supply and account of 0# user are same, OK!");
        });
     });

     it("Transfering tokens", function() {
        return DandysToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], 1000001); //Must fail, because max. amount is 1000000, using call() to not trigger the transaction only send its value, only test
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf("revert") >= 0, "Error message must contain string 'revert'"); //Output in case there is "revert" string in message
            return tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] });
        }).then(function(success) {
            assert.equal(success, true, "Output from Transfer() function is true");
            return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] }); //From acount 0 to account 1 send 250000 tokens, stuff in {} is called meta data
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "Event was triggered!");
            assert.equal(receipt.logs[0].event, "Transfer", "It is Transfer event");
            assert.equal(receipt.logs[0].args._from, accounts[0], "From where are the tokens transferred");
            assert.equal(receipt.logs[0].args._to, accounts[1], "To who are the tokens transferred");
            assert.equal(receipt.logs[0].args._value, 250000, "Transferred amount");
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(accountbalance) {
            assert.equal(accountbalance.toNumber(), 250000, "Tokens were successfully transferred!");
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(accountbalance) {
            assert.equal(accountbalance.toNumber(), 750000, "Tokens were successfully deleted from sender!"); //Account 0 got 1000000 and send 250000, so he must still have 750000 tokens
        });
     });

     it("Approves tokens for delegated transfers", function() {
        return DandysToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.approve.call(accounts[1], 100);
        }).then(function(success) {
            assert.equal(success, true, "Approve() function returned true");
            return tokenInstance.approve(accounts[1], 100, { from: accounts[0] }); //not using call, triggering blockchain transaction, to check for logs from Approve event; metadata are passed as ms.sender
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "Event was triggered!");
            assert.equal(receipt.logs[0].event, "Approval", "It is Approve event");
            assert.equal(receipt.logs[0].args._owner, accounts[0], "Tokens spedning is authorised by this account");
            assert.equal(receipt.logs[0].args._spender, accounts[1], "This account is allowed to spend owners money");
            assert.equal(receipt.logs[0].args._value, 100, "Approved amount to be spended");
            return tokenInstance.allowance(accounts[0], accounts[1]);
        }).then(function(allowance) {
            assert.equal(allowance.toNumber(), 100, "Allowance for the account was successful");
        });
     });

     it("Sending delegated transfers", function() {
         return DandysToken.deployed().then(function(instance) {
            tokenInstance = instance;
            fromAccount = accounts[2];
            toAccount = accounts[3];
            spendingAccount = accounts[4]; //the account which will spend money from msg.sender account            
            //Transfer tokens to fromAccount
            return tokenInstance.transfer(fromAccount, 100, { from: accounts[0] });
         }).then(function(receipt) {
            //Approve spendingAccount to spend msg.sender account Tokens
            return tokenInstance.approve(spendingAccount, 10, { from: fromAccount });
         }).then(function(receipt) {
            //Try send more tokens than sender balance is
            return tokenInstance.transferFrom(fromAccount, toAccount, 101, { from: spendingAccount });
         }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf("revert") >= 0, "We cannot transfer more than your balance");
            //Transffering larger amount of tokens than approved balance
            return tokenInstance.transferFrom(fromAccount, toAccount, 11, { from: spendingAccount }); //Only 10 tokens are approved for transferring
         }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf("revert") >= 0, "We cannot transfer more than approved amount");
            return tokenInstance.transferFrom.call(fromAccount, toAccount, 10, { from: spendingAccount }); //testing only output
         }).then(function(success) {
            assert.equal(success, true, "Transfer from account to another account was successful");
            return tokenInstance.transferFrom(fromAccount, toAccount, 10, { from: spendingAccount });
         }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "Event was triggered!");
            assert.equal(receipt.logs[0].event, "Transfer", "It is Transfer event");
            assert.equal(receipt.logs[0].args._from, fromAccount, "From where are the tokens transferred");
            assert.equal(receipt.logs[0].args._to, toAccount, "To who are the tokens transferred");
            assert.equal(receipt.logs[0].args._value, 10, "Transferred amount");
            //Check if right amount was spend
            return tokenInstance.balanceOf(fromAccount);
         }).then(function(accountbalance) {
            assert.equal(accountbalance.toNumber(), 90, "Right amount of tokens were spend from the account"); //Initially there were 100 tokens and we spend 10 of them so there should be 90 left
            return tokenInstance.balanceOf(toAccount);
         }).then(function(accountbalance) {
             assert.equal(accountbalance.toNumber(), 10, "Tokens were added to receiver account");
             return tokenInstance.allowance(fromAccount, spendingAccount);
         }).then(function(allowance) {
            assert.equal(allowance.toNumber(), 0, "Checking if the allowance is set correctly"); //We were allowed to spend 10 tokens and we already did, so there should be 0 tokens left for spending
         });
     });
 })