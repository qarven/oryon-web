import type { z } from "zod";
import type { Flow } from "../shared/types/flow";
import type { MfaFactorType } from "../shared/types/mfa-factor-type";
import type { signInSchema } from "./schema";

export type SignInInput = z.infer<typeof signInSchema>;

export interface SignInOutput {
  availableMfaMethods?: MfaFactorType[];
  mfaRequired: boolean;
}

export interface Token {
  accessToken: string;
  expiresIn: bigint; // in seconds
  refreshToken: string;
}

export interface User {
  avatarUrl?: string;
  id: bigint;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginOutput {
  availableMfaMethods?: MfaFactorType[];
  flow?: Flow;
  token?: Token;
  user?: User;
}
