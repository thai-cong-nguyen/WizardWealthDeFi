import React from "react";

import { ListBulletIcon, TableIcon } from "@radix-ui/react-icons";
import LineStaking from "./lineStaking";
import CardStaking from "./cardStaking";
import { tokens } from "@/utils/tokens";

interface ContentDashboardProps {
  verticalType: boolean;
  onChangeDisplayType: (vertical: boolean) => void;
}

const ContentDashboard = ({
  verticalType,
  onChangeDisplayType,
}: ContentDashboardProps) => {
  return (
    <div className="flex flex-col justify-center w-full bg-fuchsia-100 bg-opacity-90 h-auto p-10 gap-10">
      <div className="flex flex-row items-center gap-2">
        <div
          className="cursor-pointer"
          onClick={() => {
            onChangeDisplayType(true);
          }}
        >
          <ListBulletIcon
            width={20}
            height={20}
            color={verticalType ? "green" : "black"}
            className={
              !verticalType
                ? "transition delay-100 duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                : ""
            }
          />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            onChangeDisplayType(false);
          }}
        >
          <TableIcon
            width={20}
            height={20}
            color={!verticalType ? "green" : "black"}
            className={
              verticalType
                ? "transition delay-100 duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                : ""
            }
          />
        </div>
      </div>
      <div className="flex w-full h-auto px-10 items">
        {verticalType ? (
          <div
            className="w-full h-auto bg-white border-spacing-2 rounded-xl duration-200 
          ease-out transition origin-top-right transform"
          >
            {tokens.map((token, index) => {
              return (
                <LineStaking
                  value={`pool-${index + 1}`}
                  key={index}
                  token={token}
                />
              );
            })}
          </div>
        ) : (
          <div
            className="w-full h-auto flex flex-wrap gap-10 justify-center duration-200 
          ease-out transition transform origin-top-right"
          >
            {tokens.map((token, index) => {
              return <CardStaking token={token} key={index} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentDashboard;
