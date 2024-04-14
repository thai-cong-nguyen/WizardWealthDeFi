import { TokenModel } from "@/models/Token.Models";

const ethIconLink =
  "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png";

export const tokens = [
  new TokenModel("Ethereum",  "ETH", "",  ethIconLink),
  new TokenModel("Uniswap",  "UNI", "",  ethIconLink),
  new TokenModel("Wizard Wealth",  "WW", "",  ethIconLink),
  new TokenModel("Bitcoin",  "BTC", "",  ethIconLink),
  new TokenModel("AAve",  "AAve", "",  ethIconLink),
];