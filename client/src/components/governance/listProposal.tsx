import React from "react";
// Components
import { proposals } from "@/utils/proposal";
import ItemProposal from "./itemProposal";

const statusProposal: any = {
  active: 1,
  inQueue: 2,
  passed: 3,
  failed: 4,
};

interface ListProposal {
  status: string;
  search?: string;
}

const ListProposal = ({ status, search }: ListProposal) => {
  let flag: boolean = false;
  return (
    <div
      className={`flex flex-col gap-3 justify-center ${
        flag ? "items-center" : ""
      }`}
    >
      {proposals.map((proposal, index) => {
        if (proposal.status != statusProposal[status]) return null;
        if (search && !proposal.title.includes(search)) return null;
        if (!flag) {
          flag = true;
        }
        return <ItemProposal key={index} proposal={proposal} />;
      })}
      {!flag && <div className="w-full">No proposals</div>}
    </div>
  );
};

export default ListProposal;
