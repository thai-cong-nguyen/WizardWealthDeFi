import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
// Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { defaultTokens } from "@/utils/tokens";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { TokenModel } from "@/models/Token.Models";
import { BaseError, useAccount, useBalance } from "wagmi";
import { ethers } from "ethers";
import { wagmiConfig } from "@/config/Wagmi.config";

interface SwapSectionProps {
  amount?: number | undefined;
  isInToken: boolean;
  onChangeAmount?: (amount: number | 0) => void;
  onChangeToken: (newToken: TokenModel | undefined) => void;
  token: TokenModel | undefined;
  isPending?: boolean;
  error?: BaseError | null;
}

const SwapSection: React.FC<SwapSectionProps> = ({
  amount,
  isInToken,
  onChangeAmount,
  onChangeToken,
  token,
  isPending,
  error,
}) => {
  const account = useAccount({
    config: wagmiConfig,
  });
  const balance = useBalance({
    address: account.address,
    token: token?.native ? undefined : token?.address,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tokens, setTokens] = useState<TokenModel[]>([]);

  const handleClickOnTokenInDialog = (newToken: TokenModel | undefined) => {
    setOpenDialog(false);
    onChangeToken(newToken);
  };

  const handleAmountChange = (amount: number) => {
    if (onChangeAmount) {
      onChangeAmount(amount);
    }
  };

  useEffect(() => {
    axios({
      method: "post",
      url: "https://wizardwealthdefi.onrender.com/api/token/contract",
      headers: { "Content-Type": "application/json" },
      data: { contractAddress: searchQuery, chainId: "0xaa36a7" },
    }).then(({ data }) => {
      setTokens(data.data);
    });
  }, [searchQuery]);

  // Debounce
  // const handleInputOnChange = (event: any) => {
  //   const { value } = event.target;
  // };

  return (
    <div className="flex flex-col justify-center gap-3 bg-fuchsia-100 bg-opacity-60 rounded-md h-[150px] p-5">
      <Label className="text-lg">{isInToken ? "You pay" : "You receive"}</Label>
      <div className="flex flex-row justify-between">
        <Input
          className={`border-none bg-transparent p-0 outline-none text-2xl focus-visible:ring-0 focus-visible:ring-offset-0 -webkit-appearance-none  ${isPending && !isInToken ? "opacity-60" : ""
            }`}
          type="number"
          inputMode="decimal"
          placeholder="0"
          value={error ? 0 : amount ? amount : undefined}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (isInToken) {
              if (event.currentTarget.value) {
                handleAmountChange(parseFloat(event.currentTarget.value));
                return;
              }
              handleAmountChange(parseFloat("0"));
            }
          }}
          readOnly={!isInToken}
        />
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex flex-row gap-2 items-center text-xl font-bold px-2"
              onClick={() => {
                setSearchQuery("");
                setTokens([]);
              }}
            >
              {token && (
                <div className="w-[30px] h-[30px]">
                  <Image
                    width={30}
                    height={30}
                    src="/ethereum.png"
                    alt={token.symbol ? token?.symbol : ""}
                  />
                </div>
              )}
              <span className="text-lg">
                {token ? token.symbol : "Select token"}
              </span>
              <div className="flex justify-center items-centers">
                <CaretDownIcon width={30} height={30} />
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Select a Token</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-5">
              {/* Search tokens */}
              <Search
                type="text"
                placeholder="Search name or paste address"
                onChange={(event: any) => {
                  if (!event.currentTarget.value) {
                    setSearchQuery("");
                    setTokens([]);
                  }
                  setSearchQuery(event.currentTarget.value);
                }}
              />
              {/* Default Token */}
              <div className="grid grid-cols-3 gap-2 ">
                {defaultTokens.map((token, index) => {
                  return (
                    <Button
                      key={index}
                      className="flex flex-row justify-normal items-center gap-2 rounded-full bg-opacity-90 text-lg"
                      onClick={() => {
                        handleClickOnTokenInDialog(token);
                      }}
                    >
                      <Image
                        width={30}
                        height={30}
                        src="/ethereum.png"
                        alt={token.symbol ? token?.symbol : ""}
                      />
                      <span>{token?.symbol}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
            <Separator className="my-2" />
            {/* Popular Token */}
            <div className="flex flex-col">
              <ScrollArea>
                <div className="flex flex-col gap-2">
                  <h4>Popular tokens</h4>
                  {searchQuery != "" ? (
                    !tokens.length ? (
                      <div>No exist token.</div>
                    ) : (
                      tokens.map((token, index) => (
                        <div
                          key={index}
                          className="flex flex-row gap-3 items-center hover:bg-slate-100 cursor-pointer"
                          onClick={() => {
                            handleClickOnTokenInDialog(token);
                          }}
                        >
                          <Image
                            width={40}
                            height={40}
                            src="/ethereum.png"
                            alt={token.symbol ? token?.symbol : ""}
                          />
                          <div className="flex flex-col justify-center ">
                            <span className="font-bold">{token?.symbol}</span>
                            <span className="opacity-60">{token?.name}</span>
                          </div>
                        </div>
                      ))
                    )
                  ) : (
                    defaultTokens.map((token, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-row gap-3 items-center hover:bg-slate-100 cursor-pointer"
                          onClick={() => {
                            handleClickOnTokenInDialog(token);
                          }}
                        >
                          <Image
                            width={40}
                            height={40}
                            src="/ethereum.png"
                            alt={token.symbol ? token?.symbol : ""}
                          />
                          <div className="flex flex-col justify-center ">
                            <span className="font-bold">{token?.symbol}</span>
                            <span className="opacity-60">{token?.name}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </ScrollArea>
            </div>
            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-row items-center justify-end">
        <div className="flex flex-row items-center justify-end gap-1 font-bold text-sm ">
          <span>Balance:</span>
          <span className="opacity-70">{`${parseFloat(
            ethers.formatEther(
              (balance.data && token ? balance.data.value : 0).toString()
            )
          ).toFixed(5)}`}</span>
        </div>
      </div>
    </div>
  );
};

export default SwapSection;
