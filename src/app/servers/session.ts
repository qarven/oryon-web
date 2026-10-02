import { createServerFn } from "@tanstack/react-start";
import { getAccessTokenCookie } from "#/app/cookies/session";

export const getAccessSessionFn = createServerFn({ method: "GET" }).handler(
  (): string | undefined => getAccessTokenCookie()
);
