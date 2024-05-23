import StakingDashboard from "@/components/staking/stakingDashboard";
import { wagmiConfig } from "@/config/Wagmi.config";
import React from "react";
import { useReadContracts, useChainId } from "wagmi";
import { getStakingAbi } from "@/contracts/utils/getAbis";
import { getStakingAddress } from "@/contracts/utils/getAddress";

const Staking = () => {
  return (
    <main className="bg-staking bg-no-repeat bg-center bg-cover bg-fixed h-auto relative">
      <div className="absolute inset-0 bg-white bg-opacity-20 w-full" />
      <div className="flex justify-center items-center p-10 relative h-full ">
        <StakingDashboard />
      </div>
      <div className="h-[40px] relative"></div>
    </main>
  );
};

export default Staking;
