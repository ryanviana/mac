const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const amount = 1000;
const initialSupply = 100000;

describe("Payment", function () {
  async function deployContract() {
    const [admin, advertiser, creator] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy(initialSupply);

    const Proposal = await ethers.getContractFactory("ProposalContract");
    const proposal = await Proposal.deploy();

    const Payment = await ethers.getContractFactory("PaymentContract");
    const payment = await Payment.deploy(proposal.target);

    return { payment, admin, advertiser, creator, token };
  }

  it("Should create a Payment and set admin", async function () {
    const { payment, admin, advertiser, creator } = await loadFixture(
      deployContract
    );
    expect(await payment.owner()).to.equal(admin.address);
  });

  it("should create a new payment", async function () {
    const { payment, admin, advertiser, creator, token } = await loadFixture(
      deployContract
    );

    await token.transfer(payment.target, 100000);
    const balance = await payment.getBalance(token.target);
    expect(balance).to.equal(100000);
    await payment.createPayment(creator.address, amount, token.target);
    const paymentDetails = await payment.getPayment(1);
    // console.log(paymentDetails);
    expect(paymentDetails.recipient).to.equal(creator.address);
    expect(paymentDetails.amount).to.equal(amount);
  });

  it("should execute the payment", async function () {
    const { payment, admin, advertiser, creator, token } = await loadFixture(
      deployContract
    );

    await token.transfer(payment.target, 100000);
    const balance = await payment.getBalance(token.target);
    expect(balance).to.equal(100000);
    await payment.createPayment(creator.address, amount, token.target);

    const paymentConnectedToCreator = payment.connect(creator);
    await paymentConnectedToCreator.executePayment(1);

    const paymentDetails = await payment.getPayment(1);
    expect(paymentDetails.isPaid).to.equal(true);
    expect(await token.balanceOf(creator.address)).to.equal(amount);
    expect(await payment.getBalance(token.target)).to.equal(
      initialSupply - amount
    );
  });
});
