import React, { useEffect, useRef, useState } from 'react'
import { BorrowingPool } from '../Columns/YourBorrowingsColumns';
import { AssetsToBorrowPool } from '../Columns/AssetsToBorrowColumns';
import { useChainId, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { getLendingAbi } from '@/contracts/utils/getAbis';
import { getLendingAddress } from '@/contracts/utils/getAddress';
import { ethers } from 'ethers';
import Image from "next/image";
import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { AlertCircle, FuelIcon } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import LoadingTransactionHash from '@/components/LoadingTransactionHash';
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

interface BorrowDialogProps {
    trigger?: React.ReactNode;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    pool: BorrowingPool | AssetsToBorrowPool;
}

const BorrowDialog = ({
    trigger,
    pool,
    isOpen,
    setIsOpen,
}: BorrowDialogProps) => {
    const chain = useChainId();

    const [amount, setAmount] = useState<number>(0);
    const [loadingDialogIsOpen, setLoadingDialogIsOpen] = useState<boolean>(false);

    const { data: hash, isPending, isError, writeContract } = useWriteContract();

    // console.log(amount.current);

    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed,
        isError: isReverted,
    } = useWaitForTransactionReceipt({ confirmations: 2, hash });

    const withdrawSubmit = () => {
        writeContract({
            abi: getLendingAbi(),
            address: getLendingAddress(chain),
            functionName: "borrow",
            args: [pool.address, ethers.parseEther(amount.toString())],
        });
    };


    // useEffect(() => {
    //     if (!amount) {
    //         setValueAmount(0);
    //         return;
    //     }
    //     setValueAmount(amount * RATIO_EXCHANGE);

    //     console.log(ethers.parseEther(amount.toString()));
    // }, [amount]);

    const [healthFactor, setHealthFactor] = useState<number>(100);


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        Borrow {pool.symbol}
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
                                    value={amount > 0 ? amount : undefined}
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
                            {/* <div className="flex flex-row items-center justify-between text-sm">
                                <span className="opacity-70 font-medium">$ {valueAmount}</span>
                                <div className="flex flex-row items-center gap-3">
                                    <span className="font-normal">
                                        Wallet Balance: {pool.balance}
                                    </span>
                                    <span className="cursor-pointer font-bold">Max</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-center w-full">
                        <span className="opacity-70">Transaction overview</span>
                        <div className="flex flex-col px-4 py-2 gap-4 justify-center w-full border-2 border-neutral-400 rounded-xl">
                            <div className="flex flex-row justify-between items-start">
                                <span>Health factor</span>
                                <div className="flex flex-col gap-1 justify-center items-end">
                                    <span
                                        className={
                                            healthFactor > 5 ? `text-lime-600` : `text-red-600`
                                        }
                                    >
                                        {healthFactor}
                                    </span>
                                    <span className="text-sm opacity-60">{`Liquidation at < 1.0`}</span>
                                </div>
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
                                                            isPending ||
                                                            amount <= 0
                                                        }
                                                        type="submit"
                                                        className={`text-xl w-full mt-2 bg-cyan-600 hover:scale-90 transition delay-150 duration-400`}
                                                        onClick={() => {
                                                            setLoadingDialogIsOpen(true);
                                                            withdrawSubmit();
                                                        }}
                                                    >
                                                        {isPending
                                                            ? "Confirming..."
                                                            : `Borrow ${pool.symbol}`}
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
                                (isPending || isError || isConfirming || isConfirmed || isReverted) && <LoadingTransactionHash type="Borrow" isConfirmed={isConfirmed} isReverted={isReverted} isError={isError} hash={hash} className="flex flex-col gap-1 justify-center items-center" />
                            }
                        </DialogContent>
                    </Dialog>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BorrowDialog