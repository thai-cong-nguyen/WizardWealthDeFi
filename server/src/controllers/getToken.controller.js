const { getTokenByContractAddress } = require("../services/getToken.service");

exports.getTokenByContractAddressController = async (req, res, next) => {
  try {
    console.log(req);
    console.log(req.body);
    const { contractAddress, chainId } = req.body;
    console.log(contractAddress, chainId);
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
