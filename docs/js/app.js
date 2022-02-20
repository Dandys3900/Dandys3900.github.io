var App = {
    web3Provider: null,
    contracts: {}, // Array of all deployed instances
    account: "0x0", // Default value
    loading: false,
    tokenPrice: 1000000000000000,
    tokensSold: 0,
    tokensAvailable: 0,

    init: function() {
        console.log("App is initialized");
        return App.initWeb3();
    },

    /************************************************************************/
    /*  initWeb3() function to initialize the Web3 framework and set        */
    /*  HttpProvider for communication with the blockchain.                 */
    /************************************************************************/
    initWeb3: function() {
        if (typeof Web3 !== "undefined") {
            ethereum.enable().then(() => {
                web3 = new Web3(window.ethereum);
            });
        }
        else {
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
        }

        App.web3Provider = web3.currentProvider;
        return App.initContracts();
    },

    /************************************************************************/
    /*  initContracts() initializing both Smart contracts - DandysToken and */
    /*  DandysTokenSale and print addresses of both of them to the terminal.*/
    /************************************************************************/
    initContracts: function() {
        $.getJSON("DandysTokenSale.json", function(dandysTokenSale) { // Connecting to our network and to smart contract
            App.contracts.DandysTokenSale = TruffleContract(dandysTokenSale); //Truffle contract allows reading and interacting with the smart contract
            App.contracts.DandysTokenSale.setProvider(web3.currentProvider);
            //Test if we get address, meaning that contract is initialized successfully
            App.contracts.DandysTokenSale.deployed().then(function(dandysTokenSale) {
                console.log("Dandys Token Sale Address: ", dandysTokenSale.address);
            });
        }).done(function() {
            $.getJSON("DandysToken.json", function(dandysToken) {
                App.contracts.DandysToken = TruffleContract(dandysToken);
                App.contracts.DandysToken.setProvider(App.web3Provider);
                App.contracts.DandysToken.deployed().then(function(dandysToken) {
                    console.log("Dandys Token Address: ", dandysToken.address);
                });

                return App.render();
            });
        });
    },

    /************************************************************************/
    /*  render() function displays all required data to the web page by     */
    /*  using the promise chains and Smart contract instances and setting   */
    /*  proper values to HTML entities and classes.                         */
    /************************************************************************/
    render: function() {
        if (App.loading) {
            return;
        }
        App.loading = true;

        var loader = $("#loader");
        var content = $("#content");

        loader.show();
        content.hide();

        // Reload the web page when succesfully connected to the MetaMask
        window.onfocus = () => {
            window.location.reload();
        }

        web3.eth.getCoinbase(function(err, account) {
            if (err === null) {
                App.account = account;
                $("#accountAddress").html("Your account address is " + "<b style='color: goldenrod;'>" + account + "</b>");
            }
        });

        var dandysTokenSaleInstance;
        var dandysTokenInstance;

        App.contracts.DandysTokenSale.deployed().then(function(instance) {
            dandysTokenSaleInstance = instance;
            return App.contracts.DandysToken.deployed();
        }).then(function(instance) {
            dandysTokenInstance = instance;
            return dandysTokenSaleInstance.tokenPrice();
        }).then(function(tokenPrice) {
            App.tokenPrice = tokenPrice;
            $(".token-price").html(web3.utils.fromWei(App.tokenPrice, "ether")); // Span class is with "." instead of "#"
            return dandysTokenSaleInstance.tokensSold();
        }).then(function(tokensSold) {
            App.tokensSold = tokensSold.toNumber();
            $(".tokens-sold").html(App.tokensSold);
            return dandysTokenInstance.totalSupply();
        }).then(function(totalSupply) {
            App.tokensAvailable = totalSupply.toNumber();
            $(".tokens-available").html(App.tokensAvailable);

            var progressPercent = ((App.tokensSold / App.tokensAvailable) * 100);
            $("#progress").css("width", progressPercent + "%"); // Div class is with "#" instead of "."

            return dandysTokenInstance.balanceOf(App.account);
        }).then(function(accountbalance) {
            $(".dandystoken-balance").html(accountbalance.toNumber());

            App.loading = false;
            loader.hide();
            content.show();
        });
    },

    /************************************************************************/
    /*  buyTokens() function transfers exact amount of the                  */
    /*  tokens(_numberOfTokens) to actual account which is connected to the */
    /*  blockchain by the MetaMask and update user´s balance of the tokens. */
    /************************************************************************/
    buyTokens: function() {
        var loader = $("#loader");
        var content = $("#content");

        content.hide();
        loader.show();

        var numberOfTokens = $("#numberOfTokens").val(); // Get value from HTML element on the web page
        App.contracts.DandysTokenSale.deployed().then(function(instance) {
            return instance.buyTokens(numberOfTokens, {
                // Meta data
                from: App.account,
                value: numberOfTokens * App.tokenPrice,
                gas: 500000
            });
        }).defer(function(result) {
            $("form").trigger("reset"); // Reset number in HTML element on the web page

            //window.location.reload();
            content.show();
            loader.hide();
        });
    }
}

window.onload = function() {
    App.init();
}
