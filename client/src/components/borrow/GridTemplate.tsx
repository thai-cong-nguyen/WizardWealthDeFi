"use client";
import React, { useState } from "react";

// Components
import { Plus, Minus } from "lucide-react";

const GridTemplate = ({
  title,
  children,
  isNothing,
  props,
}: {
  title: any;
  children?: React.ReactNode;
  isNothing?: boolean;
  props?: any;
}) => {
  const [isShown, setIsShown] = useState(true);
  const onClickShowDetails = () => {
    setIsShown(!isShown);
  };
  return (
    <div
      className={`flex justify-center flex-col border-3 border-black rounded-xl p-5 bg-white flex-wrap ${props} ${!isShown ? "min-h-0" : ""
        }`}
    >
      {/* sub title */}
      <div className="flex flex-col gap-2 flex-wrap ">
        <div className="flex flex-row items-center justify-between">
          <div className="font-bold text-2xl">{title}</div>
          {isNothing ? (
            <div
              className="flex flex-row items-center justify-center cursor-pointer opacity-70"
              onClick={onClickShowDetails}
            >
              <span className="">{isShown ? "Hide" : "Show"}</span>
              <span className="">{isShown ? <Minus /> : <Plus />}</span>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-col"></div>
      </div>

      {isShown ? children : <></>}
    </div>
  );
};

export default GridTemplate;
