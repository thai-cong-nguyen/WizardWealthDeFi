import React from "react";

// Components
import Proposal from "@/components/governance/proposal";

const Governance = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative">
      <Proposal />
    </main>
  );
};

export default Governance;
