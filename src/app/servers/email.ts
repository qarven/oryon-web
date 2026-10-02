import { createServerFn } from "@tanstack/react-start";
import { getEmailCookie } from "#/app/cookies/email";

export const getEmailFn = createServerFn({ method: "GET" }).handler(
  (): string | null => getEmailCookie() ?? null
);
