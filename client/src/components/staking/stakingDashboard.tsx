"use client";
import React, { useState } from "react";
import HeaderDashboard from "./headerDashboard";
import ContentDashboard from "./contentDashboard";
import ContentLeaderboard from "./contentLeaderboard";

const StakingDashboard = () => {
  return (
    <div className="flex flex-col justify-center w-full mx-24 h-full rounded-xl border-2 border-black overflow-hidden">
      {/* <HeaderDashboard
        isDashboard={isDashboard}
        onChangeContent={handleChangeContent}
      /> */}
      {
        <ContentDashboard
        // onChangeDisplayType={handleDisplayType}
        // props={`${isDashboard ? "fade-in" : "fade-out"} ${
        //   isDashboard && "delayed-fade-in"
        // }`}
        />
      }
    </div>
  );
};

export default StakingDashboard;
