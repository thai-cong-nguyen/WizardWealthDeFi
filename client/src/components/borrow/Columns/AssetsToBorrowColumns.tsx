"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  AlertCircle
} from "lucide-react";
import Image from "next/image";

export type AssetsToBorrowPool = {
  id: string;
  address: string;
  name: string;
  symbol: string;
  available: number;
};

export const columns: ColumnDef<AssetsToBorrowPool>[] = [
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
    accessorKey: "available",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Available
          <AlertCircle className="ml-2 h-4 w-4" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center text-lg font-bold opacity-70">
          {row.getValue("available")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex flex-row gap-2 items-center">
        <Button>Borrow</Button>
      </div>
    ),
  },
];
