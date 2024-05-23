"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
//Components
import { Button } from "../ui/button";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TokenModel } from "@/models/Token.Models";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
  type BaseError,
  useAccount,
  useSendTransaction,
} from "wagmi";
import { getSwapAbi, getWETHAbi } from "@/contracts/utils/getAbis";
import { useToast } from "../ui/use-toast";
import { getSwapAddress, getWETHAddress } from "@/contracts/utils/getAddress";
import { ethers } from "ethers";
import Link from "next/link";

interface ExecutingButtonProps {
  className: string;
  isSwap: boolean;
  onClickHandler: any;
  amountInToken?: number;
  amountOutToken?: any;
  isAutoSlippage?: boolean;
  slippage: number;
  inToken?: TokenModel;
  outToken?: TokenModel;
  sendToken?: TokenModel;
  sendAmount?: number;
  address?: `0x${string}`;
  swapError?: BaseError | null;
  isSwapPending: boolean;
  deadline: number;
}

const ExecutingButton: React.FC<ExecutingButtonProps> = ({
  className,
  isSwap, // Swap or Send Tabs
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
  swapError,
  isSwapPending,
  deadline,
}) => {
  const chainId = useChainId();
  const account = useAccount();
  // Swap
  const {
    data: hash,
    error: executingError,
    isPending: isPendingTransaction,
    writeContract,
  } = useWriteContract();

  // Send
  const {
    data: hashSendTransaction,
    error: sendTransactionError,
    isPending: isPendingSendTransaction,
    sendTransaction,
  } = useSendTransaction();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isReverted,
  } = useWaitForTransactionReceipt({
    hash: isSwap ? hash : hashSendTransaction,
  });

  const { toast } = useToast();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenLoadingDialog, setIsOpenLoadingDialog] = useState(false);
  const percentage = BigInt(100 - slippage);
  const amountOutMin = (BigInt(amountOutToken || 0) * percentage) / BigInt(100);

  const handleReviewClick = (openDialog: boolean) => {
    setIsOpenDialog(openDialog);
  };

  useEffect(() => {
    setIsOpenLoadingDialog(isConfirming || isConfirmed || isReverted);
    if (isConfirming) {
      setIsOpenDialog(false);
    }
  }, [isConfirming, isConfirmed, isReverted]);

  const submitTransaction = async () => {
    let functionName = "",
      address,
      abi: any[] = [],
      args: any[] = [],
      value;
    if (isSwap) {
      functionName =
        inToken?.native == true && outToken?.address == getWETHAddress(chainId)
          ? "deposit"
          : outToken?.native == true &&
            inToken?.address == getWETHAddress(chainId)
          ? "withdraw"
          : inToken?.native
          ? "swapExactETHForTokens"
          : outToken?.native
          ? "swapExactTokensForETH"
          : "swapExactTokensForTokens";
      abi =
        inToken?.native == true && outToken?.address == getWETHAddress(chainId)
          ? getWETHAbi()
          : outToken?.native == true &&
            inToken?.address == getWETHAddress(chainId)
          ? getWETHAbi()
          : getSwapAbi();
      address =
        inToken?.native == true && outToken?.address == getWETHAddress(chainId)
          ? getWETHAddress(chainId)
          : outToken?.native == true &&
            inToken?.address == getWETHAddress(chainId)
          ? getWETHAddress(chainId)
          : getSwapAddress(chainId);
      args =
        inToken?.native == true && outToken?.address == getWETHAddress(chainId)
          ? []
          : outToken?.native == true &&
            inToken?.address == getWETHAddress(chainId)
          ? [ethers.parseEther(amountInToken ? amountInToken.toString() : "0")]
          : inToken?.native
          ? [
              outToken?.address,
              amountOutMin,
              account.address,
              Date.now() + deadline * 60 * 1000,
            ]
          : outToken?.native
          ? [
              inToken?.address,
              ethers.parseEther(amountInToken ? amountInToken.toString() : "0"),
              amountOutMin,
              account.address,
              Date.now() + deadline * 60 * 1000,
            ]
          : [
              inToken?.address,
              outToken?.address,
              ethers.parseEther(amountInToken ? amountInToken.toString() : "0"),
              amountOutMin,
              account.address,
              Date.now() + deadline * 60 * 1000,
            ];
      value =
        (inToken?.native == true &&
          outToken?.address == getWETHAddress(chainId)) ||
        inToken?.native
          ? ethers.parseEther(amountInToken ? amountInToken.toString() : "0")
          : ethers.parseEther("0");
    }
    console.log({
      address,
      abi,
      args,
      functionName,
      value,
    });
    writeContract({
      address,
      abi,
      args,
      functionName,
      value,
    });
  };
  console.log(executingError);

  const sendTransactionSubmit = async () => {
    if (sendToken?.native && address) {
      sendTransaction({
        to: address,
        value: ethers.parseEther(sendAmount ? sendAmount.toString() : "0"),
      });
    } else {
      console.log("Continue...");
    }
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
                  if (!outToken || !inToken) {
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
                  if (!amountInToken) {
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
                  if (swapError) {
                    return (
                      <Button
                        type="button"
                        disabled={true}
                        className={` ${className} w-full mt-2`}
                      >
                        {swapError && swapError.shortMessage.split(": ")[1]}
                      </Button>
                    );
                  }
                  if (isSwapPending) {
                    return (
                      <Button
                        type="button"
                        disabled={true}
                        className={` ${className} w-full mt-2`}
                      >
                        Pending...
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
                  alt={inToken?.symbol ? inToken.symbol : ""}
                />
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1 justify-center">
                  <span className="text-base font-semibold opacity-50">
                    You receive
                  </span>
                  <div className="flex flex-row gap-3 items-center text-lg ">
                    <span className="font-bold">
                      {((amountOutToken
                        ? parseFloat(
                            ethers.formatEther(amountOutToken.toString())
                          )
                        : 0) *
                        (100 - slippage)) /
                        100}
                    </span>
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
                  <span>{`${slippage} %`}</span>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <span>Fee</span>
                  <span>{`${0} $`}</span>
                </div>
              </div>
              <Button
                className="w-full"
                type="submit"
                onClick={submitTransaction}
                disabled={isPendingTransaction}
              >
                {isPendingTransaction
                  ? "Transaction Pending..."
                  : "Confirm swap"}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-5 mt-3">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1 justify-center w-full">
                  <span className="text-base font-semibold opacity-50">
                    {`You're sending`}
                  </span>
                  <div className="flex flex-row gap-3 items-center justify-between w-full text-lg">
                    <span className="font-bold">{sendAmount}</span>
                    <div className="flex flex-row items-center gap-1">
                      <Image
                        width={40}
                        height={40}
                        src="/ethereum.png"
                        alt={sendToken ? sendToken.symbol : ""}
                      />
                      <span>{sendToken ? sendToken.symbol : ""}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1 justify-center">
                  <span className="text-base font-semibold opacity-50">To</span>
                  <div className="flex flex-row gap-3 items-center text-lg ">
                    <span className="font-bold">{address}</span>
                  </div>
                </div>
              </div>
              <Button
                className="w-full text-xl h-[50px]"
                onClick={sendTransactionSubmit}
                disabled={isPendingSendTransaction}
                type="submit"
              >
                {isPendingSendTransaction
                  ? "Transaction Pending..."
                  : "Confirm send"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={isOpenLoadingDialog} onOpenChange={setIsOpenLoadingDialog}>
        <DialogContent>
          {isConfirming ? (
            <div className="flex flex-col gap-5 mt-3 justify-center items-center gap-2">
              <span>Waiting for confirmation...</span>
            </div>
          ) : isConfirmed ? (
            <div className="flex flex-col gap-5 mt-3 justify-center items-center gap-2">
              <Button className="w-full" type="submit">
                <Link
                  href={`https://sepolia.etherscan.io/tx/${
                    isSwap ? hash : hashSendTransaction
                  }`}
                  target="_blank"
                >
                  Transaction
                </Link>
              </Button>
              {isConfirmed && <span>Transaction confirmed.</span>}
            </div>
          ) : isReverted ? (
            <div className="flex flex-col gap-5 mt-3 justify-center items-center gap-2">
              <Button className="w-full" type="submit">
                <Link
                  href={`https://sepolia.etherscan.io/tx/${hash}`}
                  target="_blank"
                >
                  Transaction
                </Link>
              </Button>
              {error && (
                <div>
                  Error: {(error as BaseError).shortMessage || error.message}
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExecutingButton;
