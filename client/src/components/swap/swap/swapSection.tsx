import React, { useEffect, useState } from "react";

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
import { tokens } from "@/utils/tokens";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { TokenModel } from "@/models/Token.Models";

interface SwapSectionProps {
  amount?: number | undefined;
  isInToken: boolean;
  onChangeAmount: (amount: number | 0) => void;
  onChangeToken: (newToken: TokenModel | undefined) => void;
  token: TokenModel | undefined;
}

const SwapSection: React.FC<SwapSectionProps> = ({
  amount,
  isInToken,
  onChangeAmount,
  onChangeToken,
  token,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOnTokenInDialog = (newToken: TokenModel | undefined) => {
    setOpenDialog(false);
    onChangeToken(newToken);
  };

  const handleAmountChange = (amount: number) => {
    onChangeAmount(amount);
  };

  return (
    <div className="flex flex-col justify-center gap-3 bg-fuchsia-100 bg-opacity-60 rounded-md h-[150px] p-5">
      <Label className="text-lg">{isInToken ? "You pay" : "You receive"}</Label>
      <div className="flex flex-row justify-between">
        <Input
          className="border-none bg-transparent p-0 outline-none text-2xl focus-visible:ring-0 focus-visible:ring-offset-0 -webkit-appearance-none"
          type="number"
          inputMode="decimal"
          placeholder="0"
          value={amount ? amount : undefined}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleAmountChange(parseInt(event.currentTarget.value));
          }}
          readOnly={!isInToken}
        />
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex flex-row gap-2 items-center text-xl font-bold px-2"
            >
              {token && (
                <div className="w-[30px] h-[30px]">
                  <Image
                    width={30}
                    height={30}
                    src="/ethereum.png"
                    alt={token.symbol}
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
              <Search type="text" placeholder="Search name or paste address" />
              {/* Default Token */}
              <div className="grid grid-cols-3 gap-2 ">
                {tokens.map((token, index) => {
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
                        alt={token.symbol}
                      />
                      <span>{token.symbol}</span>
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
                  {tokens.map((token, index) => (
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
                        alt={token.symbol}
                      />
                      <div className="flex flex-col justify-center ">
                        <span className="font-bold">{token.symbol}</span>
                        <span className="opacity-60">{token.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SwapSection;
