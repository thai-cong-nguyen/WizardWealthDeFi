"use client";
import React, { useState } from 'react'
import { Badge } from "@/components/ui/badge";
import { ArrowBigLeft, AlertCircle } from "lucide-react";
import VoteDialog from "@/components/governance/voteDialog";
import { notFound, useParams, useRouter } from "next/navigation";
import { toast } from 'sonner';
import { ethers } from 'ethers';
import { useAccount, useBlock, useBlockNumber, useChainId, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { getGovernorAbi, getWizardWealthAbi } from "@/contracts/utils/getAbis";
import { getGovernorAddress, getWizardWealthAddress } from "@/contracts/utils/getAddress";
import { convertTimeStampToDate, renderProposalStatus } from '../governance/itemProposal';
import DelegateButton from '../governance/Button/delegateButton';
import ExecutingButton from '../governance/Button/executingButton';
import QueuingButton from '../governance/Button/queuingButton';
import VotesAndQuorum from '../governance/votesAndQuorum';
import CancelButton from '../governance/Button/cancelButton';


interface ProposalDetailProps {
    proposalDetail: any;
    proposalStatus?: any;
    voteCast: any[];
}

const ProposalDetail = ({ proposalDetail, proposalStatus, voteCast }: ProposalDetailProps) => {
    const router = useRouter();
    const chain = useChainId();
    const account = useAccount();
    const { data: blockNumber } = useBlockNumber();
    const propsalId = useParams().proposalId;
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
        data: getVotesData,
        isPending: getVotesIsPending,
    } = useReadContract({
        ...governorContract,
        functionName: "getVotes",
        args: [account.address, Number(blockNumber) - 1]
    });

    const {
        data: balanceData,
        isPending: balanceIsPending,
    } = useReadContract(
        {
            ...wizardWealthContract,
            functionName: "balanceOf",
            args: [account.address]
        }
    );

    const handleCopyText = (textToCopy: any) => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
            })
            .catch((error) => {
                console.error('Error copying text: ', error);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center gap-10 px-28 m-10">
            <div className="w-full flex flex-row justify-between gap-5">
                <div
                    className="flex flex-row gap-2 cursor-pointer items-center text-xl hover:scale-90 transition delay-150 duration-400"
                    onClick={() => router.back()}
                >
                    <ArrowBigLeft />
                    <span>Governance</span>
                </div>
                <div className='flex flex-col justify-center gap-4'>
                    <div className="flex flex-row items-center gap-2">
                        <DelegateButton />
                        <VoteDialog proposalId={propsalId} disabledButton={proposalStatus != 1} proposalStatus={proposalStatus} />
                        {proposalDetail.proposer.toString().toLowerCase() == account.address?.toString().toLowerCase() ? <CancelButton proposalId={propsalId} proposalDetail={proposalDetail} /> : <></>}
                        {proposalStatus == 4 ? <QueuingButton proposalId={propsalId} proposalDetail={proposalDetail} /> : proposalStatus == 5 ? <ExecutingButton proposalId={propsalId} proposalDetail={proposalDetail} /> : <></>}
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <span>Voting power:</span>
                        <span>{getVotesIsPending ? ethers.formatEther(BigInt(0)) : ethers.formatEther((getVotesData as bigint) || BigInt(0))}</span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <span>Balance: </span>
                        <span>{balanceIsPending ? ethers.formatEther(BigInt(0)) : ethers.formatEther((balanceData as bigint) || BigInt(0))}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full min-h-10 justify-normal items-start border-2 p-10 rounded-xl">
                <div className="flex flex-row gap-4 items-center">
                    <div className="flex flex-row gap-2">
                        <Badge variant="default">
                            {renderProposalStatus(Number(proposalStatus))}
                        </Badge>
                    </div>
                    <div className="text-xs flex flex-row items-center gap-1">
                        <span>Submitted</span>
                        <span>{convertTimeStampToDate(proposalDetail.blockTimestamp)}</span>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <span className="text-2xl font-bold text-secondary-foreground">Proposal</span>
                    <div className="flex flex-row items-center gap-1">
                        <span>Submitted by</span>
                        <span className='text-ellipsis font-medium overflow-hidden w-[200px] hover:scale-90 cursor-pointer hover:opacity-70 transition-all' onClick={() => {
                            handleCopyText(proposalDetail.proposer);
                            toast("Copied to clipboard", {
                                description: "Copied the proposer to clipboard",
                            });
                        }}>{proposalDetail.proposer}</span>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-1 text-xl text-secondary-foreground w-full">
                    <span className="text-xl font-bold">Id:</span>
                    <span className='text-ellipsis font-medium overflow-hidden w-[200px] hover:scale-90 cursor-pointer hover:opacity-70 transition-all' onClick={() => {
                        handleCopyText(proposalDetail.proposalId);
                        toast("Copied to clipboard", {
                            description: "Copied the proposalId to clipboard",
                        });
                    }}>{proposalDetail.proposalId}</span>
                </div>
                <div className="flex flex-row items-center gap-1 text-xl text-secondary-foreground w-full">
                    <span className="text-xl font-bold">Targets:</span>
                    <span className='text-ellipsis font-medium overflow-hidden w-[200px] hover:scale-90 cursor-pointer hover:opacity-70 transition-all' onClick={() => {
                        handleCopyText(proposalDetail.targets);
                        toast("Copied to clipboard", {
                            description: "Copied the proposalId to clipboard",
                        });
                    }}>{proposalDetail.targets}</span>
                </div>
                <div className="w-full flex flex-col justify-center">
                    <VotesAndQuorum proposal={proposalDetail} />
                </div>
                <div className="flex flex-row items-center gap-2">
                    <span className="text-xl font-bold">Description:</span>
                    <span className="text-lg font-medium">{`${proposalDetail.description}`}</span>
                </div>
            </div>
        </div>
    );
}

export default ProposalDetail