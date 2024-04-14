"use client";
import React, { useState } from "react";

// Components
import { Plus, Minus } from "lucide-react";

const GridTemplate = ({
  title,
  children,
}: {
  title: any;
  children: React.ReactNode;
}) => {
  const [isShown, setIsShown] = useState(true);
  const onClickShowDetails = () => {
    setIsShown(!isShown);
  };
  return (
    <div className="border-inherit border-2 rounded-xl p-10">
      {/* sub title */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <div className="font-bold text-2xl">{title}</div>
          <div
            className="flex flex-row items-center justify-center cursor-pointer opacity-70"
            onClick={onClickShowDetails}
          >
            <div className="">{isShown ? "Hide" : "Show"}</div>
            <div className="">{isShown ? <Minus /> : <Plus />}</div>
          </div>
        </div>

        <div className="flex flex-col"></div>
      </div>

      {children}
    </div>
  );
};

export default GridTemplate;
