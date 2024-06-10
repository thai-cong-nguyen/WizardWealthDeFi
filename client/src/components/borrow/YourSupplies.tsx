"use client";
import React, { useEffect, useState } from "react";

// Components
import { Badge } from "../ui/badge";
import GridTemplate from "./GridTemplate";

import { SupplyingPool, columns } from "./Columns/YourSuppliesColumns";
import { YourSuppliesDataTable } from "./Columns/YourSuppliesDataTable";
import { CircularProgress } from "@mui/material";
import { useAccount, useChainId, useReadContracts } from "wagmi";
import { getLendingAddress } from "@/contracts/utils/getAddress";
import { getIERC20Abi, getLendingAbi } from "@/contracts/utils/getAbis";
import { fetchTokensData } from "@/services/fetchTokenDetail";
import { ethers } from "ethers";

interface YourSuppliesProps {
  suppliedTokensData: any;
  suppliedTokensIsPending: boolean;
  suppliedTokensError: any;
}

const YourSupplies = ({
  suppliedTokensData,
  suppliedTokensIsPending,
  suppliedTokensError,
}: YourSuppliesProps) => {
  const chain = useChainId();

  const account = useAccount();

  const lendingContract = {
    address: getLendingAddress(chain),
    abi: getLendingAbi(),
  } as const;

  const [tokenData, setTokenData] = useState([]);
  const amountToken = useState();
  const [loading, setLoading] = useState(true);

  const suppliedTokens = suppliedTokensData?.[0];

  const {
    data: balanceTokenData,
    isPending: balanceTokenIsPending,
    error: balanceTokenError,
  } = useReadContracts({
    contracts: (suppliedTokens || []).map((token: any) => ({
      address: token,
      abi: getIERC20Abi(),
      functionName: "balanceOf",
      args: [account.address],
    })),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (suppliedTokensIsPending) {
          return;
        }
        const tokens = suppliedTokensIsPending
          ? [
            // "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
            // "0x779877A7B0D9E8603169DdbD7836e478b4624789",
          ]
          : suppliedTokensData[0];
        const result = await fetchTokensData(tokens as any[]);
        const formattedData = result.data.reduce(
          (acc: any[], currentValue: any, currentIndex: any) => {
            if (
              (suppliedTokensData[1][currentIndex] as bigint) ===
              ethers.parseEther("0")
            ) {
              return acc;
            }
            acc.push({
              id: currentIndex,
              address: currentValue.address,
              name: currentValue.name,
              symbol: currentValue.symbol,
              balance: ethers.formatEther(suppliedTokensData[1][currentIndex]),
              walletBalance: ethers.formatEther(
                balanceTokenData?.[currentIndex]?.result as bigint
              ),
            });
            return acc;
          },
          []
        );
        setTokenData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [balanceTokenData, suppliedTokensData, suppliedTokensIsPending]);

  return (
    <GridTemplate title="Your Supplies" isNothing={tokenData ? true : false}>
      {/* Table */}
      {loading ? (
        <CircularProgress className="self-center" />
      ) : (
        <YourSuppliesDataTable columns={columns} data={tokenData} />
      )}
    </GridTemplate>
  );
};

export default YourSupplies;
