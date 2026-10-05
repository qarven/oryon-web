import { createServerFn } from "@tanstack/react-start";
import { getEmailCookie } from "#/features/auth/infrastructure/cookies/email";

export const getEmailFn = createServerFn({ method: "GET" }).handler(
  (): string | null => getEmailCookie() ?? null
);
