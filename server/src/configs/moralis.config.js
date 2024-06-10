require("dotenv").config();
const Moralis = require("moralis").default;

const connectMoralis = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  })
    .then(() => {
      console.log("Moralis: Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Moralis: Unable to connect to the Moralis", error.message);
    });
};

module.exports = { connectMoralis };
