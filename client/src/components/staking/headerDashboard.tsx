import React from "react";
import { Button } from "../ui/button";

const HeaderDashboard = () => {
  return (
    <div className="flex flex-col bg-indigo-200 w-full p-10 h-auto gap-5 justify-center items-stretch flex-wrap border-b-4 border-black	">
      <span>Simple Staking</span>
      <div className="flex flex-row justify-between flex-wrap gap-5">
        <span>Single-Sided Simple Earn Staking</span>
        <Button className="">Top Leaderboard</Button>
      </div>
    </div>
  );
};

export default HeaderDashboard;
