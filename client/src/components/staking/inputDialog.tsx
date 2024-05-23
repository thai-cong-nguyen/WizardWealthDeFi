import React, { useState } from "react";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Toast } from "../ui/toast";
import { toast } from "sonner";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

interface InputDialogProps {
  triggerContent: string;
  triggerDisabled: boolean;
  headerContent: string;
  titleContent: string;
  balanceContent: string;
  balance: any;
  approvalSubmit?: (...props: any[]) => void;
  buttonSubmit: (...props: any[]) => void;
  buttonContent: string;
}

const InputDialog = ({
  triggerContent,
  triggerDisabled,
  headerContent,
  titleContent,
  balanceContent,
  balance,
  buttonContent,
  approvalSubmit,
  buttonSubmit,
}: InputDialogProps) => {
  const [amount, setAmount] = useState("0");

  const {
    data: hash,
    isPending: isPending,
    writeContract: writeContract,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isReverted,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const submit = () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={triggerDisabled}>
          {triggerContent}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>{headerContent}</DialogHeader>
        <DialogTitle>{titleContent}</DialogTitle>
        <DialogDescription className="flex flex-col gap-1 justify-center">
          <Input
            placeholder="0"
            type="number"
            value={amount}
            onChange={(event) => {
              setAmount(event.currentTarget.value);
            }}
          />
          <span>{`${balanceContent}: ${balance}`}</span>
          <Button
            disabled={isPending}
            className="w-1/2 self-center mt-2"
            onClick={() => {
              toast("Transaction Detail:", {
                description: isConfirming
                  ? "Transaction is confirming..."
                  : isConfirmed
                  ? "Transaction is confirmed"
                  : isReverted
                  ? "Transaction is failed"
                  : "",
                action: {
                  label: "View",
                  onClick: () => {
                    console.log(
                      isPending,
                      isConfirming,
                      isConfirmed,
                      isReverted,
                      hash,
                      amount
                    );
                  },
                },
              });
            }}
          >
            {isPending ? "Confirming..." : buttonContent}
          </Button>
          {isConfirming &&
            toast("Transaction Detail:", {
              description: isConfirming
                ? "Transaction is confirming..."
                : isConfirmed
                ? "Transaction is confirmed"
                : isReverted
                ? "Transaction is failed"
                : "",
              action: {
                label: "View",
                onClick: () => {
                  console.log(
                    isPending,
                    isConfirming,
                    isConfirmed,
                    isReverted,
                    hash,
                    amount
                  );
                },
              },
            })}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default InputDialog;
