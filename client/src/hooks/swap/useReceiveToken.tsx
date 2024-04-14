import { TokenModel } from "@/models/Token.Models";
import React, { useState, useEffect } from "react";

const ethIconLink =
  "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png";

const useReceiveToken = (
  defaultToken: TokenModel
): [TokenModel, (newToken: TokenModel) => void] => {
  const [token, setToken] = useState<TokenModel>(defaultToken);

  return [token, setToken];
};

export default useReceiveToken;
