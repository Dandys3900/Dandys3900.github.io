var App = {
    web3Provider: null, //At the begining
    contracts: {}, //Keep track of all our contracts
    account: "0x0", //Default null address, empty
    loading: false,
    tokenPrice: 1000000000000000,
    tokensSold: 0,
    tokensAvailable: 0,

    init: function() {
        console.log("App is initialized");
        return App.initWeb3();
    },

    initWeb3: function() {
        if (typeof Web3 !== "undefined") {
            ethereum.enable().then(() => {
                web3 = new Web3(web3.currentProvider);
             });
        }
        else {
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
        }

        App.web3Provider=web3.currentProvider;
        return App.initContracts();
    },

    initContracts: function() {
        //Get data from the .json file, we dont need to add full path because we already did it in bs-config.json file
        $.getJSON("DandysTokenSale.json", function(dandysTokenSale) { //Basically connecting to our network ans start working with smart contract
            App.contracts.DandysTokenSale = TruffleContract(dandysTokenSale); //Truffle contract will allow us read and interact with our contracts
            App.contracts.DandysTokenSale.setProvider(App.web3Provider);
            //Test if we get address, meaning that contract is initialized successfully
            App.contracts.DandysTokenSale.deployed().then(function(dandysTokenSale) {
                console.log("Dandys Token Sale Address: ", dandysTokenSale.address);
            });
        }).done(function() { //We also need to connect DandysToken not only DandysTokenSale
            $.getJSON("DandysToken.json", function(dandysToken) {
                App.contracts.DandysToken = TruffleContract(dandysToken);
                App.contracts.DandysToken.setProvider(App.web3Provider);
                App.contracts.DandysToken.deployed().then(function(dandysToken) {
                    console.log("Dandys Token Address: ", dandysToken.address);
                });

                //App.listenForEvents();
                return App.render(); //Show data
            });
        });
    },

    /*Listening for events from blockchain, f.e. Seel event
    listenForEvents: function() {
        App.contracts.DandysTokenSale.deployed().then(function(instance) {
            instance.Sell({}, {
                fromBlock: 0,
                toBlock: "latest",
            }).done(function(error, event) {
               console.log("-> Event was trigerred", event);
               //Refresh the page
               App.render(); 
            });
        });
    },*/

    //Function for displaying all stuff on the page, we will switch between showing data and loading animation
    render: function() {
        if (App.loading) { //When loading we dont want to display any other data
            return;
        }
        App.loading = true;

        var loader = $("#loader"); //the names came from html file, we want to keep track of these divs
        var content = $("#content");

        loader.show(); //if loading is true, we want to see loading animation and hide all the data
        content.hide();

        //Load account data
        web3.eth.getCoinbase(function(err, account) {
            if (err === null) { //no error
                App.account = account;
                $("#accountAddress").html("Your account address is " + "<b>" + account + "</b>");
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
            $(".token-price").html(web3.utils.fromWei(App.tokenPrice, "ether")); //span class is with . instead of #, because it is class not id
            return dandysTokenSaleInstance.tokensSold();
        }).then(function(tokensSold) {
            App.tokensSold = tokensSold.toNumber();
            $(".tokens-sold").html(App.tokensSold);
            return dandysTokenInstance.totalSupply();
        }).then(function(totalSupply) {
            App.tokensAvailable = totalSupply.toNumber();
            $(".tokens-available").html(App.tokensAvailable);

            var progressPercent = ((App.tokensSold / App.tokensAvailable) * 100);
            $("#progress").css("width", progressPercent + "%"); //We setting width of progress bar in procents and display it

            //Loading token contract in order to get current user´s balance
            return dandysTokenInstance.balanceOf(App.account);
        }).then(function(accountbalance) {
            $(".dandystoken-balance").html(accountbalance.toNumber());

            //After all data are loaded loading animation should disapper
            App.loading = false;
            loader.hide();
            content.show();
        });
    },

    buyTokens: function() {
        $("#content").hide();
        $("#loader").show();

        var numberOfTokens = $("#numberOfTokens").val(); //after button click, find out how many tokens want to be boundLength
        App.contracts.DandysTokenSale.deployed().then(function(instance) {
            return instance.buyTokens(numberOfTokens, {
                //Meta data
                from: App.account,
                value: numberOfTokens * App.tokenPrice,
                gas: 500000
            });
        }).then(function(result) {
            console.log("-> Tokens bought, amount: " + numberOfTokens + ", receiver: " + App.account);
            $("form").trigger("reset"); //reset number in form (v tom řádku nalevo od buttonu) to 0

            location.reload();
            $("#content").show();
            $("#loader").hide();
        });
    }
}

window.onload = function() {
    App.init();
}