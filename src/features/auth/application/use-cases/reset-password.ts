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

    await this.authService.initiatePasswordReset({
      identifier: input.email,
    });
  }
}
