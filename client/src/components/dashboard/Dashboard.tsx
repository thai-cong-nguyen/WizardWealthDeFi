import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import CardDashboard from "./CardDashboard";
import { Ingrid_Darling } from "next/font/google";

const ingridDarling = Ingrid_Darling({
  subsets: ["latin"],
  weight: "400",
});

const Dashboard = ({ className }: { className: any }) => {
  return (
    <main className="flex flex-col items-center justify-center p-8">
      <div className={`${ingridDarling.className} text-8xl text-secondary`}>
        Wizard Wealth Finance
      </div>
      <div className="flex flex-col p-5 gap-5 items-center">
        <div className="grid xl:grid-cols-3 sm:grid-rows-1 gap-10">
          <CardDashboard title="Wizard Wealth">
            <div className="text-sm text-overflow">
              Swap, earn and borrow the assets inspired by the Decentralized
              Finance Protocols. Fully functionality for community to adjust
              Wizard Wealth
            </div>
          </CardDashboard>
          <CardDashboard title="Swap Token">
            <div className="text-sm text-overflow">
              Making the swapping token simplify. Access thousands of token on
              Ethereum with having Liquidity Pools on Uniswap.
            </div>
          </CardDashboard>
          <CardDashboard title="Lending - Borrowing">
            <div className="text-sm text-overflow">
              Supply assets into the protocol and use it for the collateral for
              borrowing another assets. Easy way for Short Selling Chances.
            </div>
          </CardDashboard>
        </div>
        <div className="grid xl:grid-cols-2 sm:grid-cols-1 gap-5">
          <CardDashboard title="Earn by Staking">
            <div className="text-sm text-overflow">
              Use your assets to earn more assets. Staking with Wizard Wealth
              will be safe for keeping assets with interest rate.
            </div>
          </CardDashboard>
          <CardDashboard title="Governance">
            <div className="text-sm text-overflow">
              Wizard Wealth DAO provide the safety for community to easily
              update the Protocol through creating / voting a proposal.
            </div>
          </CardDashboard>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
