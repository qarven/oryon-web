import type { z } from "zod";
import type { signUpSchema } from "./schema";

export type SignUpInput = z.infer<typeof signUpSchema>;

export interface SignUpOutput {
  mfaRequired: boolean;
}
