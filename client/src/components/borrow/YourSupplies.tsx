import React from "react";

// Components
import { Badge } from "../ui/badge";
import GridTemplate from "./GridTemplate";

import { SupplyingPool, columns } from "./Columns/YourSuppliesColumns";
import { YourSuppliesDataTable } from "./Columns/YourSuppliesDataTable";

interface YourSuppliesProps {
  data: SupplyingPool[];
}

const YourSupplies = ({data}: YourSuppliesProps) => {
  return (
    <GridTemplate title="Your Supplies" isNothing={data ? true : false}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-3 flex-wrap">
          <Badge className="font-light text-sm" variant="outline">
            Balance $<span className="font-medium">4,327.69</span>
          </Badge>
          <Badge className="font-light text-sm" variant="outline">
            Collateral $<span className="font-medium">4,327.69</span>
          </Badge>
        </div>
        {/* Table */}
        <YourSuppliesDataTable columns={columns} data={data} />
      </div>
    </GridTemplate>
  );
};

export default YourSupplies;
