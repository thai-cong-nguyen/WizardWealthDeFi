"use client";
import React from "react";
import { useRouter } from "next/navigation";

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

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProposalSchema } from "@/validators/createProposal";
import { ZodNull, z } from "zod";
import { useForm } from "react-hook-form";

type Input = z.infer<typeof createProposalSchema>;

const CreateProposal = () => {
  // const router = useRouter();
  const form = useForm<Input>({
    resolver: zodResolver(createProposalSchema),
    defaultValues: {
      type: "1",
      title: "",
      description: "",
      initialDeposited: undefined,
    },
  });

  function onSubmit(values: Input) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 px-28 m-10">
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormLabel className="text-2xl font-bold">New Proposal</FormLabel>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Type of Proposal" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Text Proposal", "New Gauge Proposal"].map(
                          (type, index) => {
                            return (
                              <SelectItem key={index} value={`${index + 1}`}>
                                {type}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Expecto Patronum" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="initialDeposited"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Initial Deposited</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Input placeholder="0.0" {...field} type="number" />
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center pl-3 text-muted-foreground disabled:text-muted-foreground">
                        WW
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateProposal;
