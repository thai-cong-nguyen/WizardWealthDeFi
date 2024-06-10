const {
  getTokenByContractAddress,
  getTokensByContractAddress,
} = require("../services/getToken.service");

exports.getTokenByContractAddressController = async (req, res, next) => {
  try {
    const { contractAddress, chainId } = req.body;
    const response = await getTokenByContractAddress({
      contractAddress,
      chainId,
    });
    return res.status(response.code).send(response);
  } catch (error) {
    console.error(error);
    return res.status(404).send(error.message);
  }
};

exports.getTokensByContractAddressController = async (req, res, next) => {
  try {
    const { contractAddresses, chainId } = req.body;
    const response = await getTokensByContractAddress({
      contractAddresses,
      chainId,
    });
    return res.status(response.code).send(response);
  } catch (error) {
    console.error(error);
    return res.status(404).send(error.message);
  }
};
