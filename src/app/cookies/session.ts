import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@tanstack/react-start/server";
import { env } from "#/env";

const ACCESS_TOKEN_COOKIE_NAME = "oryon.access" as const;
const REFRESH_TOKEN_COOKIE_NAME = "oryon.refresh" as const;

// Web-only default; the backend does not return a refresh-token lifetime.
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

export interface SessionCookieValue {
  accessToken: string;
  expiresIn: bigint; // in seconds
  refreshToken: string;
}

export function getAccessTokenCookie(): string | undefined {
  return getCookie(ACCESS_TOKEN_COOKIE_NAME);
}

export function getRefreshTokenCookie(): string | undefined {
  return getCookie(REFRESH_TOKEN_COOKIE_NAME);
}

export function clearSessionCookies(): void {
  deleteCookie(ACCESS_TOKEN_COOKIE_NAME, { path: "/" });
  deleteCookie(REFRESH_TOKEN_COOKIE_NAME, { path: "/" });
}

export function setSessionCookies(token: SessionCookieValue): void {
  const secure = env.ENV === "production";
  setCookie(ACCESS_TOKEN_COOKIE_NAME, token.accessToken, {
    httpOnly: true,
    maxAge: Number(token.expiresIn),
    path: "/",
    sameSite: "lax",
    secure,
  });
  setCookie(REFRESH_TOKEN_COOKIE_NAME, token.refreshToken, {
    httpOnly: true,
    maxAge: REFRESH_TOKEN_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure,
  });
}
