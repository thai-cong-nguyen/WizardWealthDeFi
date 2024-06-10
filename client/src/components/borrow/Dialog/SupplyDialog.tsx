"use client";
import React, { useState, useEffect, useRef } from "react";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ConnectWallet from "@/components/wallet/ConnectWallet";
import { ConnectButton, useChainModal } from "@rainbow-me/rainbowkit";
import { SupplyingPool } from "../Columns/YourSuppliesColumns";
import { Button } from "@/components/ui/button";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { AlertCircle, FuelIcon } from "lucide-react";
import { AssetsToSupplyPool } from "../Columns/AssetsToSupplyColumns";
import { useChainId, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { getIERC20Abi, getLendingAbi } from "@/contracts/utils/getAbis";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import { ethers } from "ethers";
import { getLendingAddress, getStakingAddress } from "@/contracts/utils/getAddress";
import LoadingTransactionHash from "@/components/LoadingTransactionHash";

interface SupplyDialogProps {
  trigger?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  pool: SupplyingPool | AssetsToSupplyPool;
}

const SupplyDialog = ({
  trigger,
  pool,
  isOpen,
  setIsOpen,
}: SupplyDialogProps) => {
  const chain = useChainId();

  const [amount, setAmount] = useState<number>(0);
  // const [valueAmount, setValueAmount] = useState<number>(0);
  const [loadingDialogIsOpen, setLoadingDialogIsOpen] = useState<boolean>(false);

  const [isApproval, setIsApproval] = useState(false);
  const RATIO_EXCHANGE = 4;

  const { data: approvalHash, isPending: approvalIsPending, isError: approvalIsError, writeContract: approvalWriteContract } = useWriteContract();

  const {
    isLoading: approvalIsConfirming,
    isSuccess: approvalIsConfirmed,
    isError: approvalIsReverted,
  } = useWaitForTransactionReceipt({ confirmations: 2, hash: approvalHash });

  const { data: hash, isPending, isError, writeContract } = useWriteContract();


  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isReverted,
  } = useWaitForTransactionReceipt({ confirmations: 2, hash });

  const supplySubmit = () => {
    writeContract({
      abi: getLendingAbi(),
      address: getLendingAddress(chain),
      functionName: "deposit",
      args: [pool.address, ethers.parseEther((amount || 0).toString())],
    });
  };


  const approvalSubmit = () => {
    approvalWriteContract({
      abi: getIERC20Abi(),
      address: pool.address,
      functionName: "approve",
      args: [getLendingAddress(chain), ethers.MaxUint256],
    });
  }

  // useEffect(() => {
  //   if (!amount) {
  //     setValueAmount(0);
  //     return;
  //   }
  //   setValueAmount(amount * RATIO_EXCHANGE);
  // }, [amount]);

  useEffect(() => {
    setIsApproval(approvalIsConfirmed ? true : false);
  }, [approvalHash, approvalIsConfirmed]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) => {
        setIsOpen(open);
        setAmount(0);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Supply {pool.symbol}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center gap-5">
          <div className="flex flex-col gap-2 justify-center w-full">
            <div className="flex flex-row gap-2 items-center w-full ">
              <span>Amount</span>
              <InfoCircledIcon className="h-4 w-4" />
            </div>
            <div className="flex flex-col w-full border-2 border-neutral-400 rounded-xl px-4 py-2 gap-2">
              <div className="flex flex-row items-center justify-between gap-2">
                <Input
                  className="bg-transparent outline-none border-none text-2xl	font-bold focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                  placeholder="0"
                  inputMode="decimal"
                  type="number"
                  value={amount || undefined}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setAmount(parseFloat(event.currentTarget.value ? event.currentTarget.value : "0"));
                  }}
                />
                <Image
                  width={40}
                  height={40}
                  src="/ethereum.png"
                  alt={pool.name}
                />
                <span className="font-bold">{pool.symbol}</span>
              </div>
              <div className="flex flex-row items-center justify-between text-sm">
                {/* <span className="opacity-70 font-medium">$ {valueAmount}</span> */}
                <div className="flex flex-row items-center gap-3">
                  <span className="font-normal">
                    Wallet Balance: {(pool as AssetsToSupplyPool).walletBalance}
                  </span>
                  <span className="cursor-pointer font-bold" onClick={() => {
                    setAmount(pool.walletBalance)
                  }}>Max</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-center w-full">
            <span className="opacity-70">Transaction overview</span>
            <div className="flex flex-col px-4 py-2 gap-2 justify-center w-full border-2 border-neutral-400 rounded-xl">
              <div className="flex flex-row justify-between items-center">
                <span>Supply APY</span>
                <span>{0}%</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-3 items-center w-full">
            <FuelIcon className="w-4 h-4" />
            <span className="opacity-70 font-bold">$ {0.11}</span>
            <AlertCircle className="w-4 h-4" />
          </div>

          <Dialog
            open={loadingDialogIsOpen} onOpenChange={setLoadingDialogIsOpen}
          >
            <DialogTrigger asChild>
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
                    (!authenticationStatus ||
                      authenticationStatus === "authenticated");

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
                              className={`flex flex-row items-center justify-center gap-2 text-sm w-full mt-2`}
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
                              className={`w-full mt-2`}
                            >
                              Wrong network
                            </Button>
                          );
                        }

                        return (
                          <Button
                            disabled={
                              isPending || approvalIsPending ||
                              amount <= 0 || amount > (pool as AssetsToSupplyPool).walletBalance
                              // || !approvalIsConfirmed
                            }
                            // variant="outline"
                            type="submit"
                            className={`text-xl w-full mt-2 bg-cyan-600 hover:scale-90 transition delay-150 duration-400`}
                            onClick={() => {
                              setLoadingDialogIsOpen(true);
                              if (isApproval) {
                                supplySubmit();
                              } else {
                                approvalSubmit();
                              }
                            }}
                          >
                            {!isApproval
                              ? "Approve"
                              : approvalIsPending
                                ? "Approving..."
                                : isPending
                                  ? "Confirming..."
                                  : `Supply ${pool.symbol}`}
                          </Button>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Transaction Detail: </DialogHeader>
              {
                isApproval && (isPending || isError || isConfirming || isConfirmed || isReverted) ? <LoadingTransactionHash type="Supply" isConfirmed={isConfirmed} isReverted={isReverted} isError={isError} hash={hash} className="flex flex-col gap-1 justify-center items-center" /> : < LoadingTransactionHash type="Approve" isConfirmed={approvalIsConfirmed}
                  isReverted={approvalIsReverted}
                  isError={approvalIsError}
                  hash={approvalHash} className="flex flex-col gap-1 justify-center items-center" />
              }
            </DialogContent>
          </Dialog>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupplyDialog;
