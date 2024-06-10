import React, { useEffect, useState } from "react";

// Components
import { Badge } from "../ui/badge";
import GridTemplate from "./GridTemplate";

import { BorrowingPool, columns } from "./Columns/YourBorrowingsColumns";
import { YourBorrowingsDataTable } from "./Columns/YourBorrowingsDataTable";
import { fetchTokensData } from "@/services/fetchTokenDetail";
import { getLendingAddress } from "@/contracts/utils/getAddress";
import { getLendingAbi } from "@/contracts/utils/getAbis";
import { useAccount, useChainId } from "wagmi";
import { CircularProgress } from "@mui/material";
import { ethers } from "ethers";

interface YourBorrowingsProps {
  borrowedTokensData: any;
  borrowedTokensIsPending: boolean;
  borrowedTokensError: any;
}

const YourBorrowings = ({
  borrowedTokensData,
  borrowedTokensIsPending,
  borrowedTokensError,
}: YourBorrowingsProps) => {
  const chain = useChainId();
  const account = useAccount();

  const lendingContract = {
    address: getLendingAddress(chain),
    abi: getLendingAbi(),
  } as const;

  const [tokenData, setTokenData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (borrowedTokensIsPending) {
          return;
        }
        const tokens = borrowedTokensIsPending
          ? [
            // "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
            // "0x779877A7B0D9E8603169DdbD7836e478b4624789",
          ]
          : borrowedTokensData[0];
        const result = await fetchTokensData(tokens as any[]);
        const formattedData = (result || []).data.reduce(
          (acc: any[], currentValue: any, currentIndex: any) => {
            if (
              (borrowedTokensData[1][currentIndex] as bigint) ===
              ethers.parseEther("0")
            ) {
              return acc;
            }
            acc.push({
              id: currentIndex,
              address: currentValue.address,
              name: currentValue.name,
              symbol: currentValue.symbol,
              debt: ethers.formatEther(borrowedTokensData[1][currentIndex]),
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
  }, [borrowedTokensData, borrowedTokensIsPending]);

  // const {
  //   data: maxRepayAmountData,
  //   isPending: maxRepayAmountIsPending,
  //   error: maxRepayAmountError,
  // } = useReadContracts({
  //   contracts: viewData?.map((token, index) => {
  //     return {
  //       ...lendingContract,
  //       functionName:
  //     }
  //   }, []),
  // });

  // const adjustTheHealthFactor = (
  //   borrowedValueInETH: bigint,
  //   collateralValueInETH: bigint
  // ): bigint => {
  //   const collateralAjustedForThershold =
  //     (collateralValueInETH * (constantData?.[0].result as bigint)) /
  //     ethers.parseEther("10000");

  //   if (borrowedValueInETH == ethers.parseEther("0"))
  //     return ethers.parseEther("100");

  //   return (
  //     (collateralAjustedForThershold * ethers.parseEther("1")) /
  //     borrowedValueInETH
  //   );
  // };

  return (
    <GridTemplate title="Your Borrowings" isNothing={tokenData ? true : false}>
      {/* Table */}
      {loading ? (
        <CircularProgress />
      ) : (
        <YourBorrowingsDataTable columns={columns} data={tokenData} />
      )}
    </GridTemplate>
  );
};

export default YourBorrowings;
