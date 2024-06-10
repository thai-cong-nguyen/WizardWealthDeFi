const Moralis = require("moralis").default;

exports.getTokenByContractAddress = async ({ contractAddress, chainId }) => {
  try {
    if (!contractAddress) throw new Error("Missing contract address");
    const response = await Moralis.EvmApi.token.getTokenMetadata({
      chain: chainId,
      addresses: [contractAddress],
    });
    return {
      error: false,
      code: 200,
      data: response,
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      code: 404,
      message: error.message,
    };
  }
};

exports.getTokensByContractAddress = async ({ contractAddresses, chainId }) => {
  try {
    if (!contractAddresses) throw new Error("Missing contract addresses");
    const response = await Moralis.EvmApi.token.getTokenMetadata({
      chain: chainId,
      addresses: contractAddresses,
    });

    return {
      error: false,
      code: 200,
      data: response,
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      code: 404,
      message: error.message,
    };
  }
};
