const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const tokenAddress = "0xf5b8043ffa6427a62174399ffbba0009005e7270";
const mileStoneThreshold = 1000;
const budget = 1000000;
const campaignDetails = "Test Campaign";

describe("Advertisment", function () {
  async function deployContract() {
    const [admin, advertiser, creator] = await ethers.getSigners();
    const Advertisment = await ethers.getContractFactory(
      "AdvertismentContract"
    );
    const advertisment = await Advertisment.deploy();
    return { advertisment, admin, advertiser, creator };
  }

  it("Should create a Proposal and set admin", async function () {
    const { advertisment, admin, advertiser, creator } = await loadFixture(
      deployContract
    );
    expect(await advertisment.owner()).to.equal(admin.address);
  });

  it("should create a new advertisment", async function () {
    const { advertisment, admin, advertiser, creator } = await loadFixture(
      deployContract
    );

    await advertisment.createAdvertisment(
      creator.address,
      budget,
      campaignDetails,
      tokenAddress,
      mileStoneThreshold
    );
    const advertismentDetails = await advertisment.getAdvertisment(1);
    expect(advertismentDetails.creator).to.equal(creator.address);
  });

  it("should approve a advertisment", async function () {
    const { advertisment, admin, advertiser, creator } = await loadFixture(
      deployContract
    );

    await advertisment.createAdvertisment(
      creator.address,
      budget,
      campaignDetails,
      tokenAddress,
      mileStoneThreshold
    );

    const advertismentConnectedToCreator = advertisment.connect(creator);
    await advertismentConnectedToCreator.acceptAdvertisment(1);

    const adveretismentDetails = await advertisment.getAdveretisment(1);
    expect(advertismentDetails.isAccepted).to.equal(true);
  });

  it("should reject a advertisment", async function () {
    const { advertisment, admin, advertiser, creator } = await loadFixture(
      deployContract
    );

    await advertisment.createAdvertisment(
      creator.address,
      budget,
      campaignDetails,
      tokenAddress,
      mileStoneThreshold
    );

    // Connecting the contract to the creator signer before sending the transaction
    const advertismentConnectedToCreator = advertisment.connect(creator);
    await expect(advertismentConnectedToCreator.rejectAdvertisment(1))
      .to.emit(advertismentConnectedToCreator, "AdvertismentRejected")
      .withArgs(1, creator.address);
  });

  it("should fail if someone other than the creator tries to reject a advertisment", async function () {
    const { advertisment, admin, advertiser, creator } = await loadFixture(
      deployContract
    );

    await advertisment.createAdvertisment(
      creator.address,
      budget,
      campaignDetails,
      tokenAddress,
      mileStoneThreshold
    );
    await expect(
      advertisment.connect(admin).rejectAdvertisment(1)
    ).to.be.revertedWith("Only the creator can reject this advertisment");
  });

  // it("should begin ads", async function () {
  //   const { proposal, admin, advertiser, creator } = await loadFixture(
  //     deployContract
  //   );

  //   const proposalConnectedToAdvertiser = proposal.connect(advertiser);
  //   await proposalConnectedToAdvertiser.createProposal(
  //     creator.address,
  //     budget,
  //     campaignDetails,
  //     tokenAddress,
  //     mileStoneThreshold
  //   );

  //   const proposalConnectedToCreator = proposal.connect(creator);
  //   await proposalConnectedToCreator.acceptProposal(1);

  //   await proposalConnectedToAdvertiser.beginAds(1);

  //   const proposalDetails = await proposal.getProposal(1);
  //   expect(proposalDetails.isActive).to.equal(true);
  // });

  // it("should end ads", async function () {
  //   const { proposal, admin, advertiser, creator } = await loadFixture(
  //     deployContract
  //   );

  //   const proposalConnectedToAdvertiser = proposal.connect(advertiser);
  //   await proposalConnectedToAdvertiser.createProposal(
  //     creator.address,
  //     budget,
  //     campaignDetails,
  //     tokenAddress,
  //     mileStoneThreshold
  //   );

  //   const proposalConnectedToCreator = proposal.connect(creator);
  //   await proposalConnectedToCreator.acceptProposal(1);

  //   await proposalConnectedToAdvertiser.beginAds(1);
  //   const proposalDetails = await proposal.getProposal(1);
  //   expect(proposalDetails.isActive).to.equal(true);

  //   await proposalConnectedToAdvertiser.endAds(1);
  //   const proposalDetailsAfterEnd = await proposal.getProposal(1);
  //   expect(proposalDetailsAfterEnd.isActive).to.equal(false);
  // });
});
