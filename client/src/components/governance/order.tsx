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

const Order = () => {
  const [orderBy, setOrderBy] = useState("most-recent");
  return (
    <div>
      <Select
        name="OrderBy"
        defaultValue="most-recent"
        value={orderBy}
        onValueChange={setOrderBy}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="most-recent">Most Recent</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="highest-participation">
            Highest Participation
          </SelectItem>
          <SelectItem value="lowest-participation">
            Lowest Participation
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Order;
