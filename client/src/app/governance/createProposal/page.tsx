"use client";
import React, { useEffect, useState } from "react";

// Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProposalSchema } from "@/validators/createProposal";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";

import { useAccount, useChainId, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { governanceOptions } from "@/utils/governanceOptions";
import { getBoxTestAddress, getGovernorAddress } from "@/contracts/utils/getAddress";
import { ethers } from "ethers";
import { Interface } from "readline";
import { getGovernorAbi } from "@/contracts/utils/getAbis";
import LoadingTransactionHash from "@/components/LoadingTransactionHash";
import ConnectWallet from "@/components/wallet/ConnectWallet";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Input = z.infer<typeof createProposalSchema>;

const CreateProposal = () => {
  const router = useRouter();
  const chain = useChainId();
  const account = useAccount();

  const form = useForm<Input>({
    resolver: zodResolver(createProposalSchema),
    defaultValues: {
      target: governanceOptions(chain)[0].address,
      calldata: undefined,
      description: "",
      arguments: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "arguments",
  });
  const [functions, setFunctions] = useState<any[]>([]);
  const [selectedFunction, setSelectedFunction] = useState<any>(null);
  const [abi, setAbi] = useState<any>(null);
  const [loadingDialogIsOpen, setLoadingDialogIsOpen] = useState(false);

  const { data: hash, isPending, isError, writeContract } = useWriteContract();

  const { isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isReverted } = useWaitForTransactionReceipt({ confirmations: 2, hash })

  useEffect(() => {
    const selectedTarget = form.watch("target");
    const targetOptions = governanceOptions(chain).find(
      (option) => option.address === selectedTarget
    );
    setFunctions(targetOptions ? targetOptions.functions : []);
    setAbi(targetOptions ? targetOptions.abi : null);
  }, [form.watch("target"), chain]);

  useEffect(() => {
    const selectedCalldata = form.watch("calldata");
    const functionData = functions.find((func) => func.signature === selectedCalldata);
    setSelectedFunction(functionData || null);
    form.setValue("arguments", []);
  }, [form.watch("calldata"), functions]);

  useEffect(() => {
    if (selectedFunction) {
      const inputs = selectedFunction.inputs || [];
      form.setValue("arguments", inputs.map((input: any) => ({ name: input.name, value: "" })));
    }
  }, [selectedFunction]);

  function onSubmit(values: Input) {
    setLoadingDialogIsOpen(true);
    const encodedFunction = new ethers.Interface(abi).encodeFunctionData(selectedFunction.signature, values?.arguments?.map((arg) => arg.value, []));

    writeContract({
      abi: getGovernorAbi(),
      address: getGovernorAddress(chain),
      functionName: "propose",
      args: [
        [values.target],
        [0],
        [encodedFunction],
        values.description,
      ]
    });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 py-10 px-60 m-10">
      <div className="w-full flex flex-row justify-between gap-5">
        <div
          className="flex flex-row gap-2 cursor-pointer justify-center items-center"
          onClick={() => router.back()}
        >
          <ArrowBigLeft />
          <span>Governance</span>
        </div>
      </div>
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormLabel className="text-3xl font-bold">New Proposal</FormLabel>
            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Target</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Target of Proposal" />
                      </SelectTrigger>
                      <SelectContent>
                        {governanceOptions(chain).map((data, index) => (
                          <SelectItem key={index} value={data.address}>
                            {data.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="calldata"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Calldata</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Executing Function" />
                      </SelectTrigger>
                      <SelectContent>
                        {functions.map((data, index) => (
                          <SelectItem key={index} value={data.signature}>
                            {data.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    The calldata is the data that will be sent to the target
                    contract. Make sure this is correct.
                  </FormDescription>
                </FormItem>
              )}
            />
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`arguments.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">{fields[index].name}</FormLabel>
                    <FormControl>
                      <Input placeholder={`Enter value for ${fields[index].name}`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tell us about your proposal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-5 justify-center items-center w-full ">
              {account.isConnected ? <Button type="submit" className="text-xl">Submit</Button> :
                <><Image
                  width={100}
                  height={100}
                  src="/Logo.jpg"
                  alt="Logo"
                  className="rounded-xl"
                />
                  <span className="text-xl font-bold">Please connect your wallet</span>
                  <span className="font-medium text-lg opacity-70">
                    {`Please connect your wallet to create a proposal in Wizard Wealth's governance.`}
                  </span>
                  <ConnectWallet /></>}
            </div>
            <Dialog open={loadingDialogIsOpen} onOpenChange={setLoadingDialogIsOpen}>
              <DialogContent>
                <DialogHeader>Transaction Detail: </DialogHeader>
                {
                  (isPending || isError || isConfirming || isConfirmed || isReverted) && <LoadingTransactionHash type="Creating a Proposal" isConfirmed={isConfirmed} isReverted={isReverted} isError={isError} hash={hash} className="flex flex-col gap-1 justify-center items-center" />
                }
              </DialogContent>
            </Dialog>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateProposal;