import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export interface ResetPasswordOutput {
  success: boolean;
}
