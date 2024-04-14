"use client";

import React, { useState, useEffect } from "react";

// Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Hooks
import { Icon } from "@radix-ui/react-select";

// Images
import ethereumIcon from "@/../public/ethereum.png";
import ethereumIcon2 from "@/../public/ethereum (1).png";

const chains: any = [
  {
    name: "Ethereum",
    icon: ethereumIcon,
    chainID: 1,
  },
  {
    name: "Goerli Testnet",
    icon: ethereumIcon2,
    chainID: 5,
  },
  {
    name: "Sepolia Testnet",
    icon: ethereumIcon2,
    chainID: 11155111,
  },
];

const SelectingChain = () => {
  const [currentChain, setCurrentChain] = useState(chains[0]);

  return (
    <div>
      <Select
        onValueChange={(value) => setCurrentChain(value)}
        defaultValue={`${currentChain.chainID}`}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={currentChain.name} />
        </SelectTrigger>
        <SelectContent>
          {chains.map((item: any, index: any) => {
            return (
              <SelectItem value={`${item.chainID}`} key={`${index}`}>
                <div className="flex items-center">
                  {/* <Icon className="mr-2 h-4 w-4" ref={`${item.icon}`} /> */}
                  {item.name}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectingChain;
