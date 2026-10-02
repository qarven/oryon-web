import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@tanstack/react-start/server";
import { env } from "#/env";

const EMAIL_COOKIE_NAME = "oryon.email" as const;

// RFC 5321: max email address length.
const MAX_EMAIL_LENGTH = 254;

function isEmail(value: string): boolean {
  return (
    value.length > 0 && value.length <= MAX_EMAIL_LENGTH && value.includes("@")
  );
}

export function getEmailCookie(): string | undefined {
  const raw = getCookie(EMAIL_COOKIE_NAME);
  if (!raw) {
    return undefined;
  }
  const email = raw.trim().toLowerCase();
  return isEmail(email) ? email : undefined;
}

export function clearEmailCookie(): void {
  deleteCookie(EMAIL_COOKIE_NAME, { path: "/" });
}

export function setEmailCookie(email: string, expiresAt: Date): void {
  const normalized = email.trim().toLowerCase();
  if (!isEmail(normalized)) {
    throw new Error("Invalid email address");
  }
  setCookie(EMAIL_COOKIE_NAME, normalized, {
    expires: expiresAt,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: env.ENV === "production",
  });
}
