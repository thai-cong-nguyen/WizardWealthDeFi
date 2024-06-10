import { z } from "zod";

const argumentSchema = z.object({
  name: z.string(),
  value: z.string().min(1, { message: "Required" }),
});

export const createProposalSchema = z.object({
  target: z.string().min(1, { message: "Required" }),
  calldata: z.string().min(1, { message: "Required" }),
  arguments: z.array(argumentSchema).optional(),
  description: z.string().min(1, { message: "Required" }),
});
