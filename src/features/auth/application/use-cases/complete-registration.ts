import { clearEmailCookie } from "../../infrastructure/cookies/email";
import {
  clearFlowCookie,
  getFlowCookie,
} from "../../infrastructure/cookies/flow";
import type { AuthenticationService } from "../ports/authentication-service";

export interface CompleteRegistrationInput {
  code: string;
}

export interface CompleteRegistrationUseCase {
  exec: (input: CompleteRegistrationInput) => Promise<void>;
}

export class CompleteRegistration implements CompleteRegistrationUseCase {
  private readonly authService: AuthenticationService;

  constructor(authService: AuthenticationService) {
    this.authService = authService;
  }

  async exec(input: CompleteRegistrationInput): Promise<void> {
    const flow = getFlowCookie();
    if (!flow) {
      throw new Error("Verification session expired. Please sign up again.");
    }

    await this.authService.completeRegistration({
      code: input.code,
      flowId: BigInt(flow.id),
    });

    clearFlowCookie();
    clearEmailCookie();
  }
}
