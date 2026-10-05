import type { Flow } from "../../domain/flow";
import type { MfaFactorType } from "../../domain/mfa-factor-type";
import type { Token } from "../../domain/token";
import type { User } from "../../domain/user";
import type { VerificationChallenge } from "../../domain/verification-challenge";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResult {
  availableMfaMethods?: MfaFactorType[];
  flow?: Flow;
  token?: Token;
  user?: User;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface CompleteLoginMfaRequest {
  code: string;
  flowId: bigint;
  factorType: MfaFactorType;
}

export interface RegistrationRequest {
  name: string;
  email?: string;
  password: string;
}

export interface CompleteRegistrationRequest {
  code: string;
  flowId: bigint;
}

export interface ResendRegistrationCodeRequest {
  flowId: bigint;
}

export interface InitiatePasswordResetRequest {
  identifier: string;
}

export interface CompletePasswordResetRequest {
  code: string;
  newPassword: string;
  verificationId: bigint;
}

export interface AuthenticationService {
  login: (input: LoginRequest) => Promise<LoginResult>;
  refreshToken: (input: RefreshTokenRequest) => Promise<Token>;
  completeLoginMfa: (input: CompleteLoginMfaRequest) => Promise<Token>;

  registration: (input: RegistrationRequest) => Promise<Flow>;
  completeRegistration: (input: CompleteRegistrationRequest) => Promise<void>;
  resendRegistrationCode: (
    input: ResendRegistrationCodeRequest
  ) => Promise<Flow>;

  initiatePasswordReset: (
    input: InitiatePasswordResetRequest
  ) => Promise<VerificationChallenge>;
  completePasswordReset: (input: CompletePasswordResetRequest) => Promise<void>;
}
