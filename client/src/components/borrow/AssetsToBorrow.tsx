import React from "react";

import GridTemplate from "./GridTemplate";
import { Badge } from "../ui/badge";
import { AssetsToBorrowPool, columns } from "./Columns/AssetsToBorrowColumns";
import { AssetsToBorrowDataTable } from "./Columns/AssetsToBorrowDataTable";

interface AssetsToBorrowProps {
  data: AssetsToBorrowPool[];
}

const AssetsToBorrow = ({ data }: AssetsToBorrowProps) => {
  return (
    <GridTemplate title="Assets To Borrow">
      <AssetsToBorrowDataTable columns={columns} data={data} />
    </GridTemplate>
  );
};

export default AssetsToBorrow;
