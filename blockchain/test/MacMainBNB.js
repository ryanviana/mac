const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

const MACAccessControlJSON =
  "../artifacts/contracts/MACAccessControl.sol/MACAccessControl.json";
const MACAccessControlABI = MACAccessControlJSON.abi;

const TokenJSON = "../artifacts/contracts/Token.sol/Token.json";
const TokenABI = TokenJSON.abi;

const AdvertisementJSON =
  "../artifacts/contracts/AdvertisementContract.sol/AdvertisementContract.json";
const AdvertisementABI = AdvertisementJSON.abi;

const PaymentJSON =
  "../artifacts/contracts/PaymentContract.sol/PaymentContract.json";
const PaymentABI = PaymentJSON.abi;

const MACPlatformManagerJSON =
  "../artifacts/contracts/MacMain.sol/MacMain.json";
const MACPlatformManagerABI = MACPlatformManagerJSON.abi;
describe("MACPlatformManager (Deployed Interactions)", function () {
  let MACAccessControl, Token, Advertisement, Payment, MACPlatformManager;
  let owner, advertiser, creator;

  before(async function () {
    [owner, advertiser, creator] = await ethers.getSigners();

    const provider = ethers.getDefaultProvider(
      "https://data-seed-prebsc-1-s1.binance.org:8545"
    );

    MACAccessControl = new ethers.Contract(
      "0x3ca34895dBeD1CDBcC86a6Ce234CBC79dB140fb8",
      MACAccessControlABI,
      provider
    );
    Token = new ethers.Contract(
      "0xD5C07768c7F387Aa5500d22ADD67715083fFA739",
      TokenABI,
      provider
    );
    Advertisement = new ethers.Contract(
      "0x075b2D6ce53154148F3C5e990bE9b4856bE3B610",
      AdvertisementABI,
      provider
    );
    Payment = new ethers.Contract(
      "0x22bFAB5274409bEc3F065da33b4260DD36E8cf7C",
      PaymentABI,
      provider
    );
    MACPlatformManager = new ethers.Contract(
      "0x9De18629eB219Cd822ACa8e8c4281F51f0BdDbDC",
      MACPlatformManagerABI,
      provider
    );

    const deployerPrivateKey = process.env.PRIVATE_KEY;
    const deployerWallet = new ethers.Wallet(deployerPrivateKey, provider);

    MACAccessControl = MACAccessControl.connect(deployerWallet);
  });

  it("Should grant advertiser role to the advertiser and to creator", async function () {
    await MACAccessControl.grantAdvertiserRole(advertiser.address);
    await MACAccessControl.grantCreatorRole(creator.address);
    expect(await MACAccessControl.isAdvertiser(advertiser.address)).to.be.true;
    expect(await MACAccessControl.isCreator(creator.address)).to.be.true;
  });

  it("Should create an advertisement", async function () {
    const advertisementId = 1; // Assuming you have an advertisement with ID 1
    const budget = 10000;
    const milestoneThreshold = 1000;
    const CPM = 100;

    const macMainAdvertiser = MACPlatformManager.connect(advertiser);
    const tx = await macMainAdvertiser.createAdvertisement(
      advertisementId,
      creator.address,
      budget,
      Token.target,
      milestoneThreshold,
      CPM
    );
    await tx.wait(); // Wait for confirmation

    // Fetch the updated advertisement data
    const updatedAd = await MACPlatformManager.getAdvertisement(
      advertisementId
    );
    console.log(updatedAd);
    console.log("Advertisement created");
  });

  // ... Add your other tests similarly (rejectAdvertisement, etc.)
});
