"use client";
import React from "react";
import { Button } from "../ui/button";
import { useAccount, useChainId, useReadContract } from "wagmi";
import { getLendingAddress } from "@/contracts/utils/getAddress";
import { getLendingAbi } from "@/contracts/utils/getAbis";
import { CircularProgress } from "@mui/material";
import { ethers } from "ethers";

const Content = () => {
  const chain = useChainId();

  const account = useAccount();

  const lendingContract = {
    address: getLendingAddress(chain),
    abi: getLendingAbi(),
  } as const;

  const {
    data: healthFactorData,
    isPending: healthFactorIsPending,
    error: healthFactorError,
  } = useReadContract({
    ...lendingContract,
    functionName: "healthFactor",
    args: [account.address],
  });

  return (
    <div className="flex flex-row items-center h-20 flex-wrap gap-4">
      <span className="text-2xl font-bold h-full">Health factor:</span>
      {healthFactorIsPending ? (
        <CircularProgress />
      ) : (
        <span className="text-2xl font-bold h-full opacity-90 text-lime-700">{`${parseFloat(ethers.formatEther(
          healthFactorData as bigint
        )).toFixed(5)}`}</span>
      )}
    </div>
  );
};

export default Content;
