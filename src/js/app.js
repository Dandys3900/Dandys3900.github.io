var App = {
    web3Provider: null, //At the begining

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
    }
}

window.onload = function() {
    App.init();
}