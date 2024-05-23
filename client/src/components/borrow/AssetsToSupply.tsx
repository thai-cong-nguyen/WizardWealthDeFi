"use client";

import React, { useState } from "react";

import GridTemplate from "./GridTemplate";
import { Badge } from "../ui/badge";
import { AssetsToSupplyDataTable } from "./Columns/AssetsToSupplyDataTable";
import { AssetsToSupplyPool, columns } from "./Columns/AssetsToSupplyColumns";

interface AssetsToSupplyProps {
  data: AssetsToSupplyPool[];
}

const AssetsToSupply = ({ data }: AssetsToSupplyProps) => {
  return (
    <GridTemplate title="Assets to supply">
      <AssetsToSupplyDataTable columns={columns} data={data} />
    </GridTemplate>
  );
};

export default AssetsToSupply;
