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
    rinkeby: {
      provider: () => new HDWalletProvider(key.mnemonics,"https://rinkeby.infura.io/v3/f0be3b9145b04371b59b514a59fde412",0),
      network_id: 4,
      gas: 4612388,
      path:"m/44'/60'/0'/0/0"
      // Gas limit used for deploys
    }
  },
  compilers: {
      solc: {
        version: "0.8.0"
      }
  } 
};
