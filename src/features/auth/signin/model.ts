import type { z } from "zod";
import type { FlowState } from "../shared/types/flow-state";
import type { FlowType } from "../shared/types/flow-type";
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

export interface Flow {
  expiresAt: Date;
  flowState: FlowState;
  flowType: FlowType;
  id: bigint;
}

export interface LoginData {
  availableMfaMethods?: MfaFactorType[];
  flow?: Flow;
  token?: Token;
  user?: User;
}
