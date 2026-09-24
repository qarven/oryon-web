import type { z } from "zod";
import type { resetPasswordSchema } from "./schema";

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export interface ResetPasswordOutput {
  success: boolean;
}
