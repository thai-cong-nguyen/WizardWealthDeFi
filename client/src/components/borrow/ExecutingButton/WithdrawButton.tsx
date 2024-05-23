"use client";
import React, { useState } from "react";
import Image from "next/image";
//Components
import { Button } from "@/components/ui/button";

import WithdrawDialog from "../Dialog/WithdrawDialog";
import { WithdrawingPool } from "../Columns/YourSuppliesColumns";

interface WithdrawButtonProps {
  pool: WithdrawingPool;
}

const WithdrawButton = ({ pool }: WithdrawButtonProps) => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const handleDialog = () => {
    setIsOpenDialog(!isOpenDialog);
  };

  return (
    <div>
      <Button onClick={handleDialog}>Withdraw</Button>
      <WithdrawDialog
        pool={pool}
        isOpen={isOpenDialog}
        setIsOpen={handleDialog}
      />
    </div>
  );
};

export default WithdrawButton;
