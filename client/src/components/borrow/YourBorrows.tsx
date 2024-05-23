import React from "react";

// Components
import { Badge } from "../ui/badge";
import GridTemplate from "./GridTemplate";

import { BorrowingPool, columns } from "./Columns/YourBorrowingsColumns";
import { YourBorrowingsDataTable } from "./Columns/YourBorrowingsDataTable";

interface YourBorrowingsProps {
  data: BorrowingPool[];
}

const YourBorrowings = ({ data }: YourBorrowingsProps) => {
  return (
    <GridTemplate title="Your Borrowings" isNothing={data ? true : false}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-3 flex-wrap">
          <Badge className="font-light text-sm" variant="outline">
            Balance $<span className="font-medium">4,327.69</span>
          </Badge>
        </div>
        {/* Table */}
        <YourBorrowingsDataTable columns={columns} data={data} />
      </div>
    </GridTemplate>
  );
};

export default YourBorrowings;
