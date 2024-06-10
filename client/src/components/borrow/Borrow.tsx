"use client";
import React from "react";
import Image from "next/image";
import BorrowingDashboard from "./BorrowingDashboard";
import { useAccount } from "wagmi";
import ConnectWallet from "../wallet/ConnectWallet";

const Borrow = () => {
  const account = useAccount();

  return (
    <div
      className={`flex flex-col justify-center m-10 p-10 bg-fuchsia-100 bg-opacity-90 rounded-xl border-2 border-black flex-wrap overflow-hidden w-[1500px] ${!account.isConnected && "min-h-[600px]"
        }`}
    >
      {account.isConnected ? <BorrowingDashboard /> : (
        <div className="flex flex-col gap-5 justify-center items-center w-full ">
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
        </div>
      )}
    </div>
  );
};

export default Borrow;
