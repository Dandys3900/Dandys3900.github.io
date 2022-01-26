 const DandysToken = artifacts.require("DandysToken");

 contract("DandysToken", function(accounts) {
    var tokenInstance;

    it("Initializing contarct with required values", function() {
        return DandysToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name) {
            assert.equal(name, "Dandys Coin", "Token has correct name, OK!");
            return tokenInstance.symbol();
        }).then(function(symbol) {
            assert.equal(symbol, "DDC", "Token has correct symbol, OK!");
            return tokenInstance.standard();
        }).then(function(standard) {
            assert.equal(standard, "DDC Token v1.0", "Token has correct standard, OK!");
        });
    });

     it("Setting the initial supply", function() {
        return DandysToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, "Numbers are same, OK!"); // Compare first and second argument and if they are equal -> print output
            return tokenInstance.balanceOf(accounts[0]); // The first account at the local test blockchain is considered as the admin
        }).then(function(accountbalance) {
            assert.equal(accountbalance.toNumber(), 1000000, "Initial supply and account of 0# user are same, OK!");
        });
     });

     it("Transfering tokens", function() {
        return DandysToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], 1000001);
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf("revert") >= 0, "Error message must contain string 'revert'"); // Output in case there is "revert" string in message
            return tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] });
        }).then(function(success) {
            assert.equal(success, true, "Output from Transfer() function is true");
            return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] });
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
            assert.equal(accountbalance.toNumber(), 750000, "Tokens were successfully deleted from sender!"); // Account[0] got 1000000 and send 250000, so 750000 tokens should left
        });
     });

     it("Approves tokens for delegated transfers", function() {
        return DandysToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.approve.call(accounts[1], 100);
        }).then(function(success) {
            assert.equal(success, true, "Approve() function returned true");
            return tokenInstance.approve(accounts[1], 100, { from: accounts[0] });
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
            spendingAccount = accounts[4]; // This account will spend money from msg.sender account            
            return tokenInstance.transfer(fromAccount, 100, { from: accounts[0] });
         }).then(function(receipt) {
            return tokenInstance.approve(spendingAccount, 10, { from: fromAccount }); // Approve spendingAccount to spend msg.sender´s tokens
         }).then(function(receipt) {
            return tokenInstance.transferFrom(fromAccount, toAccount, 101, { from: spendingAccount });
         }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf("revert") >= 0, "We cannot transfer more than your balance");
            return tokenInstance.transferFrom(fromAccount, toAccount, 11, { from: spendingAccount }); // Only 10 tokens are approved for transferring -> should fail
         }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf("revert") >= 0, "We cannot transfer more than approved amount");
            return tokenInstance.transferFrom.call(fromAccount, toAccount, 10, { from: spendingAccount });
         }).then(function(success) {
            assert.equal(success, true, "Transfer from account to another account was successful");
            return tokenInstance.transferFrom(fromAccount, toAccount, 10, { from: spendingAccount });
         }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "Event was triggered!");
            assert.equal(receipt.logs[0].event, "Transfer", "It is Transfer event");
            assert.equal(receipt.logs[0].args._from, fromAccount, "From where are the tokens transferred");
            assert.equal(receipt.logs[0].args._to, toAccount, "To who are the tokens transferred");
            assert.equal(receipt.logs[0].args._value, 10, "Transferred amount");
            return tokenInstance.balanceOf(fromAccount);
         }).then(function(accountbalance) {
            assert.equal(accountbalance.toNumber(), 90, "Right amount of tokens were spend from the account"); // 90 tokens should left
            return tokenInstance.balanceOf(toAccount);
         }).then(function(accountbalance) {
             assert.equal(accountbalance.toNumber(), 10, "Tokens were added to receiver account");
             return tokenInstance.allowance(fromAccount, spendingAccount);
         }).then(function(allowance) {
            assert.equal(allowance.toNumber(), 0, "Checking if the allowance is set correctly"); // There should be 0 tokens left for spending
         });
     });
 });