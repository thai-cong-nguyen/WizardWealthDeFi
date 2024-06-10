"use client";
import React, { useState } from "react";
import Image from "next/image";
//Components
import { Button } from "@/components/ui/button";

import SupplyDialog from "../Dialog/SupplyDialog";
import { SupplyingPool } from "../Columns/YourSuppliesColumns";
import { AssetsToSupplyPool } from "../Columns/AssetsToSupplyColumns";

interface SupplyButtonProps {
  pool: SupplyingPool | AssetsToSupplyPool;
}

const SupplyButton = ({ pool }: SupplyButtonProps) => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const handleDialog = () => {
    setIsOpenDialog(!isOpenDialog);
  };

  return (
    <div>
      <Button onClick={handleDialog}>Supply</Button>
      <SupplyDialog
        pool={pool}
        isOpen={isOpenDialog}
        setIsOpen={handleDialog}
      />
    </div>
  );
};

export default SupplyButton;
