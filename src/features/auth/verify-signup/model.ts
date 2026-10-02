import type { z } from "zod";
import type { verifySignUpSchema } from "./schema";

export type VerifySignUpInput = z.infer<typeof verifySignUpSchema>;

export interface VerifySignUpOutput {
  success: boolean;
}

export interface CompleteRegistrationInput {
  code: string;
  flowId: bigint;
}
