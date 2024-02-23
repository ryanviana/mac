
![Logo](https://github.com/pjvperes/avalanche-mac/assets/70733914/03ad5a8a-a338-4384-8de1-91bded6e0950)

# 🌐 MAC - Marketplace for Advertisers and Creators

Welcome to MAC, a decentralized marketplace revolutionizing the way Advertisers and Creators collaborate. We offer customizable advertisement deals with real-time, cross-border payments based on conversion and cost per milestone. Dive into the future of advertising with MAC! 🚀

## 🌟 What is MAC?

MAC is a decentralized marketplace designed for Advertisers and Creators to come together and create impactful, customizable advertisement deals. Our platform provides a trustable and efficient environment for all your advertising needs.

### Features

- **MAC Platform**: A marketplace for advertisers and creators to interact and forge meaningful deals. Explore it [here](https://avalanche-mac.vercel.app/). **Just don't forget to mint tokens to your wallet, the contract address is just below**!
- **MAC-R Service**: Our proprietary service for creating custom & trackable advertisements. Try our [test custom url](https://avalanche-mac-url.vercel.app/test) which redirects to Google.
- **Comprehensive Backend**: A fully deployed, [documented](https://backend-mac.vercel.app/swagger) (Swagger) backend application that supports the MAC platform. 
- **Avalanche Blockchain**: Ensuring decentralized operation with automated daily payments and reliable campaign management.

## 📹 Dive into MAC: Our Exciting Pitch Presentation! 🌟

Ever wondered how the MAC platform can transform the advertising world? Dive deep into our vision and discover the innovative features of MAC with our engaging pitch presentation. 🚀🎥

👉 [Watch our pitch and see MAC in action!](https://youtu.be/Ay8OJkFNwkg)


👉 [Check MAC's slideshow presentation!](https://drive.google.com/file/d/1X24HTvm-QEDjLwpmm2w6y5RLPzAmGFSI/view?usp=sharing)

## 🚀 Smart Contracts on Avalanche Blockchain

### Architecture
![MAC](https://github.com/pjvperes/avalanche-mac/assets/70733914/d3eba9b4-906e-4602-b0df-90086f5c06f6)

![MAC_R](https://github.com/pjvperes/avalanche-mac/assets/70733914/658e2185-a93f-4c5d-92f0-2eb759af0e69)

![CHAINLINK](https://github.com/pjvperes/avalanche-mac/assets/70733914/2a1fb615-19c4-4514-bd71-b96c6db5a9c3)

### Main Contracts

- **MACPlatformManager**: [`0xCD1078a1F6C5ac82BB7eF6ABAb8BD69c581F93bE`](https://subnets-test.avax.network/c-chain/address/0x07c420C56BaeFc7cD6c4828d58d68e6ba23B1d28)
  - Manages all MAC Operations.
- **Advertisement**: [`0x4348Ce4487dAbEFF94d463cf0ea855DF8c23B360`](https://subnets-test.avax.network/c-chain/address/0x4348Ce4487dAbEFF94d463cf0ea855DF8c23B360)
  - Stores and manages advertisement information.
- **Payment**: [`0xD4Ac9Ed02e0EDb4a7738BC3e0F3e36EcD47D11C8`](https://subnets-test.avax.network/c-chain/address/0xD4Ac9Ed02e0EDb4a7738BC3e0F3e36EcD47D11C8)
  - Handles creation and execution of payments using ERC-20 tokens.
- **AccessControl**: [`0x625Ff644c4f99C8d859532117bdb6142cCC43EF2`](https://subnets-test.avax.network/c-chain/address/0x625Ff644c4f99C8d859532117bdb6142cCC43EF2)
  - Manages access control within the MAC context.
- **ClickCountFunction**: [`0x40d0F2e0d93d519FBF71A9b0c89D92ce6CB2Efdf`](https://subnets-test.avax.network/c-chain/address/0x40d0F2e0d93d519FBF71A9b0c89D92ce6CB2Efdf)
  - Chainlink function for tracking advertisement clicks.
- **ActiveAdsKeeper**: [`0x41E933DF2ca46B97A0731292A3Ff24bF3707A66f`](https://subnets-test.avax.network/c-chain/address/0x41E933DF2ca46B97A0731292A3Ff24bF3707A66f)
  - Chainlink keeper for active advertisements, updating click counts and milestones.
- **MilestoneKeeper**: [`0xce22d0e8027C4604d468B94656530bf50825A059`](https://subnets-test.avax.network/c-chain/address/0xce22d0e8027C4604d468B94656530bf50825A059)
  - Manages milestones and executes payments based on Chainlink logs.
- **Token**: [`0xC070394CBB261eA11a0A82AC552b581f6EDbB039`](https://subnets-test.avax.network/c-chain/address/0xC070394CBB261eA11a0A82AC552b581f6EDbB039)
  - Used to mint tokens for your wallet and test our solution.

### Chainlink Keepers

- [Daily Active Ads Keeper](https://automation.chain.link/fuji/3646668707667596729200555341527389313365931653295780104494029805417725006916)
- [Update Active ADS Keeper](https://automation.chain.link/fuji/0x1a987bcf208d324bf59313750283de87cc4f1e723adbb3b7e8f1874c9b52467d)
- [Milestone Reached Payment Keeper](https://automation.chain.link/fuji/0xdd203a4a37cbe5d1ec7671c1a8e2df628aa6cee30bcbc780cfdfb5caf1603a78)

## 🌍 Particle Connect

Particle Connect allows seamless onboarding into our Web3 application, offering an easy way for users to register and manage their wallet through a simplified social login - perfect for social media content creators.



## 🖱️ Links

#### MAC
(Just don't forget to mint tokens to your wallet, the contract address is just above!)

https://avalanche-mac.vercel.app/

#### MAC-R
https://avalanche-mac-url.vercel.app/test

#### SWAGGER
https://backend-mac.vercel.app/swagger

#### Daily Active Ads Keeper
https://automation.chain.link/fuji/3646668707667596729200555341527389313365931653295780104494029805417725006916

#### Update Active ADS Kepper
https://automation.chain.link/fuji/0x1a987bcf208d324bf59313750283de87cc4f1e723adbb3b7e8f1874c9b52467d

#### Milestone Reached Payment Keeper
https://automation.chain.link/fuji/0xdd203a4a37cbe5d1ec7671c1a8e2df628aa6cee30bcbc780cfdfb5caf1603a78



## 👨‍💻 Authors

- [@ryanviana](https://www.github.com/ryanviana)
- [@pjvperes](https://www.github.com/pjvperes)
- [@gugasanchez](https://www.github.com/gugasanchez)
