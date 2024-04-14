import React from "react";

const Content = () => {
  return (
    <div className="flex flex-col gap-2 mx-5">
      <div className="font-bold text-5xl">Goerli Ethereum</div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <div className="opacity-50">Net Worth</div>
          <div className="text-xl">
            <span className="opacity-50">$</span>
            <span className="font-bold">1000</span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="opacity-50">Net APY</div>
          <div className="text-xl">
            <span className="font-bold ">1000</span>
            <span className="opacity-50">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
