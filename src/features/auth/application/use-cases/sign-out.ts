import {
  clearSessionCookies,
  getRefreshTokenCookie,
} from "../../infrastructure/cookies/session";
import type { SessionService } from "../ports/session-service";

export interface SignOutUseCase {
  exec: () => Promise<void>;
}

export class SignOut implements SignOutUseCase {
  private readonly sessionService: SessionService;

  constructor(sessionService: SessionService) {
    this.sessionService = sessionService;
  }

  async exec(): Promise<void> {
    const refreshToken = getRefreshTokenCookie();
    if (!refreshToken) {
      clearSessionCookies();
      return;
    }

    try {
      await this.sessionService.logout({ refreshToken });
    } catch {
      // Best-effort revocation: local cookies are cleared below regardless.
    } finally {
      clearSessionCookies();
    }
  }
}
