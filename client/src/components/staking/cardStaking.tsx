"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TokenModel } from "@/models/Token.Models";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import DialogOptionInStaking from "./DialogOptionInStaking";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";

interface CardStakingProps {
  token: TokenModel;
  key: number;
}

const CardStaking = ({ token, key }: CardStakingProps) => {
  const MIN_DEPOSIT_TOKEN = 20;
  const MIN_WITHDRAW_TOKEN = 0;
  const MIN_EARN_TOKEN = 1;
  const PERCENT_DEFAULT = 25;
  const CHECKED_DEFAULT = false;

  const [totalStakingAmount, setTotalStakingAmount] = useState<number>(0);

  // Staking
  const [balance, setBalance] = useState<number>(1000);
  const [stakingAmount, setStakingAmount] = useState<number>(MIN_DEPOSIT_TOKEN);
  const [stakingPercent, setStakingPercent] = useState<number>(PERCENT_DEFAULT);
  const [stakingChecked, setStakingChecked] =
    useState<boolean>(CHECKED_DEFAULT);
  // Withdraw
  const [stakingBalance, setStakingBalance] = useState<number>(1000);
  const [withdrawAmount, setWithdrawAmount] =
    useState<number>(MIN_WITHDRAW_TOKEN);
  const [withdrawPercent, setWithdrawPercent] =
    useState<number>(PERCENT_DEFAULT);
  const [withdrawChecked, setWithdrawChecked] =
    useState<boolean>(CHECKED_DEFAULT);
  // Earn
  const [earnBalance, setEarnBalance] = useState<number>(1000);
  const [earnAmount, setEarnAmount] = useState<number>(MIN_EARN_TOKEN);
  const [earnPercent, setEarnPercent] = useState<number>(PERCENT_DEFAULT);
  const [earnChecked, setEarnChecked] = useState<boolean>(CHECKED_DEFAULT);

  return (
    <Card className="flex flex-col gap-5 justify-center lg:min-w-[400px] p-10 bg-white rounded-xl flex-wrap hover:translate-y-2 transition">
      <div className="flex flex-row items-center justify-between flex-wrap">
        <Image width={80} height={80} src="/ethereum.png" alt={token.name || ""} />
        <span className="font-bold text-2xl">{token.symbol}</span>
      </div>
      <div className="flex flex-row items-center justify-between flex-wrap">
        <span className="font-medium">Staked Amount</span>
        <div className="flex flex-row gap-2 items-center text-lg font-semibold opacity-70">
          <span>{stakingBalance}</span>
          <span>{token.symbol}</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between flex-wrap">
        <span className="font-medium">Rewarded Amount</span>
        <div className="flex flex-row gap-2 items-center text-lg font-semibold opacity-70">
          <span>{earnBalance}</span>
          <span>{token.symbol}</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between flex-wrap">
        <span className="font-medium">Total Staked Amount</span>
        <div className="flex flex-row gap-2 items-center text-lg font-semibold opacity-70">
          <span>{totalStakingAmount}</span>
          <span>{token.symbol}</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-around flex-wrap gap-2">
        <DialogOptionInStaking
          trigger={
            <Button className="lg:min-w-[100px] bg-cyan-600 rounded-xl text-xl">
              Stake
            </Button>
          }
          header={<></>}
          title={
            <>
              <Image
                width={50}
                height={50}
                src="/ethereum.png"
                alt={token.name || ""}
              />
              <span className="text-2xl">Stake {token.symbol}</span>
            </>
          }
          content={
            <>
              <div className="flex flex-col justify-center gap-5">
                <div className="flex flex-row items-center justify-between w-full">
                  <span className="text-purple-500 text-xl">Stake Amount</span>
                  <div className="flex flex-row gap-2 items-center">
                    <Image
                      width={50}
                      height={50}
                      src="/ethereum.png"
                      alt={token.name || ""}
                    />
                    <span className="font-bold text-xl">{token.symbol}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Input
                    className="bg-purple-100 h-20 text-right text-xl font-bold"
                    placeholder="0"
                    defaultValue={stakingAmount}
                    value={stakingAmount}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setStakingAmount(parseInt(event.currentTarget.value));
                      console.log(stakingAmount);
                    }}
                    type="number"
                  />
                  <span className="text-right opacity-70 text-sm">
                    Balance: {balance}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-right opacity-70 text-sm">
                    {stakingPercent}%
                  </span>
                  <Slider
                    defaultValue={[stakingPercent]}
                    max={100}
                    step={1}
                    value={[stakingPercent]}
                    onValueChange={(event) => {
                      setStakingPercent(event[0]);
                      console.log(stakingPercent);
                      const newAmount = (balance * stakingPercent) / 100;
                      setStakingAmount(newAmount);
                    }}
                  />
                </div>
                <div className="flex flex-row gap-2 items-center justify-between px-5">
                  <Button
                    className="min-h-8 w-auto"
                    onClick={() => {
                      setStakingPercent(25);
                    }}
                  >
                    25%
                  </Button>
                  <Button
                    className="min-h-8 w-auto"
                    onClick={() => {
                      setStakingPercent(50);
                    }}
                  >
                    50%
                  </Button>
                  <Button
                    className="min-h-8 w-auto"
                    onClick={() => {
                      setStakingPercent(75);
                    }}
                  >
                    75%
                  </Button>
                  <Button
                    className="min-h-8 w-auto"
                    onClick={() => {
                      setStakingPercent(100);
                    }}
                  >
                    Max
                  </Button>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <Checkbox
                  checked={stakingChecked}
                  onClick={() => {
                    setStakingChecked(!stakingChecked);
                  }}
                />
                <label>
                  By checking this box, i understand that my funds will be
                  custodied by Wizard Wealth Finance Protocol.
                </label>
              </div>
              <div className="flex items-center justify-center">
                <Button
                  className="min-w-[200px] min-h-[50px] text-xl"
                  disabled={
                    !stakingChecked || MIN_DEPOSIT_TOKEN > stakingAmount
                  }
                  onClick={() => {
                    console.log(
                      !stakingChecked && MIN_DEPOSIT_TOKEN > stakingAmount
                    );
                  }}
                >
                  {stakingAmount < MIN_DEPOSIT_TOKEN
                    ? `Minimum ${MIN_DEPOSIT_TOKEN} ${token.symbol}`
                    : "Stake"}
                </Button>
              </div>
              <div className="flex items-center justify-center">
                <Button className="min-w-[200px] h-[50px] text-xl">
                  {`Get more ${token ? token.symbol : ""}`}
                </Button>
              </div>
            </>
          }
        />
        <DialogOptionInStaking
          trigger={
            <Button className="lg:min-w-[100px] bg-cyan-600 rounded-xl text-xl shrink	">
              Withdrawn
            </Button>
          }
          header={<></>}
          title={
            <>
              <Image
                width={50}
                height={50}
                src="/ethereum.png"
                alt={token.name || ""}
              />
              <span className="text-2xl">Withdraw {token.symbol}</span>
            </>
          }
          content={
            <>
              <div className="flex flex-col justify-center gap-5">
                <div className="flex flex-row items-center justify-between w-full">
                  <span className="text-purple-500 text-xl">
                    Withdraw Amount
                  </span>
                  <div className="flex flex-row gap-2 items-center">
                    <Image
                      width={50}
                      height={50}
                      src="/ethereum.png"
                      alt={token.name || ""}
                    />
                    <span className="font-bold text-xl">{token.symbol}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Input
                    className="bg-purple-100 h-20 text-right text-xl font-bold"
                    placeholder="0"
                    defaultValue={withdrawAmount}
                    value={withdrawAmount}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setWithdrawAmount(parseInt(event.currentTarget.value));
                    }}
                    type="number"
                  />
                  <span className="text-right opacity-70 text-sm">
                    Balance: {stakingBalance}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-right opacity-70 text-sm">
                    {withdrawPercent}%
                  </span>
                  <Slider
                    defaultValue={[withdrawPercent]}
                    max={100}
                    step={1}
                    value={[withdrawPercent]}
                    onValueChange={(event) => {
                      setWithdrawPercent(event[0]);
                      const newAmount =
                        (stakingBalance * withdrawPercent) / 100;
                      setWithdrawAmount(newAmount);
                    }}
                  />
                </div>
                <div className="flex flex-row gap-2 items-center justify-between px-5">
                  <Button
                    className="min-h-8 w-auto"
                    onClick={() => {
                      setWithdrawPercent(25);
                    }}
                  >
                    25%
                  </Button>
                  <Button
                    className="min-h-8 w-auto"
                    onClick={() => {
                      setWithdrawPercent(50);
                    }}
                  >
                    50%
                  </Button>
                  <Button
                    className="min-h-8 w-auto"
                    onClick={() => {
                      setWithdrawPercent(75);
                    }}
                  >
                    75%
                  </Button>
                  <Button
                    className="min-h-8 w-auto"
                    onClick={() => {
                      setWithdrawPercent(100);
                    }}
                  >
                    Max
                  </Button>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <Checkbox
                  checked={withdrawChecked}
                  onClick={() => {
                    setWithdrawChecked(!withdrawChecked);
                  }}
                />
                <label>
                  By checking this box, i understand that my funds will be
                  custodied by Wizard Wealth Finance Protocol.
                </label>
              </div>
              <div className="flex items-center justify-center">
                <Button
                  className="min-w-[200px] min-h-[50px] text-xl"
                  disabled={
                    !withdrawChecked || MIN_WITHDRAW_TOKEN > withdrawAmount
                  }
                  onClick={() => {
                    console.log(
                      !withdrawChecked && MIN_WITHDRAW_TOKEN > withdrawAmount
                    );
                  }}
                >
                  {withdrawAmount < MIN_WITHDRAW_TOKEN
                    ? `Minimum ${MIN_WITHDRAW_TOKEN} ${token.symbol}`
                    : "Withdraw"}
                </Button>
              </div>
            </>
          }
        />
        <DialogOptionInStaking
          trigger={
            <Button className="lg:min-w-[100px] bg-cyan-600 rounded-xl text-xl">
              Earn
            </Button>
          }
          header={<></>}
          title={
            <>
              <Image
                width={50}
                height={50}
                src="/ethereum.png"
                alt={token.name || ""}
              />
              <span className="text-2xl">Earn {token.symbol}</span>
            </>
          }
          content={
            <>
              <div className="flex flex-col justify-center gap-5">
                <div className="flex flex-row items-center justify-between w-full">
                  <span className="text-purple-500 text-xl">Earn Amount</span>
                  <div className="flex flex-row gap-2 items-center">
                    <Image
                      width={50}
                      height={50}
                      src="/ethereum.png"
                      alt={token.name || ""}
                    />
                    <span className="font-bold text-xl">{token.symbol}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Input
                    className="bg-purple-100 h-20 text-right text-xl font-bold"
                    placeholder="0"
                    defaultValue={earnAmount}
                    value={earnAmount}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setEarnAmount(parseInt(event.currentTarget.value));
                    }}
                    type="number"
                  />
                  <span className="text-right opacity-70 text-sm">
                    Balance: {earnBalance}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-right opacity-70 text-sm">
                    {earnPercent}%
                  </span>
                  <Slider
                    defaultValue={[earnPercent]}
                    max={100}
                    step={1}
                    value={[earnPercent]}
                    onValueChange={(event) => {
                      setEarnPercent(event[0]);
                      console.log(earnPercent);
                      const newAmount = (earnBalance * earnPercent) / 100;
                      setEarnAmount(newAmount);
                    }}
                  />
                </div>
                <div className="flex flex-row gap-2 items-center justify-between px-5">
                  <Button
                    className="min-h-8 w-auto"
                    onClick={() => {
                      setEarnPercent(25);
                    }}
                  >
                    25%
                  </Button>
                  <Button
                    className="min-h-8 w-auto"
                    onClick={() => {
                      setEarnPercent(50);
                    }}
                  >
                    50%
                  </Button>
                  <Button
                    className="min-h-8 w-auto"
                    onClick={() => {
                      setEarnPercent(75);
                    }}
                  >
                    75%
                  </Button>
                  <Button
                    className="min-h-8 w-auto"
                    onClick={() => {
                      setEarnPercent(100);
                    }}
                  >
                    Max
                  </Button>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <Checkbox
                  checked={earnChecked}
                  onClick={() => {
                    setEarnChecked(!earnChecked);
                  }}
                />
                <label>
                  By checking this box, i understand that my funds will be
                  custodied by Wizard Wealth Finance Protocol.
                </label>
              </div>
              <div className="flex items-center justify-center">
                <Button
                  className="min-w-[200px] min-h-[50px] text-xl"
                  disabled={!earnChecked || MIN_EARN_TOKEN > earnAmount}
                  onClick={() => {
                    console.log(!earnChecked && MIN_EARN_TOKEN > earnAmount);
                  }}
                >
                  {earnAmount < MIN_EARN_TOKEN
                    ? `Minimum ${MIN_EARN_TOKEN} ${token.symbol}`
                    : "Earn"}
                </Button>
              </div>
              <div className="flex items-center justify-center">
                <Button className="min-w-[200px] h-[50px] text-xl">
                  {`Get more ${token ? token.symbol : ""}`}
                </Button>
              </div>
            </>
          }
        />
      </div>
    </Card>
  );
};

export default CardStaking;
