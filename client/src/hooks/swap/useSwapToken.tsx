import { TokenModel } from "@/models/Token.Models";
import React, { useState, useEffect } from "react";

type UseSwapTokenProps = {
  defaultToken?: TokenModel | undefined;
  onChange?: (newToken: TokenModel | undefined) => void;
};

type UseSwapTokenReturnType = {
  token: TokenModel | undefined;
  handleSwapTokenChange: (newToken: TokenModel | undefined) => void;
};

const useSwapToken = ({
  defaultToken,
  onChange,
}: UseSwapTokenProps): UseSwapTokenReturnType => {
  const [token, setToken] = useState<TokenModel | undefined>(
    defaultToken || undefined
  );

  const handleSwapTokenChange = (newToken: TokenModel | undefined) => {
    if (newToken !== token) {
      setToken(newToken);
      if (onChange) {
        onChange(newToken);
      }
    }
  };
  return { token, handleSwapTokenChange };
};

export default useSwapToken;
