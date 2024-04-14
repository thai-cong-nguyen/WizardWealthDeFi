import React from "react";

import { ChevronDownIcon } from "@radix-ui/react-icons";

const CardDashboard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col w-[300px] h-[250px] justify-center items-center bg-primary relative p-2 font-bold text-secondary rounded-sm cursor-pointer hover:opacity-80">
      <div className="absolute inset-0 bg-white bg-opacity-20 rounded-sm" />
      <div className="flex flex-col justify-around items-center h-full">
        <div className="text-2xl">{title}</div>
        <svg
          width="w-full"
          height="30"
          viewBox="0 0 400 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 22.2428C163.419 -38.8205 270 54.4928 400 22.2428"
            stroke="white"
            strokeWidth="0.5"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-between items-center h-full">
        {children}
        <ChevronDownIcon width={30} height={30} />
      </div>
    </div>
  );
};

export default CardDashboard;
