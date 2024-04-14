import React from "react";

// Components
import SwapWrapper from "@/components/swap/swapWrapper";

const Swapping = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-swap bg-no-repeat bg-center bg-cover bg-fixed  h-screen relative">
      <div className="absolute inset-0 bg-white bg-opacity-20 w-full" />
      <div className="flex justify-center items-center p-10 relative ">
        <SwapWrapper />
      </div>
      <div className="h-[40px] relative"></div>
    </main>
  );
};

export default Swapping;
