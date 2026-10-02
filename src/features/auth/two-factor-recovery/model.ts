import type { z } from "zod";
import type { twoFactorRecoverySchema } from "./schema";

export type TwoFactorRecoveryInput = z.infer<typeof twoFactorRecoverySchema>;

export interface TwoFactorRecoveryOutput {
  success: boolean;
}
