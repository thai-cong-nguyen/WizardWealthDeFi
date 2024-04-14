import React from "react";

// Components
import Content from "@/components/borrow/Content";
import AssetsToSupply from "@/components/borrow/AssetsToSupply";
import AssetsToBorrow from "@/components/borrow/AssetsToBorrow";
import YourBorrows from "@/components/borrow/YourBorrows";
import YourSupplies from "@/components/borrow/YourSupplies";

const Borrow = () => {
  return (
    <div className="flex flex-col justify-center content-center w-full gap-10 mx-20 pt-10">
      <Content />
      <div className="grid grid-cols-2 gap-4 w-full">
        <YourSupplies />
        <YourBorrows />
        <AssetsToSupply />
        <AssetsToBorrow />
      </div>
    </div>
  );
};

export default Borrow;
