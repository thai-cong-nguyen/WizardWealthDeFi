"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
// Components
import Order from "./order";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import ListProposal from "./listProposal";
import { useChainId, useReadContract, useReadContracts } from "wagmi";
import { getGovernorAddress } from "@/contracts/utils/getAddress";
import { getGovernorAbi } from "@/contracts/utils/getAbis";
import { ethers } from "ethers";

const Proposal = () => {
  const [status, setStatus] = useState<string>("active");
  const [search, setSearch] = useState<string>("");
  const [order, setOrder] = useState<string>("newest");

  return (
    <div className="flex flex-col gap-3 items-center my-5 w-[1400px] min-h-[900px] bg-white border-2 rounded-xl py-10">
      {/* title */}
      <div className="flex flex-col gap-5 justify-center items-center">
        <span className="text-3xl font-bold">
          Vote on proposals or Create your own
        </span>
        <Button className="text-xl">
          <Link href="/governance/createProposal">Create proposal</Link>
        </Button>
      </div>
      {/* action */}
      <div className="flex justify-center items-center">
        <Tabs defaultValue="active" className="w-[1200px] flex flex-col gap-5">
          <div className="flex flex-row items-center justify-between">
            <TabsList>
              <TabsTrigger value="pending" onClick={() => setStatus("pending")}>
                Pending
              </TabsTrigger>
              <TabsTrigger value="active" onClick={() => setStatus("active")}>
                Active
              </TabsTrigger>
              <TabsTrigger value="canceled" onClick={() => setStatus("canceled")}>
                Canceled
              </TabsTrigger>
              <TabsTrigger value="defeated" onClick={() => setStatus("defeated")}>
                Defeated
              </TabsTrigger>
              <TabsTrigger value="succeeded" onClick={() => setStatus("succeeded")}>
                Succeeded
              </TabsTrigger>
              <TabsTrigger value="queued" onClick={() => setStatus("queued")}>
                In Queued
              </TabsTrigger>
              <TabsTrigger value="expired" onClick={() => setStatus("expired")}>
                Expired
              </TabsTrigger>
              <TabsTrigger value="executed" onClick={() => setStatus("executed")}>
                Executed
              </TabsTrigger>

            </TabsList>
            <div className="flex flex-row gap-5 justify-center items-center">
              <span className="opacity-40">Order by </span>
              <Order setOrder={setOrder} />
            </div>
          </div>
          <Input
            type="text"
            placeholder="Search proposals by proposalId or Proposal Description"
            onChange={(event: any) => setSearch(event.target.value)}
          />
          <TabsContent value={status}>
            <ListProposal status={status} search={search} order={order} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Proposal;
