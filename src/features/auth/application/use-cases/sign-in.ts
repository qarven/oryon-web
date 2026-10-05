import type { MfaFactorType } from "../../domain/mfa-factor-type";
import { setFlowCookie } from "../../infrastructure/cookies/flow";
import { setSessionCookies } from "../../infrastructure/cookies/session";
import type { AuthenticationService } from "../ports/authentication-service";

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignInOutput {
  availableMfaMethods: MfaFactorType[];
  mfaRequired: boolean;
}

export interface SignInUseCase {
  exec: (input: SignInInput) => Promise<SignInOutput>;
}

export class SignIn implements SignInUseCase {
  private readonly authService: AuthenticationService;

  constructor(authService: AuthenticationService) {
    this.authService = authService;
  }

  async exec(input: SignInInput): Promise<SignInOutput> {
    const result = await this.authService.login({
      email: input.email,
      password: input.password,
    });

    if (result.flow) {
      setFlowCookie(result.flow);

      return {
        availableMfaMethods: result.availableMfaMethods ?? [],
        mfaRequired: true,
      };
    }

    if (result.token) {
      setSessionCookies(result.token);
    }

    return { mfaRequired: false, availableMfaMethods: [] };
  }
}
