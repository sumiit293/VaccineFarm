const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const key = require("./mnemonics.json");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(key.mnemonic, "https://ropsten.infura.io/v3/f0be3b9145b04371b59b514a59fde412")
      },
      network_id: 3
    }
  },
  compilers: {
      solc: {
        version: "0.8.0"
      }
  } 
};
