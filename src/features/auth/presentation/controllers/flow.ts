import { createServerFn } from "@tanstack/react-start";
import {
  type FlowCookieValue,
  getFlowCookie,
} from "#/features/auth/infrastructure/cookies/flow";

export const getFlowFn = createServerFn({ method: "GET" }).handler(
  (): FlowCookieValue | null => getFlowCookie() ?? null
);
