import {
  clearSessionCookies,
  getAccessTokenCookie,
  getRefreshTokenCookie,
  setSessionCookies,
} from "../../infrastructure/cookies/session";
import type { AuthenticationService } from "../ports/authentication-service";

export interface SessionUseCase {
  exec: () => Promise<string | undefined>;
}

export class Session implements SessionUseCase {
  private readonly authService: AuthenticationService;

  constructor(authService: AuthenticationService) {
    this.authService = authService;
  }

  async exec(): Promise<string | undefined> {
    const accessToken = getAccessTokenCookie();
    if (accessToken) {
      return accessToken;
    }

    const refreshToken = getRefreshTokenCookie();
    if (!refreshToken) {
      return undefined;
    }

    try {
      const output = await this.authService.refreshToken({ refreshToken });
      setSessionCookies(output);
      return output.accessToken;
    } catch {
      clearSessionCookies();
      return undefined;
    }
  }
}
