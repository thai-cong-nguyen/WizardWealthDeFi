const express = require("express");
const router = express.Router();

const {
  getTokenByContractAddressController,
} = require("../controllers/getToken.controller");

router.post("/contract", getTokenByContractAddressController);

module.exports = router;
