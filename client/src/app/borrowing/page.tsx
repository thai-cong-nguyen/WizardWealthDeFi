import React from "react";

// Components
import Borrow from "@/components/borrow/Borrow";
import { SupplyingPool } from "@/components/borrow/Columns/YourSuppliesColumns";
import { BorrowingPool } from "@/components/borrow/Columns/YourBorrowingsColumns";
import { AssetsToSupplyPool } from "@/components/borrow/Columns/AssetsToSupplyColumns";
import { AssetsToBorrowPool } from "@/components/borrow/Columns/AssetsToBorrowColumns";

async function getYourSuppliesData(): Promise<SupplyingPool[]> {
  // Fetch data from API here
  return [
    {
      id: "1",
      address: "0x112121212121",
      name: "USDC",
      symbol: "USDC",
      balance: 100,
      collateral: true,
    },
    {
      id: "2",
      address: "0x112121212121",
      name: "Ethereum",
      symbol: "ETH",
      balance: 100,
      collateral: true,
    },
    {
      id: "3",
      address: "0x112121212121",
      name: "USDC",
      symbol: "USDC",
      balance: 100,
      collateral: true,
    },
    {
      id: "4",
      address: "0x112121212121",
      name: "USDC",
      symbol: "USDC",
      balance: 100,
      collateral: true,
    },
  ];
}

async function getYourBorrowingsData(): Promise<BorrowingPool[]> {
  // Fetch data from API here
  return [
    {
      id: "1",
      address: "0x112121212121",
      name: "USDC",
      symbol: "USDC",
      debt: 100,
    },
    {
      id: "2",
      address: "0x112121212121",
      name: "Ethereum",
      symbol: "ETH",
      debt: 100,
    },
    {
      id: "3",
      address: "0x112121212121",
      name: "USDC",
      symbol: "USDC",
      debt: 100,
    },
    {
      id: "4",
      address: "0x112121212121",
      name: "USDC",
      symbol: "USDC",
      debt: 100,
    },
  ];
}

async function getAssetsToSupplyData(): Promise<AssetsToSupplyPool[]> {
  // Fetch data from API here
  return [
    {
      id: "1",
      address: "0x112121212121",
      name: "USDC",
      symbol: "USDC",
      walletBalance: 100,
      collateral: true,
    },
    {
      id: "2",
      address: "0x112121212121",
      name: "Ethereum",
      symbol: "ETH",
      walletBalance: 100,
      collateral: true,
    },
    {
      id: "3",
      address: "0x112121212121",
      name: "USDC",
      symbol: "USDC",
      walletBalance: 100,
      collateral: true,
    },
    {
      id: "4",
      address: "0x112121212121",
      name: "USDC",
      symbol: "USDC",
      walletBalance: 100,
      collateral: true,
    },
  ];
}

async function getAssetsToBorrowData(): Promise<AssetsToBorrowPool[]> {
  // Fetch data from API here
  return [
    {
      id: "1",
      address: "0x112121212121",
      name: "USDC",
      symbol: "USDC",
      available: 100,
    },
    {
      id: "2",
      address: "0x112121212121",
      name: "Ethereum",
      symbol: "ETH",
      available: 100,
    },
    {
      id: "3",
      address: "0x112121212121",
      name: "USDC",
      symbol: "USDC",
      available: 100,
    },
    {
      id: "4",
      address: "0x112121212121",
      name: "USDC",
      symbol: "USDC",
      available: 100,
    },
  ];
}

const Borrowing = async () => {
  const yourSuppliesData = await getYourSuppliesData();
  const yourBorrowingsData = await getYourBorrowingsData();
  const assetsToSupplyData = await getAssetsToSupplyData();
  const assetsToBorrowData = await getAssetsToBorrowData();

  return (
    <main className="bg-borrowing bg-no-repeat bg-center bg-cover bg-fixed h-auto relative">
      <div className="absolute inset-0 bg-white bg-opacity-20 w-full" />
      <div className="flex justify-center items-center p-10 relative h-full">
        <Borrow
          yourSuppliesData={yourSuppliesData}
          yourBorrowingsData={yourBorrowingsData}
          assetsToSupplyData={assetsToSupplyData}
          assetsToBorrowData={assetsToBorrowData}
        />
      </div>
      <div className="h-[40px] relative"></div>
    </main>
  );
};

export default Borrowing;
