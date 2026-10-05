import type { MfaFactorType } from "../../domain/mfa-factor-type";
import {
  clearFlowCookie,
  getFlowCookie,
} from "../../infrastructure/cookies/flow";
import { setSessionCookies } from "../../infrastructure/cookies/session";
import type { AuthenticationService } from "../ports/authentication-service";

export interface CompleteLoginMfaInput {
  code: string;
  factorType: MfaFactorType;
}

export interface CompleteLoginMfaUseCase {
  exec: (input: CompleteLoginMfaInput) => Promise<void>;
}

export class CompleteLoginMfa implements CompleteLoginMfaUseCase {
  private readonly authService: AuthenticationService;

  constructor(authService: AuthenticationService) {
    this.authService = authService;
  }

  async exec(input: CompleteLoginMfaInput): Promise<void> {
    const flow = getFlowCookie();
    if (!flow) {
      throw new Error("Verification session expired. Please sign in again.");
    }

    const output = await this.authService.completeLoginMfa({
      code: input.code,
      flowId: BigInt(flow.id),
      factorType: input.factorType,
    });

    setSessionCookies(output);
    clearFlowCookie();
  }
}
