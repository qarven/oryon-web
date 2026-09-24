import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@tanstack/react-start/server";
import { env } from "#/env";
import type { FlowState } from "#/features/auth/shared/types/flow-state";
import type { FlowType } from "#/features/auth/shared/types/flow-type";
import type { Flow } from "#/features/auth/signin/model";

const FLOW_COOKIE_NAME = "oryon.flow" as const;

export interface FlowCookieValue {
  id: string;
  state: FlowState;
  type: FlowType;
}

function isFlowCookieValue(value: unknown): value is FlowCookieValue {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.state === "number" &&
    typeof candidate.type === "number"
  );
}

export function getFlowCookie(): FlowCookieValue | undefined {
  const raw = getCookie(FLOW_COOKIE_NAME);
  if (!raw) {
    return undefined;
  }
  try {
    const decoded = Buffer.from(raw, "base64url").toString("utf8");
    const parsed: unknown = JSON.parse(decoded);
    return isFlowCookieValue(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

export function clearFlowCookie(): void {
  deleteCookie(FLOW_COOKIE_NAME, { path: "/" });
}

export function setFlowCookie(flow: Flow): void {
  const value: FlowCookieValue = {
    id: flow.id.toString(),
    state: flow.flowState,
    type: flow.flowType,
  };
  const encoded = Buffer.from(JSON.stringify(value), "utf8").toString(
    "base64url"
  );
  setCookie(FLOW_COOKIE_NAME, encoded, {
    expires: flow.expiresAt,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: env.ENV === "production",
  });
}
