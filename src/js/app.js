var App = {
    web3Provider: null, //At the begining
    contracts: {}, //Keep track of all our contracts

    init: function() {
        console.log("App is initialized");
        return App.initWeb3();
    },

    initWeb3: function() {
        if (typeof Web3 !== "undefined") {
            //If a web3 instance is already running and is provided by Meta Mask
            App.web3Provider = ethereum.currentProvider; //původně tam bylo web3.currentProvider
            web3 = new Web3(ethereum.currentProvider);
        }
        else {
            //Specify default instance if no web3 instance is provided, if connection is not established with Meta Mask use local Ganache insted
            App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
            web3 = new Web3(App.web3Provider);
        }

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
        });
    }
}

window.onload = function() {
    App.init();
}