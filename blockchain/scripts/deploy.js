require("ethers");
const fs = require("fs");
const path = require("path");

const source = fs
  .readFileSync(path.resolve(__dirname, "count-click.js"))
  .toString();

const router = "0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0";
const initialSupply = 1000000;

async function main() {
  const AccessControl = await ethers.deployContract("MACAccessControl");
  await AccessControl.waitForDeployment();
  const accessControlAddress = AccessControl.target;
  console.log("AccessControl deployed to:", accessControlAddress);

  const Token = await ethers.deployContract("Token", [initialSupply]);
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

  const ClickCountOracle = await ethers.deployContract("ClickCountFunction", [
    router,
    advertisementAddress,
    source,
  ]);
  await ClickCountOracle.waitForDeployment();
  const clickCountAddress = ClickCountOracle.target;
  console.log("ClickCountFunction deployed to:", clickCountAddress);

  const ActiveAdsKeeper = await ethers.deployContract("ActiveAdsKeeper", [
    clickCountAddress,
  ]);
  await ActiveAdsKeeper.waitForDeployment();
  console.log("ActiveAdsKeeper deployed to:", ActiveAdsKeeper.target);

  const MilestoneKeeper = await ethers.deployContract(
    "MilestonePaymentKeeper",
    [paymentAddress, advertisementAddress]
  );
  await MilestoneKeeper.waitForDeployment();
  const milestoneAddress = MilestoneKeeper.target;
  console.log("MilestoneKeeper deployed to:", milestoneAddress);

  const MACPlatformManager = await ethers.deployContract("MacMain", [
    advertisementAddress,
    paymentAddress,
    accessControlAddress,
  ]);
  await MACPlatformManager.waitForDeployment();
  console.log("MACPlatformManager deployed to:", MACPlatformManager.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
