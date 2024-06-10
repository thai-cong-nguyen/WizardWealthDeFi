"use client";
import React, { useState, useEffect } from "react";
import { Copy } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import ConnectWallet from "../wallet/ConnectWallet";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { getGovernorAddress, getWizardWealthAddress } from "@/contracts/utils/getAddress";
import { useAccount, useChainId, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { getGovernorAbi, getWizardWealthAbi } from "@/contracts/utils/getAbis";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import LoadingTransactionHash from "../LoadingTransactionHash";
import { zeroAddress } from "viem";

interface VoteDialogProps {
  proposalId: any;
  disabledButton: boolean;
  proposalStatus: number;
}

const VoteDialog = ({ proposalId, disabledButton, proposalStatus }: VoteDialogProps) => {
  const account = useAccount();
  const chain = useChainId();
  const [support, setSupport] = useState("1");
  const [reason, setReason] = useState("");
  const [loadingDialogIsOpen, setLoadingDialogIsOpen] = useState(false);

  const governorContract = {
    address: getGovernorAddress(chain),
    abi: getGovernorAbi()
  } as const;

  const wizardWealthContract = {
    address: getWizardWealthAddress(chain),
    abi: getWizardWealthAbi()
  } as const;

  const {
    data: hasVotedData,
    isPending: hashVotedIsPending,
  } = useReadContract({
    ...governorContract,
    functionName: "hasVoted",
    args: [proposalId, account.address],
  });

  const { data: voteHash, isPending: voteIsPending, isError: voteIsError, writeContract: voteWriteContract } = useWriteContract();

  const {
    isLoading: voteIsConfirming,
    isSuccess: voteIsConfirmed,
    isError: voteIsReverted,
  } = useWaitForTransactionReceipt({ confirmations: 4, hash: voteHash });

  const {
    data: isDelegateData,
    isPending: isDelegateIsPending,
  } = useReadContract({
    ...wizardWealthContract,
    functionName: "delegates",
    args: [account.address],
  })



  const voteSubmit = () => {
    voteWriteContract({
      ...governorContract,
      functionName: reason == "" ? "castVote" : "castVoteWithReason",
      args: reason == "" ? [proposalId, support] : [proposalId, support, reason]
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`bg-cyan-600 hover:scale-90 transition delay-150 duration-400`} disabled={disabledButton || (proposalStatus != 1) || (hasVotedData as boolean) == true}>{hasVotedData ? "Voted" : proposalStatus != 1 ? "Expired" : "Vote"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Vote</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center gap-2">
          <div className="flex flex-row items-center gap-5 text-base">
            <span className="text-lg">Support:</span>
            <RadioGroup defaultValue={support} orientation="horizontal" onValueChange={setSupport}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="against" />
                <Label htmlFor="against">Against</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="for" />
                <Label htmlFor="for">For</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="abstain" />
                <Label htmlFor="abstain">Abstain</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-row items-center gap-2">
            <span className="text-lg">Reason:</span>
            <Input
              placeholder="Enter reason here"
              className="w-full"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
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
                              voteIsPending
                            }
                            type="submit"
                            className={`text-xl w-full mt-2 bg-cyan-600 hover:scale-90 transition delay-150 duration-400`}
                            onClick={() => {
                              setLoadingDialogIsOpen(true);
                              voteSubmit();
                            }}
                          >
                            {voteIsPending
                              ? "Confirming..."
                              : `Vote`}
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
                (voteIsPending || voteIsError || voteIsConfirming || voteIsConfirmed || voteIsReverted) && <LoadingTransactionHash type="Voting a proposal." isConfirmed={voteIsConfirmed} isReverted={voteIsReverted} isError={voteIsError} hash={voteHash} className="flex flex-col gap-1 justify-center items-center" />
              }
            </DialogContent>
          </Dialog>
        </div>
      </DialogContent>
    </Dialog >
  );
};

export default VoteDialog;
