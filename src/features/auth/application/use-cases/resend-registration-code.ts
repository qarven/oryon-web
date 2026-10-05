import {
  getFlowCookie,
  setFlowCookie,
} from "../../infrastructure/cookies/flow";
import type { AuthenticationService } from "../ports/authentication-service";

export interface ResendRegistrationCodeUseCase {
  exec: () => Promise<void>;
}

export class ResendRegistrationCode implements ResendRegistrationCodeUseCase {
  private readonly authService: AuthenticationService;

  constructor(authService: AuthenticationService) {
    this.authService = authService;
  }

  async exec(): Promise<void> {
    const flow = getFlowCookie();
    if (!flow) {
      throw new Error("Verification session expired. Please sign up again.");
    }

    const newFlow = await this.authService.resendRegistrationCode({
      flowId: BigInt(flow.id),
    });

    setFlowCookie(newFlow);
  }
}
