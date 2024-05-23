"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import SupplyDialog from "../Dialog/SupplyDialog";
import SupplyButton from "../ExecutingButton/SupplyButton";
import WithdrawButton from "../ExecutingButton/WithdrawButton";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SupplyingPool = {
  id: string;
  address: string;
  name: string;
  symbol: string;
  balance: number;
  collateral: boolean;
};

export const columns: ColumnDef<SupplyingPool>[] = [
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
    accessorKey: "balance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Balance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center text-lg font-bold opacity-70">
          {row.getValue("balance")}
        </div>
      );
    },
  },
  {
    accessorKey: "collaterals",
    header: "Collateral",
    cell: ({ row }) => {
      return (
        <div className="w-full">
          <Switch
            checked={row.getValue("collateral")}
            onCheckedChange={() => {}}
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex flex-row gap-2 items-center">
        <SupplyButton pool={row.original} />
        <WithdrawButton pool={row.original} />
      </div>
    ),
  },
];
