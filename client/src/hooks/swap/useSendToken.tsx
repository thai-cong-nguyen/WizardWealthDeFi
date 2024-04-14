import { TokenModel } from "@/models/Token.Models";
import React, { useState, useEffect } from "react";

type UseSendTokenProps = {
  defaultToken?: TokenModel | undefined;
  onChange?: (newToken: TokenModel | undefined) => void;
};

type UseSendTokenReturnType = {
  token: TokenModel | undefined;
  handleSendTokenChange: (newToken: TokenModel | undefined) => void;
};

const useSendToken = ({
  defaultToken,
  onChange,
}: UseSendTokenProps): UseSendTokenReturnType => {
  const [token, setToken] = useState<TokenModel | undefined>(
    defaultToken || undefined
  );

  const handleSendTokenChange = (newToken: TokenModel | undefined) => {
    if (newToken != token) {
      setToken(newToken);
      if (onChange) {
        onChange(newToken);
      }
    }
  };

  return { token, handleSendTokenChange };
};

export default useSendToken;
