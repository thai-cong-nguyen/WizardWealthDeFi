"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  CheckIcon,
  MinusIcon,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SupplyButton from "../ExecutingButton/SupplyButton";

export type AssetsToSupplyPool = {
  id: string;
  address: string;
  name: string;
  symbol: string;
  walletBalance: number;
  collateral: boolean;
};

export const columns: ColumnDef<AssetsToSupplyPool>[] = [
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
    accessorKey: "walletBalance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Wallet Balance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center text-lg font-bold opacity-70">
          {row.getValue("walletBalance")}
        </div>
      );
    },
  },
  {
    accessorKey: "collateral",
    header: "Wallet Balance",
    cell: ({ row }) => {
      return row.getValue("collateral") ? (
        <CheckIcon height={30} width={30} className="text-lime-600" />
      ) : (
        <MinusIcon height={30} width={30} />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex flex-row gap-2 items-center">
        <SupplyButton pool={row.original} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log("Get more")}>
              Get more
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
