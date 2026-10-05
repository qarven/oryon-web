import { createServerFn } from "@tanstack/react-start";
import {
  getVerificationCookie,
  type VerificationCookieValue,
} from "#/features/auth/infrastructure/cookies/verification";

export const getVerificationFn = createServerFn({ method: "GET" }).handler(
  (): VerificationCookieValue | null => getVerificationCookie() ?? null
);
