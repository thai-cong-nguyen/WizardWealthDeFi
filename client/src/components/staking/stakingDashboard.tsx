"use client";
import React, { useState } from "react";
import HeaderDashboard from "./headerDashboard";
import ContentDashboard from "./contentDashboard";

const StakingDashboard = () => {
  const [isVertical, setIsVertical] = useState(true);

  const handleDisplayType = (vertical: boolean) => {
    if (vertical != isVertical) {
      setIsVertical(vertical);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full mx-24 h-full rounded-xl border-4 border-black overflow-hidden">
      <HeaderDashboard />
      <ContentDashboard
        verticalType={isVertical}
        onChangeDisplayType={handleDisplayType}
      />
    </div>
  );
};

export default StakingDashboard;
