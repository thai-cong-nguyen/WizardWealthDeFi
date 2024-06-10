"use client";
import React, { useState, useEffect } from "react";

//Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Order = ({ setOrder }: { setOrder: (order: string) => void }) => {
  const [orderBy, setOrderBy] = useState("newest");

  const handleOrderChange = (value: string) => {
    setOrderBy(value);
    setOrder(value);
  };

  return (
    <div>
      <Select
        name="OrderBy"
        defaultValue="newest"
        value={orderBy}
        onValueChange={handleOrderChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Order;
