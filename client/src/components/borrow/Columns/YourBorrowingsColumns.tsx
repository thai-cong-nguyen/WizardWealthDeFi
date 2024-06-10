"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import BorrowButton from "../ExecutingButton/BorrowButton";
import RepayButton from "../ExecutingButton/RepayButton";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BorrowingPool = {
  id: string;
  address: string;
  name: string;
  symbol: string;
  debt: number;
};

export const columns: ColumnDef<BorrowingPool>[] = [
  {
    accessorKey: "symbol",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assets
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-2 items-center">
          <Image
            width={50}
            height={50}
            src="/ethereum.png"
            alt={row.getValue("symbol")}
          />
          <span className="text-lg font-bold">{row.getValue("symbol")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "debt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Debt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center text-lg font-bold opacity-70">
          {parseFloat(row.getValue("debt")).toFixed(5)}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex flex-row gap-2 items-center">
        <BorrowButton pool={row.original} />
        <RepayButton pool={row.original} />
      </div>
    ),
  },
];
