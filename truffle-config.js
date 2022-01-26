var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Set to the localhost
      port: "7545", // According to the port used by Ganache
      network_id: "*" // For matching any network ID
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider("glad belt dirt age derive umbrella weird gospel park pottery hamster best", "https://rinkeby.infura.io/v3/45f80e0c0d9a4993b082feb603e2e598");
      },
      network_id: 4, // 1: mainnet, ... 4: rinkeby
      gas: 4700000
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.10",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};
