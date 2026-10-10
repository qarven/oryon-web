import { setEmailCookie } from "../../infrastructure/cookies/email";
import { setVerificationCookie } from "../../infrastructure/cookies/verification";
import type { AuthenticationService } from "../ports/authentication-service";
import type { CaptchaService } from "../ports/captcha-service";

export interface ResetPasswordInput {
  captchaToken: string;
  email: string;
}

export interface ResetPasswordUseCase {
  exec: (input: ResetPasswordInput) => Promise<void>;
}

export class ResetPassword implements ResetPasswordUseCase {
  private readonly authService: AuthenticationService;
  private readonly captchaService: CaptchaService;

  constructor(
    authService: AuthenticationService,
    captchaService: CaptchaService
  ) {
    this.authService = authService;
    this.captchaService = captchaService;
  }

  async exec(input: ResetPasswordInput): Promise<void> {
    await this.captchaService.verify(input.captchaToken);

    const challenge = await this.authService.initiatePasswordReset({
      identifier: input.email,
    });

    setVerificationCookie(challenge.id, challenge.expiresAt);
    setEmailCookie(input.email, challenge.expiresAt);
  }
}
