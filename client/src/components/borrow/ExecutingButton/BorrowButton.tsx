"use client";
import React, { useState } from "react";
import Image from "next/image";
//Components
import { Button } from "@/components/ui/button";

import SupplyDialog from "../Dialog/SupplyDialog";
import { BorrowingPool } from "../Columns/YourBorrowingsColumns";
import { AssetsToBorrowPool } from "../Columns/AssetsToBorrowColumns";
import BorrowDialog from "../Dialog/BorrowDialog";

interface BorrowButtonProps {
    pool: BorrowingPool | AssetsToBorrowPool;
}

const BorrowButton = ({ pool }: BorrowButtonProps) => {
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

    const handleDialog = () => {
        setIsOpenDialog(!isOpenDialog);
    };

    return (
        <div>
            <Button onClick={handleDialog}>Borrow</Button>
            <BorrowDialog
                pool={pool}
                isOpen={isOpenDialog}
                setIsOpen={handleDialog}
            />
        </div>
    );
};

export default BorrowButton;
