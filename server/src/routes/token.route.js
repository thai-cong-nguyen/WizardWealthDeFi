const express = require("express");
const router = express.Router();

const {
  getTokenByContractAddressController,
  getTokensByContractAddressController,
} = require("../controllers/getToken.controller");

router.post("/contract", getTokenByContractAddressController);
router.post("/contracts", getTokensByContractAddressController);
module.exports = router;
