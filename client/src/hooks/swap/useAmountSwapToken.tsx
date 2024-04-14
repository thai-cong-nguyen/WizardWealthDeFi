import { TokenModel } from "@/models/Token.Models";
import React, { useState, useEffect } from "react";

type UseAmountSwapTokenProps = {
  defaultAmount: number | undefined;
  onChange?: (amount: number | undefined) => void;
};

type UseAmountSwapTokenReturnType = {
  amount: number | undefined;
  handleAmountChange: (newAmount: number | undefined) => void;
};

const useAmountSwapToken = ({
  defaultAmount,
  onChange,
}: UseAmountSwapTokenProps): UseAmountSwapTokenReturnType => {
  const [amount, setAmount] = useState<number | undefined>(defaultAmount);

  const handleAmountChange = (newAmount: number | undefined) => {
    setAmount(newAmount);
    if (onChange) {
      onChange(newAmount);
    }
  };

  return { amount, handleAmountChange };
};

export default useAmountSwapToken;
