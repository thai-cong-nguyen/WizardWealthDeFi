"use client";
import React from "react";
import Image from "next/image";

// Components
import Content from "@/components/borrow/Content";
import AssetsToSupply from "@/components/borrow/AssetsToSupply";
import AssetsToBorrow from "@/components/borrow/AssetsToBorrow";
import YourBorrowings from "@/components/borrow/YourBorrows";
import YourSupplies from "@/components/borrow/YourSupplies";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import ConnectWallet from "../wallet/ConnectWallet";
import { SupplyingPool } from "./Columns/YourSuppliesColumns";
import { BorrowingPool } from "./Columns/YourBorrowingsColumns";
import { AssetsToSupplyPool } from "./Columns/AssetsToSupplyColumns";
import { AssetsToBorrowPool } from "./Columns/AssetsToBorrowColumns";

interface BorrowProps {
  yourSuppliesData: SupplyingPool[];
  yourBorrowingsData: BorrowingPool[];
  assetsToSupplyData: AssetsToSupplyPool[];
  assetsToBorrowData: AssetsToBorrowPool[];
}

const Borrow = ({
  yourSuppliesData,
  yourBorrowingsData,
  assetsToSupplyData,
  assetsToBorrowData,
}: BorrowProps) => {
  const { openConnectModal } = useConnectModal();
  return (
    <div
      className={`flex flex-col justify-center m-10 p-10 bg-fuchsia-100 bg-opacity-90 rounded-xl border-2 border-black flex-wrap overflow-hidden w-[1500px] ${
        openConnectModal && "min-h-[600px]"
      }`}
    >
      {openConnectModal ? (
        <main className="flex flex-col gap-5 justify-center items-center w-full ">
          <Image
            width={100}
            height={100}
            src="/Logo.jpg"
            alt="Logo"
            className="rounded-xl"
          />
          <span className="text-xl font-bold">Please connect your wallet</span>
          <span className="font-medium text-lg opacity-70">
            Please connect your wallet to see your supplies, borrowings.
          </span>
          <ConnectWallet />
        </main>
      ) : (
        <>
          <Content />
          <div className="grid lg:grid-cols-2 md:grid-rows-1 gap-4 w-full flex-wrap">
            <div className="flex flex-col gap-4">
              <YourSupplies data={yourSuppliesData} />
              <AssetsToSupply data={assetsToSupplyData} />
            </div>
            <div className="flex flex-col gap-4">
              <YourBorrowings data={yourBorrowingsData} />
              <AssetsToBorrow data={assetsToBorrowData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Borrow;
