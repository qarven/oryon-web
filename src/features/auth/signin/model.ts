import type { z } from "zod";
import type { MfaFactorType } from "../shared/types/mfa-factor-type";
import type { signInSchema } from "./schema";

export type SignInInput = z.infer<typeof signInSchema>;

export interface SignInOutput {
  availableMfaMethods?: MfaFactorType[];
  mfaRequired: boolean;
}
