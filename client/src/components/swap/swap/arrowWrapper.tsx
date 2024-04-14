import React, { MouseEventHandler } from "react";

import { Button } from "@/components/ui/button";
import { ArrowDownIcon } from "lucide-react";

interface ArrowWrapperProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ArrowWrapper: React.FC<ArrowWrapperProps> = ({ onClick }) => {
  return (
    <div className="relative bg-inherit rounded-xl h-[40px] w-[40px] my-[-18px] mx-auto z-50">
      <Button onClick={onClick}>
        <ArrowDownIcon height="15px" width="15px" />
      </Button>
    </div>
  );
};

export default ArrowWrapper;
