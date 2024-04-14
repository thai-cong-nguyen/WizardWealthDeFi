import React from "react";

// Components
import { Badge } from "../ui/badge";
import GridTemplate from "./GridTemplate";

const YourSupplies = () => {
  return (
    <div>
      <GridTemplate title="Your Supplies">
        <div className="flex flex-row gap-3">
          <Badge className="font-light text-sm" variant="outline">
            Balance $<span className="font-medium">4,327.69</span>
          </Badge>
          <Badge className="font-light text-sm" variant="outline">
            APY
            <span className="font-medium">0</span>%
          </Badge>
          <Badge className="font-light text-sm" variant="outline">
            Collateral $<span className="font-medium">4,327.69</span>
          </Badge>
        </div>
      </GridTemplate>
    </div>
  );
};

export default YourSupplies;
