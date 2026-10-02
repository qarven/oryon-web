import { createServerFn } from "@tanstack/react-start";
import {
  getVerificationCookie,
  type VerificationCookieValue,
} from "#/app/cookies/verification";

export const getVerificationFn = createServerFn({ method: "GET" }).handler(
  (): VerificationCookieValue | null => getVerificationCookie() ?? null
);
