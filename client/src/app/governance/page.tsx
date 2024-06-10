import React from "react";

// Components
import Proposal from "@/components/governance/proposal";

const Governance = () => {
  return (
    <main className="bg-staking bg-no-repeat bg-center bg-cover bg-fixed h-auto relative">
      <div className="absolute inset-0 bg-white bg-opacity-20 w-full" />
      <div className="flex justify-center items-center p-10 relative h-full ">
        <Proposal />
      </div>
      <div className="h-[40px] relative"></div>
    </main>
  );
};

export default Governance;
