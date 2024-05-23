import React from "react";
import { Button } from "../ui/button";

const Content = () => {
  return (
    <div className="flex flex-row gap-10 items-center h-20 mb-10 flex-wrap">
      <div className="flex flex-col gap-5 justify-center items-stretch text-2xl font-bold flex-wrap">
        <span>Net worth</span>
        <span className="opacity-60">$ 0.00</span>
      </div>
      <div className="flex flex-col gap-5 justify-center flex-wrap">
        <span className="text-2xl font-bold h-full">Health factor</span>
        <div className="flex flex-row gap-4 items-center text-2xl font-bold h-full">
          <span className="opacity-90 text-lime-700">100.00</span>
          <Button className="h-[30px]">RISK DETAILS</Button>
        </div>
      </div>
    </div>
  );
};

export default Content;
