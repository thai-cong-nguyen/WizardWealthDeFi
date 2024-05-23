"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

// Hooks

// Components
import Order from "./order";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import ListProposal from "./listProposal";

const Proposal = () => {
  const [status, setStatus] = useState<string>("active");
  const [search, setSearch] = useState<string>("");
  return (
    <div className="flex flex-col items-center my-5 w-[1400px] min-h-[900px] bg-white border-2 rounded-xl py-10">
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
              <TabsTrigger
                value="active"
                onClick={() => {
                  setStatus("active");
                }}
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="inQueue"
                onClick={() => {
                  setStatus("inQueue");
                }}
              >
                In Queue
              </TabsTrigger>
              <TabsTrigger
                value="passed"
                onClick={() => {
                  setStatus("passed");
                }}
              >
                Passed
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                onClick={() => {
                  setStatus("rejected");
                }}
              >
                Rejected
              </TabsTrigger>
            </TabsList>
            <div className="flex flex-row gap-5 justify-center items-center">
              <span className="opacity-40">Order by </span>
              <Order />
            </div>
          </div>
          <Input
            type="text"
            placeholder="Search proposals"
            onChange={(event: any) => {
              setSearch(event.target.value);
              console.log(event.target.value);
            }}
          />
          <TabsContent value={status}>
            <ListProposal status={status} search={search} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Proposal;
