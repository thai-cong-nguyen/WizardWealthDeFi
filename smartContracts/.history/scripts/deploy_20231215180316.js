const hre = require("hardhat");
const config = require("./config.js");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account: ", deployer.address);
  const 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(1))
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
