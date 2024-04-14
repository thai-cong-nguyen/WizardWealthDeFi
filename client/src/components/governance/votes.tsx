import React from "react";

// Components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import voters from "@/utils/voters";
import { Badge } from "../ui/badge";

const renderStanceVoter = (param: any) => {
  switch (param) {
    case 1:
      return "Yes";
    case -1:
      return "No";
    default:
      return "Abstain";
  }
};

const Votes = () => {
  return (
    <Table>
      <TableCaption>{`${voters.length}`} addresses</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Voter</TableHead>
          <TableHead className="text-center">Stance</TableHead>
          <TableHead className="text-right">Voting power</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {voters.map((voter, index) => {
          return (
            <TableRow key={index}>
              <TableCell className="font-medium">{voter.voter}</TableCell>
              <TableCell className="text-center">
                <Badge>{renderStanceVoter(voter.stance)}</Badge>
              </TableCell>
              <TableCell className="text-right">
                {voter.votingPower} BGT
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Votes;
