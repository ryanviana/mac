# PayPerClick Smart Contract 🖥

[Take a look in our smartcontract!](https://github.com/gugasanchez/starknet-mac/tree/main/packages/madara).

[Goerli Contract Address:](https://goerli.voyager.online/contract/0x05da0fc073db1c6659cbb5c288157a4d33334b65386919bdd1c295a37f3bd308#writeContract): 0x05da0fc073db1c6659cbb5c288157a4d33334b65386919bdd1c295a37f3bd308

## Overview
The PayPerClick smart contract, designed for the Starknet platform using Cairo, establishes a collaborative ecosystem between advertisers and content creators. It enables advertisers to partner with creators for product promotion, ensuring transparent and decentralized transactions.

## Features
- **Create Partnership:** Advertisers can initiate partnerships with content creators, specifying the payment token, cost per thousand impressions (CPM), and total payment amount.
- **Pay Creator:** Enables advertisers to compensate creators based on agreed terms.
- **End Partnership:** Allows either party to terminate the partnership agreement.
- **Announcement Management:** Functions to check the activity status of announcements, view announcement details, and calculate remaining payment amounts.
- **Index Tracking:** Retrieve the current index of announcements for specific advertiser-creator pairs.
- **Price Conversion:** Functions to obtain current Bitcoin (BTC) and Ethereum (ETH) prices in USD by using Pragma Oracles.

## Contract Structure
### Traits and Interfaces
- IPayPerClick<TContractState>: Defines the contract's main functionalities like creating partnerships, payments, and managing announcements.

### Main Module: PayPerClick
- Constructor: Initializes the contract with cryptocurrency addresses and the **Pragma oracle** address for price feeds.
- Storage: Manages announcements, indices, token addresses, and the **Pragma contract**.
- Announcement and Partnership Structures: Holds details about each advertising agreement.
- Token Management: Functions to handle token transfers and conversions.
### Private and Utility Functions
- Index management, price retrieval from oracles, and currency conversion utilities.
### Deployment and Usage
 To deploy and interact with the PayPerClick contract:

- Compile the contract using Scarb.
- Deploy the compiled contract to the Starknet blockchain.
- Interact with the contract through Starknet function calls.

For detailed deployment and interaction steps, please refer to the Starknet and Cairo documentation.

## Conclusion
This PayPerClick smart contract represents a novel approach to managing advertising relationships on the blockchain, offering transparency, security, and ease of transaction between advertisers and creators.
