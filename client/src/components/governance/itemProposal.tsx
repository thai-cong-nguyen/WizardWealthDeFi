"use client";
import React from "react";
import { useRouter } from "next/navigation";
// Components
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import proposals from "@/utils/proposal";

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

const statusProposal: any = {
  active: 1,
  inQueue: 2,
  passed: 3,
  failed: 4,
};

const ItemProposal = ({ status }: { status: string }) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 gap-4">
      {proposals.map((proposal, index) => {
        if (proposal.status != statusProposal[status]) return null;
        return (
          <Card
            key={index}
            className="min-h-[100px] hover:bg-primary/10 cursor-pointer"
            onClick={() => {
              router.push(`/governance/proposal/${proposal.id}`);
            }}
          >
            <div className="m-5 flex flex-col gap-2">
              <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-2">
                  <Badge variant={proposal.type == 1 ? "default" : "secondary"}>
                    {renderProposalType(proposal.type)}
                  </Badge>
                  <Badge variant={renderColorProposalStatus(proposal.status)}>
                    {renderProposalStatus(proposal.status)}
                  </Badge>
                </div>
                <div className="">{proposal.submitDate.toLocaleString()}</div>
              </div>
              <div className="text-xl font-bold text-secondary-foreground">
                {proposal.title}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ItemProposal;
