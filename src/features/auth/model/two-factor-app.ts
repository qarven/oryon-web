import { z } from "zod";

export const twoFactorAppSchema = z.object({
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter the 6-digit code from your authenticator app"),
});

export type TwoFactorAppInput = z.infer<typeof twoFactorAppSchema>;

export interface TwoFactorAppOutput {
  success: boolean;
}
