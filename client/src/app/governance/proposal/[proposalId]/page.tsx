"use client";
import React, { useState, useEffect } from "react";
import { useRouter, notFound } from "next/navigation";
// Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowBigLeft, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Votes from "@/components/governance/votes";
import proposals from "@/utils/proposal";
import VoteDialog from "@/components/governance/voteDialog";

const ProposalDetail = ({ params }: { params: { proposalId: string } }) => {
  const router = useRouter();
  const proposal = proposals.find(
    (proposal) => proposal.id.toString() === params.proposalId
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress((100 * 2) / 3), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!proposal) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 px-28 m-10">
      <div className="w-full flex flex-row justify-between gap-5">
        <div
          className="flex flex-row gap-2 cursor-pointer justify-center items-center"
          onClick={() => router.back()}
        >
          <ArrowBigLeft />
          <span>Governance</span>
        </div>
        <div>
          <VoteDialog />
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full min-h-10 justify-normal items-start border-2 p-10 rounded-xl">
        <div className="flex flex-row gap-4 items-center">
          <div className="flex flex-row gap-2">
            <Badge /*variant={proposal.type == 1 ? "default" : "secondary"} */>
              Rejected
              {/* {renderProposalType(proposal.type)} */}
            </Badge>
            <Badge /*variant={renderColorProposalStatus(proposal.status)} */>
              Text Proposal
              {/* {renderProposalStatus(proposal.status)} */}
            </Badge>
          </div>
          <div className="text-xs">
            Submitted January 31st, 2024
            {/*proposal.submitDate.toLocaleString()*/}
          </div>
        </div>
        <div className="text-xl font-bold text-secondary-foreground">
          Title
          {/* {proposal.title} */}
        </div>
        {/* Progress */}
        <div className="w-full flex flex-col justify-center">
          <div className="relative h-[25px]">
            <div className="absolute top-0 text-xs font-medium capitalize leading-tight text-muted-foreground left-1/3 -translate-x-1/2">
              Pass Threshold
            </div>
            <div className="border-l-1 absolute top-[14px] h-[8px] border border-muted-foreground left-1/3"></div>
            <div className="absolute top-0 text-xs font-medium capitalize leading-tight text-muted-foreground left-2/3 -translate-x-1/2">
              Quorum
            </div>
            <div className="border-l-1 absolute top-[14px] h-[8px] border border-muted-foreground left-2/3"></div>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
        <div className="w-full flex flex-row justify-between items-start">
          <div className="">
            Submitted by <b>0x5391</b>...61fe
          </div>
          <div className="">0.00% participation rate</div>
        </div>
      </div>
      <div className="flex flex-row gap-5 w-full">
        <div className="flex flex-col w-1/3 justify-center items-center border-2 p-10 rounded-xl">
          <span className="font-bold text-2xl">29.77</span>
          <div className="flex flex-row gap-2 justify-center items-center">
            Total votes
            <AlertCircle className="cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-row w-full border-2 p-10 rounded-xl">
          <div className="flex flex-1 flex-col items-center gap-2 border-r border-border sm:w-[140px]">
            <div className="text-lg font-semibold leading-9 text-success-foreground sm:text-3xl">
              0%
            </div>
            <div className="">Yes</div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2 border-r border-border sm:w-[140px]">
            <div className="text-lg font-semibold leading-9 text-success-foreground sm:text-3xl">
              0%
            </div>
            <div className="">Yes</div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2 border-r border-border sm:w-[140px]">
            <div className="text-lg font-semibold leading-9 text-success-foreground sm:text-3xl">
              0%
            </div>
            <div className="">Yes</div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2 sm:w-[140px]">
            <div className="text-lg font-semibold leading-9 text-success-foreground sm:text-3xl">
              0%
            </div>
            <div className="">Yes</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-5 w-full h-fit">
        <div className="flex flex-col gap-3 w-full h-full">
          <div className="w-full font-bold text-xl">Description</div>
          <div className="flex flex-col gap-3 w-full overflow-y-auto justify-normal items-start border-2 p-10 rounded-xl max-h-[376px]">
            So far there are no rewards for delegators, whereas in the docs
            berachain every delegator who delegates BGT tokens will get Bribe.
            For validators, please consider this
          </div>
        </div>
        {proposal.type == 2 ? (
          <div className="flex flex-col gap-3 w-full h-full">
            <div className="w-full font-bold text-xl">Msg</div>
            <div className="flex flex-col gap-3 w-full overflow-y-auto max-h-[376px] justify-normal items-start border-2 p-10 rounded-xl">
              <pre>MSG</pre>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 w-full">
        <div className="w-full font-bold text-xl">Overview</div>
        <div className="flex flex-col gap-3 w-full min-h-10 justify-normal items-start border-2 p-10 rounded-xl">
          Chart
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <div className="w-full font-bold text-xl">Votes</div>
        <div className="flex flex-col gap-3 w-full min-h-10 justify-normal items-start border-2 p-10 rounded-xl">
          <Votes />
        </div>
      </div>
    </div>
  );
};

export default ProposalDetail;
