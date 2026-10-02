import type { z } from "zod";
import type { changePasswordSchema } from "./schema";

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export interface ChangePasswordOutput {
  success: boolean;
}
