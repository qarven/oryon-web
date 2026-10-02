import type { z } from "zod";
import type { verifyResetSchema } from "./schema";

export type VerifyResetInput = z.infer<typeof verifyResetSchema>;

export interface VerifyResetOutput {
  success: boolean;
}
