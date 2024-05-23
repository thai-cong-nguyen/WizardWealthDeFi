const Moralis = require("moralis").default;

exports.getTokenByContractAddress = async ({ contractAddress, chainId }) => {
  try {
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
