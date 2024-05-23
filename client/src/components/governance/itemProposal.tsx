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

const renderProposalType = (param: Number) => {
  switch (param) {
    case 1:
      return "Text Proposal";
    case 2:
      return "Gauge Proposal";
    default:
      return "Unknown";
  }
};

const renderProposalStatus = (param: Number) => {
  switch (param) {
    case 1:
      return "Active";
    case 2:
      return "In Queue";
    case 3:
      return "Passed";
    case 4:
      return "Failed";
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

const formatNumber = new Intl.NumberFormat("en-US", {
  style: "decimal",
});

const roundAndFormat = (number: number): number => {
  return parseInt(formatNumber.format(Math.round(number)));
};

interface ItemProposalProps {
  proposal: Proposal;
}

const ItemProposal = ({ proposal }: ItemProposalProps) => {
  const VOTING_DURATION = 50400; // 1 week
  const [totalVotes, setTotalVotes] = useState<number>(100000000);
  const [forVotes, setForVotes] = useState<number>(80000000);
  const [againsVotes, setAgainstVotes] = useState<number>(10000000);
  const [abstainVotes, setAbstainVotes] = useState<number>(10000000);
  const [minQuorum, setMinQuorum] = useState<number>(1000000000);

  const [approvalProgress, setApprovalProgress] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(
      () =>
        setApprovalProgress(
          forVotes >= minQuorum ? 100 : (forVotes * 100) / minQuorum
        ),
      500
    );
    return () => clearTimeout(timer);
  });

  return (
    <Card
      className="min-h-[100px] hover:bg-primary/10 cursor-pointer transition hover:scale-95 duration-150 delay-75 border-4 border-zinc-950"
      onClick={() => {
        router.push(`/governance/proposal/${proposal.id}`);
      }}
    >
      <CardContent>
        <div className="m-5 flex flex-col gap-5">
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="text-2xl font-bold text-secondary-foreground">
              {proposal.title}
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-2">
                <Badge variant={renderColorProposalStatus(proposal.status)}>
                  {renderProposalStatus(proposal.status)}
                </Badge>
              </div>
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>

          <div className="flex flex-row gap-2 items-center font-medium text-lg">
            <span>{`Created at:`}</span>
            <span>{proposal.submitDate.toLocaleString()}</span>
          </div>
          <div className="flex flex-row gap-2 items-center font-medium text-lg">
            <span>{`Ends at:`}</span>
            {/* <span>{proposal.submitDate.toLocaleString()}</span> */}
            <div className="flex flex-row gap-2 items-center">
              <span className="bg-black text-white p-1">{`1d`}</span>
              <span className="bg-black text-white p-1">{`7h`}</span>
              <span className="bg-black text-white p-1">{`46m`}</span>
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center justify-between w-full h-full font-bold border-2 p-5 rounded-xl">
            <div className="flex flex-col gap-2 justify-center w-1/2">
              <div className="flex flex-row items-center justify-between font-medium text-xl">
                <span>For Votes</span>
                <span>Against Votes</span>
              </div>
              <div className="flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-2 items-center">
                  <span>{formatNumber.format(forVotes)}</span>
                  <span className="opacity-60">
                    {formatNumber.format((forVotes * 100) / totalVotes)}%
                  </span>
                </div>
                <div className="flex flex-row gap-2 items-center ">
                  <span>{formatNumber.format(againsVotes)}</span>
                  <span className="opacity-60">
                    {formatNumber.format((againsVotes * 100) / totalVotes)}%
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center w-full">
                <div className="w-full h-[20px] relative rounded-xl border-2 overflow-hidden">
                  <div
                    className={`h-full float-left bg-emerald-500  absolute top-0 left-0`}
                    style={{
                      width: `${formatNumber.format(
                        (forVotes * 100) / totalVotes
                      )}%`,
                    }}
                  ></div>
                  <div
                    className={`h-full float-left bg-gray-500  absolute top-0`}
                    style={{
                      width: `${formatNumber.format(
                        (abstainVotes * 100) / totalVotes
                      )}%`,
                      left: `${formatNumber.format(
                        (forVotes * 100) / totalVotes
                      )}%`,
                      right: `${formatNumber.format(
                        (againsVotes * 100) / totalVotes
                      )}%`,
                    }}
                  ></div>
                  <div
                    className={`h-full float-left bg-red-600  absolute top-0 right-0`}
                    style={{
                      width: `${formatNumber.format(
                        (againsVotes * 100) / totalVotes
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <Separator
              orientation="horizontal"
              className="w-[1px] h-20 bg-slate-600 shrink"
            />
            <div className="flex flex-col gap-2 justify-center w-1/2">
              <div className="flex flex-row gap-2 items-center  font-medium text-xl">
                <span>Approval Quorum</span>
                <InfoCircledIcon className="h-4 w-4" />
              </div>
              <span>
                {formatNumber.format(
                  minQuorum - forVotes >= 0 ? minQuorum - forVotes : 0
                )}{" "}
                more Yes votes required
              </span>
              <div className="flex flex-row items-center w-full">
                <Progress value={approvalProgress} className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemProposal;
