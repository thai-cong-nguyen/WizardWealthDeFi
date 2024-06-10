import React, { useEffect, useState } from "react";

import GridTemplate from "./GridTemplate";
import { Badge } from "../ui/badge";
import { AssetsToBorrowPool, columns } from "./Columns/AssetsToBorrowColumns";
import { AssetsToBorrowDataTable } from "./Columns/AssetsToBorrowDataTable";
import { useAccount, useChainId, useReadContracts } from "wagmi";
import { getLendingAddress } from "@/contracts/utils/getAddress";
import { getIERC20Abi, getLendingAbi } from "@/contracts/utils/getAbis";
import { fetchTokensData } from "@/services/fetchTokenDetail";
import { CircularProgress } from "@mui/material";

interface AssetsToBorrowProps {
  allowedTokenData: any;
  allowedTokenIsPending: boolean;
  allowedTokenError: any;
}

const AssetsToBorrow = ({
  allowedTokenData,
  allowedTokenIsPending,
  allowedTokenError,
}: AssetsToBorrowProps) => {
  const chain = useChainId();

  const [tokenData, setTokenData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        const formattedData = result.data.map((data: any, index: any) => ({
          id: index,
          address: data.address,
          name: data.name,
          symbol: data.symbol,
          balance: 100,
          collateral: true,
        }));
        setTokenData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [allowedTokenData, allowedTokenIsPending]);

  return (
    <GridTemplate title="Assets To Borrow">
      {loading ? (
        <CircularProgress />
      ) : (
        <AssetsToBorrowDataTable columns={columns} data={tokenData} />
      )}
    </GridTemplate>
  );
};

export default AssetsToBorrow;
