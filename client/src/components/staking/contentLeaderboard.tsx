import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { leaderboard } from "@/utils/leaderboard";
import { CrownIcon } from "lucide-react";

interface ContentLeaderboardProps {
  props: string;
}

const ContentLeaderboard = ({ props }: ContentLeaderboardProps) => {
  return (
    <div
      className={`flex flex-col justify-center w-full bg-fuchsia-100 bg-opacity-90 h-auto p-10 gap-10 animate-fade-out ${props}`}
    >
      <Table>
        <TableCaption>Top Leader in April</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Rank</TableHead>
            <TableHead className="min-w-[300px]">Address</TableHead>
            <TableHead>Total Reward Amount ($USD)</TableHead>
            <TableHead>Total Staking Amount ($USD)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {leaderboard.map((data, index) => {
            return (
              <TableRow
                key={index}
                onClick={() => {
                  console.log(data);
                }}
              >
                <TableCell>
                  {index < 3 ? (
                    <div className="flex flex-row gap-2 items-center">
                      <CrownIcon
                        color={
                          index == 0
                            ? "color(display-p3 1 0.77 0.26)"
                            : index == 1
                            ? "color(display-p3 0.685 0.709 0.697)"
                            : "color(display-p3 1 0.63 0.38)"
                        }
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell align="center">{data.reward}</TableCell>
                <TableCell align="center">{data.staked}</TableCell>
              </TableRow>
            );
          })} */}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContentLeaderboard;
