import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@tanstack/react-start/server";

const FLOW_COOKIE_NAME = "oryon.flow" as const;

export function getFlowCookie(): string | undefined {
  return getCookie(FLOW_COOKIE_NAME);
}

export function clearFlowCookie(): void {
  deleteCookie(FLOW_COOKIE_NAME, { path: "/" });
}

export function setFlowCookie(flowId: string, expires: Date): void {
  setCookie(FLOW_COOKIE_NAME, flowId, {
    expires,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}
