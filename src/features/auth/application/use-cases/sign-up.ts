import { setEmailCookie } from "../../infrastructure/cookies/email";
import { setFlowCookie } from "../../infrastructure/cookies/flow";
import type { AuthenticationService } from "../ports/authentication-service";
import type { CaptchaService } from "../ports/captcha-service";

export interface SignUpInput {
  captchaToken: string;
  email: string;
  name: string;
  password: string;
}

export interface SignUpUseCase {
  exec: (input: SignUpInput) => Promise<void>;
}

export class SignUp implements SignUpUseCase {
  private readonly authService: AuthenticationService;
  private readonly captchaService: CaptchaService;

  constructor(
    authService: AuthenticationService,
    captchaService: CaptchaService
  ) {
    this.authService = authService;
    this.captchaService = captchaService;
  }

  async exec(input: SignUpInput): Promise<void> {
    await this.captchaService.verify(input.captchaToken);

    const flow = await this.authService.registration({
      email: input.email,
      name: input.name,
      password: input.password,
    });

    setFlowCookie(flow);
    setEmailCookie(input.email, flow.expiresAt);
  }
}
