const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const initialSupply = 100000;
const milestoneThreshold = 1000;
const budget = 10000;
const campaignDetails = "Test Campaign";

describe("MacMain", function () {
  async function deployContract() {
    const [admin, advertiser, creator] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy(initialSupply);

    const Proposal = await ethers.getContractFactory("ProposalContract");
    const proposal = await Proposal.deploy();

    const Payment = await ethers.getContractFactory("PaymentContract");
    const payment = await Payment.deploy(proposal.target);

    const MacAccessControl = await ethers.getContractFactory(
      "MACAccessControl"
    );
    const macAccessControl = await MacAccessControl.deploy();

    const MacMain = await ethers.getContractFactory("MacMain");
    const macMain = await MacMain.deploy(
      proposal.target,
      payment.target,
      macAccessControl.target
    );

    return {
      payment,
      admin,
      advertiser,
      creator,
      token,
      proposal,
      macMain,
      macAccessControl,
    };
  }

  let fixtures;

  beforeEach(async function () {
    fixtures = await loadFixture(deployContract);
    const { advertiser, creator, token, macMain, macAccessControl } = fixtures;

    await macAccessControl.assignAdvertiserRole(advertiser.address);
    await macAccessControl.assignCreatorRole(creator.address);

    const macMainAdvertiser = macMain.connect(advertiser);
    await macMainAdvertiser.createProposal(
      creator.address,
      budget,
      campaignDetails,
      token.target,
      milestoneThreshold
    );
  });

  it("Should createProposal", async function () {
    const { creator, token, macMain } = fixtures;

    const proposalDetails = await macMain.getProposal(1);
    expect(proposalDetails.creator).to.equal(creator.address);
    expect(proposalDetails.budget).to.equal(budget);
    expect(proposalDetails.campaignDetails).to.equal(campaignDetails);
    expect(proposalDetails.token).to.equal(token.target);
    expect(proposalDetails.milestoneThreshold).to.equal(milestoneThreshold);
    expect(proposalDetails.isAccepted).to.equal(false);
    expect(proposalDetails.isActive).to.equal(true);
    expect(proposalDetails.isFunded).to.equal(false);
  });

  it("Should grant roles correctly", async function () {
    const { advertiser, creator, macAccessControl } = fixtures;
    const creatorIsCreator = await macAccessControl.isCreator(creator.address);
    const advertiserIsAdvertiser = await macAccessControl.isAdvertiser(
      advertiser.address
    );
    const advertiserIsCreator = await macAccessControl.isCreator(
      advertiser.address
    );
    const creatorIsAdvertiser = await macAccessControl.isAdvertiser(
      creator.address
    );
    expect(creatorIsCreator).to.equal(true);
    expect(advertiserIsAdvertiser).to.equal(true);
    expect(advertiserIsCreator).to.equal(false);
    expect(creatorIsAdvertiser).to.equal(false);
  });

  it("Should acceptProposal", async function () {
    const { creator, macMain } = fixtures;
    const macMainCreator = macMain.connect(creator);
    await macMainCreator.acceptProposal(1);
    const proposalDetails = await macMain.getProposal(1);
    expect(proposalDetails.isAccepted).to.equal(true);
  });

  it("Should rejectProposal", async function () {
    const { creator, macMain } = fixtures;
    const macMainCreator = macMain.connect(creator);
    await macMainCreator.rejectProposal(1);
    const proposalDetails = await macMain.getProposal(1);
    expect(proposalDetails.isAccepted).to.equal(false);
  });
});
