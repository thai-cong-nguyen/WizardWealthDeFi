import { getWizardWealthAddress } from "@/contracts/utils/getAddress";
import { TokenModel } from "@/models/Token.Models";

export const defaultTokens = [
  new TokenModel(
    "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
    null,
    "Ethereum",
    "ETH", 
    "18",
    "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png",
    null,
    null,
    null,
    null,
    null,
    1,
    null,
    null,
    null,
    true
  ),
  new TokenModel(
    "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    null,
    "Uniswap",
    "UNI",
    "18",
   null,
   "064ee9557deba73c1a31014a60f4c081284636b785373d4ccdd1b3440df11f43",
    null,
    "1000000000000000000000000000",
    "1000000000",
    "0",
    1,
     "2022-08-03T17:58:24.000Z",
     false,
    false
  ),
  new TokenModel(
    "0x1b09f27bc73d6c8df969acad8474e034c76cfc63",
    null,
    "WizardWealth",
    "WiWe",
    "18",
   null,
   null,
    null,
    "100000000000000000000000000",
    "100000000",
    "5739779",
    1,
     "2024-04-20T15:49:00.000Z",
     false,
    false
  ),
];