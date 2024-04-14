import { z } from "zod";
export const createProposalSchema = z.object({
    type: z.string(),
    title: z.string().min(1, {
        message: "Required"
    }),
    description: z.string().min(1, {
        message: "Required"
    }),
    initialDeposited: z.preprocess((a) => parseFloat(z.string().parse(a)), z.coerce.number().positive("Initial Deposit is greater than 0").refine((val) => !Number.isNaN(val), {
        message: "Required"
      })),
});