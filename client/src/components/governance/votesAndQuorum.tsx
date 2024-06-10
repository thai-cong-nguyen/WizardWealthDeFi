"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// Components
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Separator } from "../ui/separator";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Progress } from "../ui/progress";
import { useBlock, useChainId, useReadContract, useReadContracts, useWatchContractEvent } from "wagmi";
import { getGovernorAddress, getWizardWealthAddress } from "@/contracts/utils/getAddress";
import { getGovernorAbi, getWizardWealthAbi } from "@/contracts/utils/getAbis";
import { ethers } from "ethers";

interface VotesAndQuorumProps {
    proposal: any;
}

const VotesAndQuorum = ({ proposal }: VotesAndQuorumProps) => {
    const [approvalProgress, setApprovalProgress] = useState<number>(0);
    const chain = useChainId();
    const router = useRouter();

    const governorContract = {
        address: getGovernorAddress(chain),
        abi: getGovernorAbi(),
    } as const;

    const wizardWealthContract = {
        address: getWizardWealthAddress(chain),
        abi: getWizardWealthAbi(),
    } as const;

    const {
        data: approvalQuorumData,
        error: approvalQuorumError,
        isPending: approvalQuorumIsPending,
    } = useReadContracts({
        contracts: [
            {
                ...wizardWealthContract,
                functionName: "totalSupply"
            },
            {
                ...governorContract,
                functionName: "quorumNumerator"
            },
            {
                ...governorContract,
                functionName: "quorumDenominator"
            }
        ]
    });

    const {
        data: proposalVotesData,
        isPending: proposalVotesIsPending,
    } = useReadContract({
        ...governorContract,
        functionName: "proposalVotes",
        args: [proposal.proposalId],
    });


    const approvalQuorum = () => {
        const totalSupply = ethers.FixedNumber.fromValue(approvalQuorumIsPending ? BigInt(1) : approvalQuorumData?.[0].result as bigint, 18);

        const quorumNumerator = ethers.FixedNumber.fromValue(approvalQuorumIsPending ? BigInt(1) : approvalQuorumData?.[1].result as bigint, 18);
        const quorumDenominator = ethers.FixedNumber.fromValue(approvalQuorumIsPending ? BigInt(1) : approvalQuorumData?.[2].result as bigint, 18);

        const result = totalSupply.mul(quorumNumerator).div(quorumDenominator);

        return result;
    }

    const againstVotes = ethers.FixedNumber.fromValue(proposalVotesIsPending ? 0 : (proposalVotesData as any[])?.[0] as bigint, 18);
    const forVotes = ethers.FixedNumber.fromValue(proposalVotesIsPending ? 0 : (proposalVotesData as any[])?.[1] as bigint, 18);
    const abstainVotes = ethers.FixedNumber.fromValue(proposalVotesIsPending ? 0 : (proposalVotesData as any[])?.[2] as bigint, 18);

    const totalVotes = () => {
        const result = againstVotes.add(forVotes).add(abstainVotes);
        return result;
    }

    const proposalVotes = () => {
        const result = againstVotes.add(forVotes).add(abstainVotes);
        return result;
    }

    useEffect(() => {
        const quorum = parseFloat(ethers.formatEther(approvalQuorum().value));
        const votes = parseFloat(ethers.formatEther(proposalVotes().value));
        if (quorum === 0) {
            setApprovalProgress(0);
        } else {
            setApprovalProgress((votes / quorum) * 100 > 100 ? 100 : (votes / quorum) * 100);
        }
    }, [approvalQuorumData, proposalVotesData]);
    return (
        <div className="flex flex-row gap-10 items-center justify-between w-full h-full font-bold border-2 p-5 rounded-xl">
            <div className="flex flex-col gap-2 justify-center w-1/2">
                <div className="flex flex-row items-center justify-between font-medium text-xl">
                    <div className="flex flex-col justify-center gap-2 items-center">
                        <span>For Votes</span>
                        <span>{`${forVotes}`}</span>
                    </div>
                    <div className="flex flex-col justify-center gap-2 items-center">
                        <span>Abstain Votes</span>
                        <span>{`${abstainVotes}`}</span>
                    </div>
                    <div className="flex flex-col justify-center gap-2 items-center">
                        <span>Against Votes</span>
                        <span>{`${againstVotes}`}</span>
                    </div>
                </div>
            </div>
            <Separator
                orientation="horizontal"
                className="w-[1px] h-20 bg-slate-600 shrink"
            />
            <div className="flex flex-col gap-2 justify-center w-1/2">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row gap-2 items-center  font-medium text-xl">
                        <span>Approval Quorum</span>
                        <HoverCard >
                            <HoverCardTrigger><InfoCircledIcon className="h-4 w-4" /></HoverCardTrigger>
                            <HoverCardContent>
                                <span className="text-lg font-medium">
                                    {`${approvalQuorum().sub(proposalVotes()).value >= 0 ? approvalQuorum().sub(proposalVotes()) : 0}  more Votes required for a proposal to be successful.`}
                                </span>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    <span>{`${approvalProgress}%`}</span>
                </div>
                <div className="flex flex-row items-center w-full">
                    <Progress value={approvalProgress} className="w-full" />
                </div>
            </div>
        </div>
    )
}

export default VotesAndQuorum