import type { z } from "zod";
import type { twoFactorAppSchema } from "./schema";

export type TwoFactorAppInput = z.infer<typeof twoFactorAppSchema>;

export interface TwoFactorAppOutput {
  success: boolean;
}
