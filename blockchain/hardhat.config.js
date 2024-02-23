require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.24",
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc", // RPC URL for Avalanche Fuji Testnet
      chainId: 43113, // Chain ID for Avalanche Fuji Testnet
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Replace with your wallet's private key
      gasPrice: 25000000000,
    },
  },
};
