require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
    },
  },
};
