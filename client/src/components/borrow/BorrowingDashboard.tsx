"use client";

import React from "react";

// Components
import Content from "@/components/borrow/Content";
import AssetsToSupply from "@/components/borrow/AssetsToSupply";
import AssetsToBorrow from "@/components/borrow/AssetsToBorrow";
import YourBorrowings from "@/components/borrow/YourBorrows";
import YourSupplies from "@/components/borrow/YourSupplies";

import {
    useReadContract,
    useAccount, useChainId
} from "wagmi";
import { getLendingAddress } from "@/contracts/utils/getAddress";
import { getLendingAbi } from "@/contracts/utils/getAbis";

import { fetchTokensData } from "@/services/fetchTokenDetail";

const BorrowingDashboard = () => {

    const chain = useChainId();
    const account = useAccount();

    const lendingContract = {
        address: getLendingAddress(chain),
        abi: getLendingAbi(),
    } as const;

    const {
        data: allowedTokenData,
        isPending: allowedTokenIsPending,
        error: allowedTokenError,
    } = useReadContract({
        ...lendingContract,
        functionName: "getAllowedToken",
    });

    const {
        data: suppliedTokensData,
        isPending: suppliedTokensIsPending,
        error: suppliedTokensError,
    } = useReadContract({
        ...lendingContract,
        functionName: "getAccountToTokenDeposits",
        args: [account.address],
    });

    const {
        data: borrowedTokensData,
        isPending: borrowedTokensIsPending,
        error: borrowedTokensError,
    } = useReadContract({
        ...lendingContract,
        functionName: "getAccountToTokenBorrows",
        args: [account.address],
    });

    return (
        (
            <>
                <Content />
                <div className="grid lg:grid-cols-2 md:grid-rows-1 gap-4 w-full flex-wrap">
                    <div className="flex flex-col gap-4">
                        <YourSupplies
                            suppliedTokensData={suppliedTokensData}
                            suppliedTokensIsPending={suppliedTokensIsPending}
                            suppliedTokensError={suppliedTokensError}
                        />
                        <AssetsToSupply
                            allowedTokenData={allowedTokenData}
                            allowedTokenIsPending={allowedTokenIsPending}
                            allowedTokenError={allowedTokenError}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <YourBorrowings
                            borrowedTokensData={borrowedTokensData}
                            borrowedTokensIsPending={borrowedTokensIsPending}
                            borrowedTokensError={borrowedTokensError}
                        />
                        <AssetsToBorrow
                            allowedTokenData={allowedTokenData}
                            allowedTokenIsPending={allowedTokenIsPending}
                            allowedTokenError={allowedTokenError}
                        />
                    </div>
                </div>
            </>
        )
    )
}

export default BorrowingDashboard