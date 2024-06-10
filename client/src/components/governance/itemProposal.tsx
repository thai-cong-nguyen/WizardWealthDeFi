"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// Components
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Proposal } from "@/utils/proposal";
import { ChevronRight } from "lucide-react";
import { Separator } from "../ui/separator";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Progress } from "../ui/progress";
import axios from "axios";
import { useBlock, useChainId, useReadContract, useReadContracts, useWatchContractEvent } from "wagmi";
import { getGovernorAddress, getWizardWealthAddress } from "@/contracts/utils/getAddress";
import { getGovernorAbi, getWizardWealthAbi } from "@/contracts/utils/getAbis";
import { ethers } from "ethers";
import VotesAndQuorum from "./votesAndQuorum";

export const renderProposalStatus = (param: Number) => {
  switch (param) {
    case 0:
      return "Pending";
    case 1:
      return "Active";
    case 2:
      return "Canceled";
    case 3:
      return "Defeated";
    case 4:
      return "Succeeded";
    case 5:
      return "Queued";
    case 6:
      return "Expired";
    default:
      return "Unknown";
  }
};

const renderColorProposalStatus = (param: Number) => {
  switch (param) {
    case 1:
      return "activeStatus";
    case 2:
      return "inQueueStatus";
    case 3:
      return "passedStatus";
    case 4:
      return "failedStatus";
    default:
      return "default";
  }
};
interface ItemProposalProps {
  // proposal: Proposal;
  proposal: any;
}

export const convertTimeStampToDate = (timestamp: number | bigint) => {
  var date = new Date(Number(timestamp) * 1000);

  var dateString = date.toDateString();

  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();

  var formattedTime = dateString + " - " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime
}

const ItemProposal = ({ proposal }: ItemProposalProps) => {
  // const [approvalProgress, setApprovalProgress] = useState<number>(0);
  const [countDownTime, setCountDownTime] = useState<number>(0);
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

  // const {
  //   data: approvalQuorumData,
  //   error: approvalQuorumError,
  //   isPending: approvalQuorumIsPending,
  // } = useReadContracts({
  //   contracts: [
  //     {
  //       ...wizardWealthContract,
  //       functionName: "totalSupply"
  //     },
  //     {
  //       ...governorContract,
  //       functionName: "quorumNumerator"
  //     },
  //     {
  //       ...governorContract,
  //       functionName: "quorumDenominator"
  //     }
  //   ]
  // });

  // const {
  //   data: proposalVotesData,
  //   isPending: proposalVotesIsPending,
  // } = useReadContract({
  //   ...governorContract,
  //   functionName: "proposalVotes",
  //   args: [proposal.proposalId],
  // });


  // const approvalQuorum = () => {
  //   const totalSupply = ethers.FixedNumber.fromValue(approvalQuorumIsPending ? BigInt(1) : approvalQuorumData?.[0].result as bigint, 18);

  //   const quorumNumerator = ethers.FixedNumber.fromValue(approvalQuorumIsPending ? BigInt(1) : approvalQuorumData?.[1].result as bigint, 18);
  //   const quorumDenominator = ethers.FixedNumber.fromValue(approvalQuorumIsPending ? BigInt(1) : approvalQuorumData?.[2].result as bigint, 18);

  //   const result = totalSupply.mul(quorumNumerator).div(quorumDenominator);

  //   return result;
  // }

  // const againstVotes = ethers.FixedNumber.fromValue(proposalVotesIsPending ? 0 : (proposalVotesData as any[])?.[0] as bigint, 18);
  // const forVotes = ethers.FixedNumber.fromValue(proposalVotesIsPending ? 0 : (proposalVotesData as any[])?.[1] as bigint, 18);
  // const abstainVotes = ethers.FixedNumber.fromValue(proposalVotesIsPending ? 0 : (proposalVotesData as any[])?.[2] as bigint, 18);

  // const totalVotes = () => {
  //   const result = againstVotes.add(forVotes).add(abstainVotes);
  //   return result;
  // }

  // const proposalVotes = () => {
  //   const result = againstVotes.add(forVotes).add(abstainVotes);
  //   return result;
  // }

  // useEffect(() => {
  //   const quorum = parseFloat(ethers.formatEther(approvalQuorum().value));
  //   const votes = parseFloat(ethers.formatEther(proposalVotes().value));
  //   if (quorum === 0) {
  //     setApprovalProgress(0);
  //   } else {
  //     setApprovalProgress((votes / quorum) * 100);
  //   }
  // }, [approvalQuorumData, proposalVotesData]);

  useEffect(() => {
    const fetchCountDownTime = async () => {
      const endpoint = `https://api-sepolia.etherscan.io/api?module=block&action=getblockcountdown&blockno=${proposal.voteEnd}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;
      const headers = {
        "content-type": "application/json",
      };

      try {
        const response = await axios.get(endpoint, { headers });
        const data = response.data;
        const currentDate = new Date();
        currentDate.setSeconds(data.result.EstimateTimeInSec);
        setCountDownTime(currentDate.getTime() / 1000);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    }
    fetchCountDownTime();
  }, [proposal.voteEnd])

  const {
    data: stateData,
    isPending: stateIsPending,
    error: stateError,
  } = useReadContract({
    ...governorContract,
    functionName: "state",
    args: [proposal.proposalId],
  });

  const block = useBlock({ blockNumber: proposal.voteEnd });

  return (
    <Card
      className="min-h-[100px] w-full hover:bg-primary/10 cursor-pointer transition hover:scale-95 duration-150 delay-75 border-4 border-zinc-950"
      onClick={() => {
        router.push(`/governance/proposal/${proposal.proposalId}`);
      }}
    >
      <CardContent>
        <div className="m-5 flex flex-col gap-5">
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="text-2xl font-bold text-secondary-foreground">
              <span>Proposal</span>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-2">
                <Badge variant={renderColorProposalStatus(proposal.status)}>
                  {renderProposalStatus(Number(stateData))}
                </Badge>
              </div>
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>

          <div className="flex flex-row gap-2 items-center font-medium text-lg">
            <span>{`Created at:`}</span>
            <span>{convertTimeStampToDate(proposal.blockTimestamp)}</span>
          </div>
          <div className="flex flex-row gap-2 items-center font-medium text-lg">
            <span>{`Ends at:`}</span>
            <span>{isNaN(countDownTime) ? convertTimeStampToDate(block.data?.timestamp as bigint) : convertTimeStampToDate(countDownTime)}</span>
          </div>
          {/* <div className="flex flex-row gap-10 items-center justify-between w-full h-full font-bold border-2 p-5 rounded-xl">
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
                  <InfoCircledIcon className="h-4 w-4" />
                </div>
                <span>{`${approvalProgress}%`}</span>
              </div>

              <span>
                {`${approvalQuorum().sub(proposalVotes()).value >= 0 ? approvalQuorum().sub(proposalVotes()) : 0}  more "For" votes required`}
              </span>
              <div className="flex flex-row items-center w-full">
                <Progress value={approvalProgress} className="w-full" />
              </div>
            </div>
          </div> */}
          <VotesAndQuorum proposal={proposal} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemProposal;
