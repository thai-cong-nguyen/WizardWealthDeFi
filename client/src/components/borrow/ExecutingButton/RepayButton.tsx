"use client";
import React, { useState } from "react";
import Image from "next/image";
//Components
import { Button } from "@/components/ui/button";

import { BorrowingPool } from "../Columns/YourBorrowingsColumns";
import { AssetsToBorrowPool } from "../Columns/AssetsToBorrowColumns";
import RepayDialog from "../Dialog/RepayDialog";

interface RepayButtonProps {
    pool: BorrowingPool | AssetsToBorrowPool;
}

const RepayButton = ({ pool }: RepayButtonProps) => {
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

    const handleDialog = () => {
        setIsOpenDialog(!isOpenDialog);
    };

    return (
        <div>
            <Button onClick={handleDialog}>Repay</Button>
            <RepayDialog
                pool={pool}
                isOpen={isOpenDialog}
                setIsOpen={handleDialog}
            />
        </div>
    );
};

export default RepayButton;
