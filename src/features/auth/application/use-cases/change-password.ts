import { clearEmailCookie } from "../../infrastructure/cookies/email";
import {
  clearVerificationCookie,
  getVerificationCookie,
} from "../../infrastructure/cookies/verification";
import type { AuthenticationService } from "../ports/authentication-service";

export interface ChangePasswordInput {
  newPassword: string;
}

export interface ChangePasswordUseCase {
  exec: (input: ChangePasswordInput) => Promise<void>;
}

export class ChangePassword implements ChangePasswordUseCase {
  private readonly authService: AuthenticationService;

  constructor(authService: AuthenticationService) {
    this.authService = authService;
  }

  async exec(input: ChangePasswordInput): Promise<void> {
    const verification = getVerificationCookie();
    if (!verification?.code) {
      throw new Error(
        "Verification session expired. Please request a new code."
      );
    }

    await this.authService.completePasswordReset({
      code: verification.code,
      newPassword: input.newPassword,
      verificationId: BigInt(verification.id),
    });

    clearVerificationCookie();
    clearEmailCookie();
  }
}
