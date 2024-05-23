"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import SwapSection from "./swap/swapSection";
import ArrowWrapper from "./swap/arrowWrapper";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { GearIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import ExecutingButton from "./executingButton";
import SendSection from "./send/sendSection";
import AddressSection from "./send/addressSection";

// Hooks
import useSwapToken from "@/hooks/swap/useSwapToken";
// Utils
import { defaultTokens } from "@/utils/tokens";
// Models
import { TokenModel } from "@/models/Token.Models";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Switch } from "../ui/switch";
import useAmountSwapToken from "@/hooks/swap/useAmountSwapToken";
import useSendToken from "@/hooks/swap/useSendToken";
import { useChainId, useReadContract } from "wagmi";
import { getSwapAbi } from "@/contracts/utils/getAbis";
import {
  getFactoryAddress,
  getSwapAddress,
} from "@/contracts/utils/getAddress";

type Reserves = [BigInt, BigInt];

const SwapWrapper = () => {
  const defaultToken: TokenModel = defaultTokens[0];
  const defaultAmount: number | undefined = undefined;
  const defaultSlippage = 1;
  const maxSlippage = 50;
  const minSlippage = 1;
  const defaultDeadline = 10;
  const minDeadline = 1;
  const maxDeadline = 4320; // 72 hours = 3 days

  const chain = useChainId();
  const { token: inToken, handleSwapTokenChange: handleSetInToken } =
    useSwapToken({ defaultToken: defaultToken });
  const { token: outToken, handleSwapTokenChange: handleSetOutToken } =
    useSwapToken({ defaultToken: undefined });
  const {
    amount: amountInToken,
    handleAmountChange: handleSetInTokenAmountChange,
  } = useAmountSwapToken({ defaultAmount });
  const {
    data: reserve,
    error: reserveError,
    isPending: reserveIsPending,
  } = useReadContract({
    abi: getSwapAbi(),
    address: getSwapAddress(chain),
    functionName: "getReserves",
    args: [getFactoryAddress(chain), inToken?.address, outToken?.address],
    query: {
      notifyOnChangeProps: ["data", "error"],
    },
  });
  const [reserve1, reserve2] = !reserveError
    ? (reserve as Reserves) || [0, 0]
    : [0, 0];
  const {
    data: amountOutToken,
    error: amountOutError,
    isPending: amountOutIsPending,
  } = useReadContract({
    abi: getSwapAbi(),
    address: getSwapAddress(chain),
    functionName: "getAmountOut",
    args: [
      ethers.parseEther(amountInToken ? amountInToken.toString() : "0"),
      reserve1,
      reserve2,
    ],
    query: {
      notifyOnChangeProps: ["data", "error"],
    },
  });
  const [isSwap, setIsSwap] = useState<boolean>(true);

  // Swap Section

  const [slippage, setSlippage] = useState<number>(defaultSlippage);
  const [isAutoSlippage, setIsAutoSlippage] = useState<boolean | undefined>(
    true
  );
  const [deadline, setDeadline] = useState<number>(10);

  // Send Section
  const { token: sendToken, handleSendTokenChange: handleSendToken } =
    useSendToken({ defaultToken: defaultTokens[0] });
  const [address, setAddress] = useState<`0x${string}` | undefined>(undefined);
  const [sendAmount, setSendAmount] = useState<number>(0);

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(true);

  const handleChangeTab = (isSwap: boolean) => {
    setIsSwap(isSwap);
  };

  const handleSwapInTokenAmountChange = (amount: number) => {
    handleSetInTokenAmountChange(amount);
  };

  const handleSwapInTokenChange = (newToken: TokenModel | undefined) => {
    if (newToken == outToken) {
      handleSwapTokenPosition();
    } else {
      handleSetInToken(newToken);
    }
  };
  const handleSwapOutTokenChange = (newToken: TokenModel | undefined) => {
    if (newToken == inToken) {
      handleSwapTokenPosition();
    } else {
      handleSetOutToken(newToken);
    }
  };

  const handlePopoverToggle = (isOpen: boolean) => {
    setIsPopoverOpen(isOpen);
  };

  const handleSwapTokenPosition = () => {
    const tempToken = inToken;
    handleSetInToken(outToken);
    handleSetOutToken(tempToken);
    // handleSetInTokenAmountChange(amountOutToken);
  };

  const handleChangeSlippageMode = () => {
    setIsAutoSlippage(!isAutoSlippage);
    if (!isAutoSlippage && slippage != defaultSlippage) {
      setSlippage(defaultSlippage);
    }
  };

  const handleChangeAddress = (newAddress: `0x${string}` | undefined) => {
    setAddress(newAddress);
  };

  const handleChangeSendAmount = (amount: number) => {
    setSendAmount(amount);
  };

  const handleChangeSendToken = (newToken: TokenModel | undefined) => {
    handleSendToken(newToken);
  };

  return (
    <main className="flex flex-col w-[500px] h-auto relative">
      <Tabs
        defaultValue="swap"
        className="w-full border-none outline-none"
        activationMode="manual"
      >
        <div className="flex flex-row justify-between items-center align-center gap-10 ">
          <TabsList className="grid w-7/12 grid-cols-2 opacity-90 h-[50px]">
            <TabsTrigger
              className="font-bold h-full"
              value="swap"
              onClick={() => {
                handleChangeTab(true);
                handlePopoverToggle(true);
              }}
            >
              Swap
            </TabsTrigger>
            <TabsTrigger
              className="font-bold h-full"
              value="send"
              onClick={() => {
                handleChangeTab(false);
                handlePopoverToggle(false);
              }}
            >
              Send
            </TabsTrigger>
          </TabsList>
          {isPopoverOpen && (
            <Popover>
              <PopoverTrigger asChild>
                <Button className="flex flex-row space-x-2">
                  {!isAutoSlippage && <span>{`${slippage}% slippage`}</span>}
                  <GearIcon className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row justify-center items-center gap-2 opacity-70">
                          <span>Max Slippage</span>
                          <QuestionMarkCircledIcon width={20} height={20} />
                        </div>
                        <div className="flex flex-row justify-between items-center">
                          <div className="">{`${slippage}%`}</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-row justify-between items-center m-2">
                        <div className="flex flex-row items-center space-x-2 w-full">
                          <Switch
                            checked={isAutoSlippage}
                            id="slippage-mode"
                            onCheckedChange={handleChangeSlippageMode}
                          />
                          <Label htmlFor="slippage-mode">
                            {isAutoSlippage ? "Auto" : "Custom"}
                          </Label>
                        </div>
                        <div className="w-full h-full flex flex-row justify-center items-center space-x-2">
                          <Input
                            className="text-right"
                            step={1}
                            type="number"
                            min={minSlippage}
                            max={maxSlippage}
                            placeholder={defaultSlippage.toString()}
                            value={isAutoSlippage ? "" : slippage}
                            onChange={(event) => {
                              const value = parseInt(event.currentTarget.value);
                              if (!value) return;
                              if (value > maxSlippage) {
                                setSlippage(maxSlippage);
                              } else if (value < minSlippage) {
                                setSlippage(minSlippage);
                              } else {
                                setSlippage(value);
                              }
                              if (isAutoSlippage) {
                                setIsAutoSlippage(!isAutoSlippage);
                              }
                            }}
                          />
                          <span className="text-xl">%</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row justify-center items-center gap-2 opacity-70">
                          <span>Transaction Deadline</span>
                          <QuestionMarkCircledIcon width={20} height={20} />
                        </div>
                        <div className="flex flex-row justify-between items-center">
                          <div className="">{`${deadline}m`}</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className=" flex flex-row items-center space-x-2 m-2">
                        <Input
                          className="text-right"
                          step={1}
                          placeholder={defaultDeadline.toString()}
                          min={minDeadline}
                          max={maxDeadline}
                          value={deadline}
                          onChange={(event) => {
                            const value = parseInt(event.currentTarget.value);
                            if (!value) return;
                            if (value > maxDeadline) {
                              setDeadline(maxDeadline);
                            } else if (value < minDeadline) {
                              setDeadline(minDeadline);
                            } else {
                              setDeadline(value);
                            }
                          }}
                        />
                        <span>minutes</span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <TabsContent value="swap">
          <div className="flex flex-col">
            <SwapSection
              isInToken={true}
              onChangeAmount={(amountIn) => {
                handleSwapInTokenAmountChange(amountIn);
              }}
              onChangeToken={(newToken) => handleSwapInTokenChange(newToken)}
              token={inToken}
              amount={amountInToken}
            />
            <ArrowWrapper onClick={handleSwapTokenPosition} />
            <SwapSection
              isInToken={false}
              onChangeToken={(newToken) => handleSwapOutTokenChange(newToken)}
              token={outToken}
              amount={
                ((!amountOutError
                  ? amountOutToken
                    ? parseFloat(ethers.formatEther(amountOutToken.toString()))
                    : 0
                  : 0) *
                  (100 - slippage)) /
                100
              }
              isPending={amountOutIsPending || reserveIsPending}
              error={amountOutError && (amountOutError as any)}
            />
          </div>
        </TabsContent>
        <TabsContent value="send">
          <div className="flex flex-col gap-1">
            <SendSection
              sendToken={sendToken}
              onChangeSendToken={handleChangeSendToken}
              sendAmount={sendAmount}
              onChangeAmount={handleChangeSendAmount}
            />
            <AddressSection
              address={address}
              onChangeAddress={handleChangeAddress}
            />
          </div>
        </TabsContent>
      </Tabs>
      <ExecutingButton
        className="xl-h-auto md-h-[100px] h-[65px] text-xl"
        isSwap={isSwap}
        onClickHandler={() => {}}
        amountInToken={amountInToken}
        amountOutToken={amountOutToken}
        deadline={deadline}
        inToken={inToken}
        outToken={outToken}
        sendToken={sendToken}
        sendAmount={sendAmount}
        address={address}
        swapError={amountOutError as any}
        isSwapPending={amountOutIsPending || reserveIsPending}
        slippage={slippage}
      />
    </main>
  );
};

export default SwapWrapper;
