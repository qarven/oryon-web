import { z } from "zod";
import type { MfaFactorTypeType } from "./enum";

export const signInSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Please enter your password"),
});

export type SignInInput = z.infer<typeof signInSchema>;

export interface SignInOutput {
  availableMfaMethods?: MfaFactorTypeType[];
  mfaRequired: boolean;
}
