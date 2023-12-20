const hre = require("hardhat");
const config = require("./config.js");

async function main() {
  // Configure output to config.json
  await config.initConfig();
  const network = hre.hardhatArguments.network
    ? hre.hardhatArguments.network
    : "dev";
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account: ", deployer.address);

  // Deploy contract
  console.log("Deploying WizardWealth Contract ...");
  const initialSupply = BigInt(1000000 * 10 ** 18);
  const token = await hre.ethers.deployContract("WizardWealth", [
    initialSupply,
  ]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(1))
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
