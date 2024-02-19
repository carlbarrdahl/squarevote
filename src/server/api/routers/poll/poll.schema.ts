import { z } from "zod";

export const ZOptionSchema = z.object({
  name: z.string().min(2),
});
export const ZPollCreateInputSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
  description: z.string().nullish(),
  voiceCredits: z.number().default(25),
  options: z.array(ZOptionSchema),
});

export type TPollCreateInputSchema = z.infer<typeof ZPollCreateInputSchema>;
export type TOption = z.infer<typeof ZOptionSchema>;
