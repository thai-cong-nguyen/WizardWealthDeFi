import React, { useState } from 'react'

// Components
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import LoadingTransactionHash from '@/components/LoadingTransactionHash';
import { getGovernorAbi, getWizardWealthAbi } from "@/contracts/utils/getAbis";
import { getGovernorAddress, getWizardWealthAddress } from "@/contracts/utils/getAddress";
import { ethers } from 'ethers';

interface ExecutingButtonProps {
    proposalDetail: any;
    proposalId: any;
}


const ExecutingButton = ({ proposalDetail, proposalId }: ExecutingButtonProps) => {
    const account = useAccount();
    const chain = useChainId();
    const [loadingDialogIsOpen, setLoadingDialogIsOpen] = useState(false);

    const governorContract = {
        address: getGovernorAddress(chain),
        abi: getGovernorAbi()
    } as const;

    const {
        data: proposalData,
        isPending: proposalIsPending,
    } = useReadContract({
        ...governorContract,
        functionName: "proposalDetails",
        args: [proposalId]
    });

    const {
        data: executingHash,
        isPending: executingIsPending,
        isError: executingIsError,
        error: executingError,
        writeContract: executingWriteContract,
    } = useWriteContract();

    const {
        isLoading: executingIsConfirming,
        isSuccess: executingIsConfirmed,
        isError: executingIsReverted,
    } = useWaitForTransactionReceipt({ confirmations: 2, hash: executingHash });

    const executingSubmit = () => {
        executingWriteContract({
            ...governorContract,
            functionName: "execute",
            args: [(proposalData as any[])[0], (proposalData as any[])[1], (proposalData as any[])[2], (proposalData as any[])[3]],
            // args: [proposalId],
            // value: ethers.parseEther("0"),
        });
    }

    console.log(executingError);


    return (
        <div className="">
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
                                                    className={`hover:scale-90 transition delay-150 duration-400 flex flex-row items-center gap-2`}
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
                                                    className={`bg-cyan-600 hover:scale-90 transition delay-150 duration-400`}
                                                >
                                                    Wrong network
                                                </Button>
                                            );
                                        }

                                        return (
                                            <Button
                                                disabled={
                                                    executingIsPending
                                                }
                                                type="submit"
                                                className={`bg-cyan-600 hover:scale-90 transition delay-150 duration-400`}
                                                onClick={() => {
                                                    setLoadingDialogIsOpen(true);
                                                    executingSubmit();
                                                }}
                                            >
                                                {executingIsPending
                                                    ? "Confirming..."
                                                    : `Execute`}
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
                        (executingIsPending || executingIsError || executingIsConfirming || executingIsConfirmed || executingIsReverted) && <LoadingTransactionHash type="Executing this proposal" isConfirmed={executingIsConfirming} isReverted={executingIsReverted} isError={executingIsError} hash={executingHash} className="flex flex-col gap-1 justify-center items-center" />
                    }
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ExecutingButton