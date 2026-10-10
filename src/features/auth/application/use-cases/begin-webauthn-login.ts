import {
  getFlowCookie,
  setFlowCookie,
} from "../../infrastructure/cookies/flow";
import type { AuthenticationService } from "../ports/authentication-service";

export interface BeginWebAuthnLoginUseCase {
  exec: () => Promise<{ requestOptionsJson: string }>;
}

export class BeginWebAuthnLogin implements BeginWebAuthnLoginUseCase {
  private readonly authService: AuthenticationService;

  constructor(authService: AuthenticationService) {
    this.authService = authService;
  }

  async exec(): Promise<{ requestOptionsJson: string }> {
    const flow = getFlowCookie();
    if (!flow) {
      throw new Error("Verification session expired. Please sign in again.");
    }

    const output = await this.authService.beginWebAuthnLogin({
      flowId: flow.id,
    });

    if (output.flow) {
      setFlowCookie(output.flow);
    }

    return { requestOptionsJson: output.requestOptionsJson };
  }
}
