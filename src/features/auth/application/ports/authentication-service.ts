import type { Flow } from "../../domain/flow";
import type { MfaFactorType } from "../../domain/mfa-factor-type";
import type { Token } from "../../domain/token";
import type { User } from "../../domain/user";

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
  flowId: string;
  factorType: MfaFactorType;
}

export interface BeginWebAuthnLoginRequest {
  flowId: string;
}

export interface BeginWebAuthnLoginResult {
  flow?: Flow;
  requestOptionsJson: string;
}

export interface CompleteWebAuthnLoginRequest {
  assertionResponseJson: string;
  flowId: string;
}

export interface RegistrationRequest {
  name: string;
  email?: string;
  password: string;
}

export interface CompleteRegistrationRequest {
  code: string;
  flowId: string;
}

export interface ResendRegistrationCodeRequest {
  flowId: string;
}

export interface InitiatePasswordResetRequest {
  identifier: string;
}

export interface CompletePasswordResetRequest {
  code: string;
  newPassword: string;
}

export interface AuthenticationService {
  login: (input: LoginRequest) => Promise<LoginResult>;
  refreshToken: (input: RefreshTokenRequest) => Promise<Token>;
  completeLoginMfa: (input: CompleteLoginMfaRequest) => Promise<Token>;
  beginWebAuthnLogin: (
    input: BeginWebAuthnLoginRequest
  ) => Promise<BeginWebAuthnLoginResult>;
  completeWebAuthnLogin: (
    input: CompleteWebAuthnLoginRequest
  ) => Promise<Token>;

  registration: (input: RegistrationRequest) => Promise<Flow>;
  completeRegistration: (input: CompleteRegistrationRequest) => Promise<void>;
  resendRegistrationCode: (
    input: ResendRegistrationCodeRequest
  ) => Promise<Flow>;

  initiatePasswordReset: (input: InitiatePasswordResetRequest) => Promise<void>;
  completePasswordReset: (input: CompletePasswordResetRequest) => Promise<void>;
}
