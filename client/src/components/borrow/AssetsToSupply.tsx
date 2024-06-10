"use client";

import React, { useEffect, useState } from "react";

import GridTemplate from "./GridTemplate";
import { Badge } from "../ui/badge";
import { AssetsToSupplyDataTable } from "./Columns/AssetsToSupplyDataTable";
import { AssetsToSupplyPool, columns } from "./Columns/AssetsToSupplyColumns";
import { CircularProgress } from "@mui/material";
import { fetchTokensData } from "@/services/fetchTokenDetail";
import { getIERC20Abi, getLendingAbi } from "@/contracts/utils/getAbis";
import { getLendingAddress } from "@/contracts/utils/getAddress";
import { useAccount, useChainId, useReadContracts } from "wagmi";
import { ethers } from "ethers";

interface AssetsToSupplyProps {
  allowedTokenData: any;
  allowedTokenIsPending: boolean;
  allowedTokenError: any;
}

const AssetsToSupply = ({
  allowedTokenData,
  allowedTokenIsPending,
  allowedTokenError,
}: AssetsToSupplyProps) => {
  const chain = useChainId();
  const account = useAccount();

  const lendingContract = {
    address: getLendingAddress(chain),
    abi: getLendingAbi(),
  } as const;

  const [tokenData, setTokenData] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    data: balanceTokenData,
    isPending: balanceTokenIsPending,
    error: balanceTokenError,
  } = useReadContracts({
    contracts: (allowedTokenData || []).map((token: any) => ({
      address: token,
      abi: getIERC20Abi(),
      functionName: "balanceOf",
      args: [account.address],
    })),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (allowedTokenIsPending) {
          return;
        }
        const tokens = allowedTokenIsPending
          ? [
            // "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
            // "0x779877A7B0D9E8603169DdbD7836e478b4624789",
          ]
          : allowedTokenData;
        const result = await fetchTokensData(tokens as any[]);
        const formattedData = (result || []).data.map((data: any, index: any) => ({
          id: index,
          address: data.address,
          name: data.name,
          symbol: data.symbol,
          walletBalance: ethers.formatEther(
            balanceTokenData?.[index]?.result as bigint
          ),
        }));
        setTokenData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [allowedTokenData, allowedTokenIsPending, balanceTokenData]);

  return (
    <GridTemplate title="Assets to supply">
      {loading ? (
        <CircularProgress className="self-center" />
      ) : (
        <AssetsToSupplyDataTable columns={columns} data={tokenData} />
      )}
    </GridTemplate>
  );
};

export default AssetsToSupply;
