import React from "react";
import { Ingrid_Darling } from "next/font/google";
import { Button } from "../ui/button";

const ingrid_darling = Ingrid_Darling({
  subsets: ["latin"],
  style: "normal",
  weight: "400",
});

interface HeaderDashboardProps {
  isDashboard: boolean;
  onChangeContent: (isDashboard: boolean) => void;
}

const HeaderDashboard = ({
  isDashboard,
  onChangeContent,
}: HeaderDashboardProps) => {
  return (
    <div className="flex flex-col bg-indigo-200 bg-opacity-90 w-full p-10 h-auto gap-5 justify-center items-stretch flex-wrap border-b-4 border-black">
      <span className={`${ingrid_darling.className} text-9xl text-yellow-600`}>
        Simple Staking
      </span>
      <div
        className={`${ingrid_darling.className} flex flex-row justify-between items-center flex-wrap gap-5 px-10`}
      >
        <span className="lg:ml-40 text-5xl">
          Single-Sided Simple Earn Staking
        </span>
        <Button
          className="text-4xl h-full rounded-full border-4 transition hover:translate-y-1 duration-150 delay-100"
          onClick={() => {
            onChangeContent(!isDashboard);
          }}
        >
          {isDashboard ? "Top Leaderboard" : "Stake to Earn"}
        </Button>
      </div>
    </div>
  );
};

export default HeaderDashboard;
