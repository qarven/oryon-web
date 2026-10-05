import { setEmailCookie } from "../../infrastructure/cookies/email";
import { setVerificationCookie } from "../../infrastructure/cookies/verification";
import type { AuthenticationService } from "../ports/authentication-service";

export interface ResetPasswordInput {
  email: string;
}

export interface ResetPasswordUseCase {
  exec: (input: ResetPasswordInput) => Promise<void>;
}

export class ResetPassword implements ResetPasswordUseCase {
  private readonly authService: AuthenticationService;

  constructor(authService: AuthenticationService) {
    this.authService = authService;
  }

  async exec(input: ResetPasswordInput): Promise<void> {
    const challenge = await this.authService.initiatePasswordReset({
      identifier: input.email,
    });

    setVerificationCookie(challenge.id, challenge.expiresAt);
    setEmailCookie(input.email, challenge.expiresAt);
  }
}
