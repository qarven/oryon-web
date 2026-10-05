import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@tanstack/react-start/server";
import { env } from "#/env";

const VERIFICATION_COOKIE_NAME = "oryon.verification" as const;

export interface VerificationCookieValue {
  code?: string;
  id: string;
}

function isVerificationCookieValue(
  value: unknown
): value is VerificationCookieValue {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  if (typeof candidate.id !== "string" || candidate.id.length === 0) {
    return false;
  }
  if (
    candidate.code !== undefined &&
    (typeof candidate.code !== "string" || candidate.code.length === 0)
  ) {
    return false;
  }
  return true;
}

export function getVerificationCookie(): VerificationCookieValue | undefined {
  const raw = getCookie(VERIFICATION_COOKIE_NAME);
  if (!raw) {
    return undefined;
  }
  try {
    const decoded = Buffer.from(raw, "base64url").toString("utf8");
    const parsed: unknown = JSON.parse(decoded);
    return isVerificationCookieValue(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

export function clearVerificationCookie(): void {
  deleteCookie(VERIFICATION_COOKIE_NAME, { path: "/" });
}

export function setVerificationCookie(id: bigint, expiresAt: Date): void {
  const value: VerificationCookieValue = { id: id.toString() };
  const encoded = Buffer.from(JSON.stringify(value), "utf8").toString(
    "base64url"
  );
  setCookie(VERIFICATION_COOKIE_NAME, encoded, {
    expires: expiresAt,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: env.ENV === "production",
  });
}

export function setVerificationCode(id: string, code: string): void {
  const value: VerificationCookieValue = { id, code };
  const encoded = Buffer.from(JSON.stringify(value), "utf8").toString(
    "base64url"
  );
  setCookie(VERIFICATION_COOKIE_NAME, encoded, {
    // Short-lived step-up: the server enforces the real challenge expiry.
    expires: new Date(Date.now() + 15 * 60 * 1000),
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: env.ENV === "production",
  });
}
