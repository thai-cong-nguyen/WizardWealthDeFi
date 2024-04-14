import React, { useState } from "react";
import Image from "next/image";
//Components
import { Button } from "../ui/button";

import {
  ConnectButton,
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TokenModel } from "@/models/Token.Models";
import { set, z } from "zod";
import { useContractWrite } from "wagmi";

interface ExecutingButtonProps {
  className: string;
  isSwap: boolean;
  onClickHandler: any;
  amountInToken?: number;
  amountOutToken?: number;
  isAutoSlippage?: boolean;
  slippage?: number;
  inToken?: TokenModel;
  outToken?: TokenModel;
  sendToken?: TokenModel;
  sendAmount?: number;
  address?: string;
}

const ExecutingButton: React.FC<ExecutingButtonProps> = ({
  className,
  isSwap,
  onClickHandler,
  amountInToken,
  amountOutToken,
  isAutoSlippage,
  slippage,
  inToken,
  outToken,
  sendToken,
  sendAmount,
  address,
}) => {
  // const {data: hash, writeContract} = useContractWrite
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleReviewClick = (openDialog: boolean) => {
    setIsOpenDialog(openDialog);
  };

  return (
    <div>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Button
                      onClick={openConnectModal}
                      type="button"
                      className={`flex flex-row items-center justify-center gap-2 text-sm w-full ${className} w-full mt-2`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                      </svg>
                      Connect Wallet
                    </Button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <Button
                      onClick={openChainModal}
                      type="button"
                      className={`${className} w-full mt-2`}
                    >
                      Wrong network
                    </Button>
                  );
                }

                if (isSwap) {
                  if (!outToken) {
                    return (
                      <Button
                        type="button"
                        disabled={true}
                        className={` ${className} w-full mt-2`}
                      >
                        Select Token
                      </Button>
                    );
                  }
                  if (!amountInToken || !amountOutToken) {
                    return (
                      <Button
                        type="button"
                        disabled={true}
                        className={` ${className} w-full mt-2`}
                      >
                        Input Amount
                      </Button>
                    );
                  }
                }

                if (!isSwap) {
                  if (!sendAmount) {
                    return (
                      <Button
                        type="button"
                        disabled={true}
                        className={` ${className} w-full mt-2`}
                      >
                        Input Amount
                      </Button>
                    );
                  }
                  if (!address) {
                    return (
                      <Button
                        type="button"
                        disabled={true}
                        className={` ${className} w-full mt-2`}
                      >
                        Input Address
                      </Button>
                    );
                  }
                }

                return (
                  <Button
                    type="submit"
                    className={` ${className} w-full mt-2`}
                    onClick={() => {
                      handleReviewClick(true);
                    }}
                  >
                    {isSwap ? "Swap Token" : "Send Token"}
                  </Button>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogTrigger asChild>{/* <Button>Open</Button> */}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Review {isSwap ? "Swap Token" : "Send Token"}
            </DialogTitle>
            <DialogDescription className="text-red-600">
              Important: Please check carefully all the information before
              executing the transaction. Transaction could not be revert during
              pending !!!
            </DialogDescription>
          </DialogHeader>

          {isSwap ? (
            <div className="flex flex-col gap-5 mt-3">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1 justify-center">
                  <span className="text-base font-semibold opacity-50">
                    You pay
                  </span>
                  <div className="flex flex-row gap-3 items-center text-lg">
                    <span className="font-bold">{amountInToken}</span>
                    <span>{inToken ? inToken.symbol : ""}</span>
                  </div>
                </div>
                <Image
                  width={40}
                  height={40}
                  src="/ethereum.png"
                  alt={inToken ? inToken.symbol : ""}
                />
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1 justify-center">
                  <span className="text-base font-semibold opacity-50">
                    You receive
                  </span>
                  <div className="flex flex-row gap-3 items-center text-lg ">
                    <span className="font-bold">{amountOutToken}</span>
                    <span>{outToken ? outToken.symbol : ""}</span>
                  </div>
                </div>
                <Image
                  width={40}
                  height={40}
                  src="/ethereum.png"
                  alt={outToken ? outToken.symbol : ""}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center">
                  <span>Rate</span>
                  <span>{`${1} ${inToken ? inToken.symbol : ""} = ${4000} ${
                    outToken ? outToken.symbol : ""
                  }`}</span>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <span>Price impact</span>
                  <span>{`~ ${1.001}%`}</span>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <span>Max slippage</span>
                  <span>{`${0.5} %`}</span>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <span>Fee</span>
                  <span>{`${0} $`}</span>
                </div>
              </div>
              <Button className="w-full" type="submit" onClick={async () => {}}>
                {isSwap ? "Confirm swap" : "Confirm Send"}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-5 mt-3">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1 justify-center">
                  <span className="text-base font-semibold opacity-50">
                    You're sending
                  </span>
                  <div className="flex flex-row gap-3 items-center text-lg">
                    <span className="font-bold">{sendAmount}</span>
                    <span>{sendToken ? sendToken.symbol : ""}</span>
                  </div>
                </div>
                <Image
                  width={40}
                  height={40}
                  src="/ethereum.png"
                  alt={sendToken ? sendToken.symbol : ""}
                />
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1 justify-center">
                  <span className="text-base font-semibold opacity-50">To</span>
                  <div className="flex flex-row gap-3 items-center text-lg ">
                    <span className="font-bold text-2xl">{address}</span>
                  </div>
                </div>
              </div>
              <Button
                className="w-full text-xl h-[50px]"
                type="submit"
                onClick={async () => {}}
              >
                {isSwap ? "Confirm swap" : "Confirm Send"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExecutingButton;
