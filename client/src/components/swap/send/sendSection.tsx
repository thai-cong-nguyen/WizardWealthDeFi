import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";

// Components
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CaretDownIcon } from "@radix-ui/react-icons";

import { tokens } from "@/utils/tokens";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "@/components/ui/search";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TokenModel } from "@/models/Token.Models";

interface SendSectionProps {
  sendToken: TokenModel | undefined;
  onChangeSendToken: (newToken: TokenModel | undefined) => void;
  sendAmount: number;
  onChangeAmount: (amount: number) => void;
}

const SendSection: React.FC<SendSectionProps> = ({
  sendToken,
  onChangeSendToken,
  sendAmount,
  onChangeAmount,
}) => {
  // let sendToken = useSendToken();
  // const [token, setToken] = useState<TokenModel>(tokens[0]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOnTokenInDialog = (newToken: TokenModel) => {
    setOpenDialog(false);
    onChangeSendToken(newToken);
  };

  const handleChangeAmount = (amount: number) => {
    onChangeAmount(amount);
  };

  return (
    <div className="flex flex-col justify-normal bg-fuchsia-100 bg-opacity-60 rounded-md h-auto">
      <span className="p-5 text-xl font-bold">You're sending</span>
      <div className="flex flex-row items-end justify-center p-5">
        <Input
          className="bg-transparent outline-none border-none text-3xl text-center	focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="0"
          inputMode="decimal"
          type="number"
          value={sendAmount ? sendAmount : undefined}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeAmount(parseInt(event.currentTarget.value));
          }}
        />
      </div>
      <Separator className="bg-current" />
      <div className="flex flex-row justify-between items-center py-3">
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex flex-row justify-between items-center gap-2 bg-opacity-90 text-lg w-full bg-transparent hover:bg-transparent hover:opacity-40 text-black border-none"
            >
              <div className="flex flex-row gap-2 items-center text-lg">
                <Image
                  width={45}
                  height={45}
                  src="/ethereum.png"
                  alt={sendToken ? sendToken.symbol : ""}
                />
                <span>{sendToken ? sendToken.symbol : ""}</span>
              </div>
              <CaretDownIcon width={30} height={30} />
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
                    <>
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
                    </>
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

export default SendSection;
