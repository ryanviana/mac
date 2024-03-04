require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.24",
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gasPrice: 25000000000,
    },
    bnbTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545", // Testnet RPC URL
      chainId: 97, // Testnet Chain ID
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Your wallet's private key
    },
  },
};
