const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const initialSupply = 100000;
const milestoneThreshold = 1000;
const budget = 10000;
const campaignDetails = "Test Campaign";
const CPM = 100;
let id = 12;

describe("MacMain", function () {
  async function deployContract() {
    const [admin, advertiser, creator] = await ethers.getSigners();

    // const Token = await ethers.getContractFactory("Token");
    // const token = await Token.deploy(initialSupply);

    // const Proposal = await ethers.getContractFactory("ProposalContract");
    // const proposal = await Proposal.deploy();

    // const Payment = await ethers.getContractFactory("PaymentContract");
    // const payment = await Payment.deploy(proposal.target);

    // const MacAccessControl = await ethers.getContractFactory(
    //   "MACAccessControl"
    // );
    // const macAccessControl = await MacAccessControl.deploy();

    // const MacMain = await ethers.getContractFactory("MacMain");
    // const macMain = await MacMain.deploy(
    //   proposal.target,
    //   payment.target,
    //   macAccessControl.target
    // );

    const AccessControl = await ethers.deployContract("MACAccessControl");
    await AccessControl.waitForDeployment();
    const accessControlAddress = AccessControl.target;
    console.log("AccessControl deployed to:", accessControlAddress);

    const Token = await ethers.deployContract("Token");
    await Token.waitForDeployment();
    const tokenAddress = Token.target;
    console.log("Token deployed to:", tokenAddress);

    const Advertisement = await ethers.deployContract("AdvertisementContract");
    await Advertisement.waitForDeployment();
    const advertisementAddress = Advertisement.target;
    console.log("Advertisement deployed to:", advertisementAddress);

    const Payment = await ethers.deployContract("PaymentContract", [
      advertisementAddress,
    ]);
    await Payment.waitForDeployment();
    const paymentAddress = Payment.target;
    console.log("Payment deployed to:", paymentAddress);

    const MACPlatformManager = await ethers.deployContract("MacMain", [
      advertisementAddress,
      paymentAddress,
      accessControlAddress,
    ]);
    await MACPlatformManager.waitForDeployment();
    console.log("MACPlatformManager deployed to:", MACPlatformManager.target);

    return {
      admin,
      advertiser,
      creator,
      Payment,
      Token,
      MACPlatformManager,
      AccessControl,
    };
  }

  let fixtures;

  beforeEach(async function () {
    fixtures = await loadFixture(deployContract);
    const { advertiser, creator, Token, MACPlatformManager, AccessControl } =
      fixtures;

    await AccessControl.assignAdvertiserRole(advertiser.address);
    await AccessControl.assignCreatorRole(creator.address);

    const macMainAdvertiser = MACPlatformManager.connect(advertiser);
    await macMainAdvertiser.createAdvertisement(
      id,
      creator.address,
      budget,
      Token.target,
      milestoneThreshold,
      CPM
    );

    console.log("Advertiser created advertisement");
  });

  it("Should accept a proposal", async function () {
    const { admin, advertiser, creator, Payment, Token, MACPlatformManager } =
      fixtures;

    console.log("accepted: " + (await MACPlatformManager.isAccepted(id)));
    console.log("active: " + (await MACPlatformManager.isActive(id)));
    console.log("accepting");
    await MACPlatformManager.connect(creator).acceptAdvertisement(id);
    console.log("accepted: " + (await MACPlatformManager.isAccepted(id)));
    console.log("active: " + (await MACPlatformManager.isActive(id)));
  });

  it("Should reject a proposal", async function () {
    const { admin, advertiser, creator, Payment, Token, MACPlatformManager } =
      fixtures;

    console.log("accepted: " + (await MACPlatformManager.isAccepted(id)));
    console.log("active: " + (await MACPlatformManager.isActive(id)));
    console.log("rejecting");
    await MACPlatformManager.connect(creator).rejectAdvertisement(id);
    console.log("accepted: " + (await MACPlatformManager.isAccepted(id)));
    console.log("active: " + (await MACPlatformManager.isActive(id)));
  });

  it("Should try to accept without being the creator", async function () {
    const { admin, advertiser, creator, Payment, Token, MACPlatformManager } =
      fixtures;

    console.log("accepted: " + (await MACPlatformManager.isAccepted(id)));
    console.log("active: " + (await MACPlatformManager.isActive(id)));
    console.log("accepting");
    await expect(
      MACPlatformManager.connect(advertiser).acceptAdvertisement(id)
    ).to.be.revertedWith("Caller is not a creator");
    console.log("accepted: " + (await MACPlatformManager.isAccepted(id)));
    console.log("active: " + (await MACPlatformManager.isActive(id)));
  });
});
