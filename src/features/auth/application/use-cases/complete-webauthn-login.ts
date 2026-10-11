import {
  clearFlowCookie,
  getFlowCookie,
} from "../../infrastructure/cookies/flow";
import { setSessionCookies } from "../../infrastructure/cookies/session";
import type { AuthenticationService } from "../ports/authentication-service";

export interface CompleteWebAuthnLoginInput {
  assertionResponseJson: string;
}

export interface CompleteWebAuthnLoginUseCase {
  exec: (input: CompleteWebAuthnLoginInput) => Promise<void>;
}

export class CompleteWebAuthnLogin implements CompleteWebAuthnLoginUseCase {
  private readonly authService: AuthenticationService;

  constructor(authService: AuthenticationService) {
    this.authService = authService;
  }

  async exec(input: CompleteWebAuthnLoginInput): Promise<void> {
    const flow = getFlowCookie();
    if (!flow) {
      throw new Error("Verification session expired. Please sign in again.");
    }

    const output = await this.authService.completeWebAuthnLogin({
      assertionResponseJson: input.assertionResponseJson,
      flowId: flow.id,
    });

    setSessionCookies(output);
    clearFlowCookie();
  }
}
