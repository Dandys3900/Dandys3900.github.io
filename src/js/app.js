var App = {
    web3Provider: null, //At the begining
    contracts: {}, //Keep track of all our contracts
    account: "0x0", //Default null address, empty
    loading: false,
    tokenPrice: 1000000000000000,

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

                return App.render(); //Show data
            });
        });
    },

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
            if (err === null) {
                App.account = account;
                $("#accountAddress").html("Your account address is " + "<b>" + account + "</b>");
            }
        });

        var dandysTokenSaleInstance;

        App.contracts.DandysTokenSale.deployed().then(function(instance) {
            dandysTokenSaleInstance = instance;
            return dandysTokenSaleInstance.tokenPrice();
        }).then(function(tokenPrice) {
            App.tokenPrice = tokenPrice;
            $(".token-price").html(web3.utils.fromWei(App.tokenPrice, "ether")); //span class is with . instead of #
        });

        App.loading = false;
        loader.hide();
        content.show();
    }
}

window.onload = function() {
    App.init();
}