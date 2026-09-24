import { createClient, type Interceptor } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { AuthenticationService } from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { env } from "#/env";

const USER_AGENT = "oryon-web/v1.0.0" as const;

const userAgentInterceptor: Interceptor = (next) => (req) => {
  req.header.set("user-agent", USER_AGENT);
  return next(req);
};

const publicTransport = createConnectTransport({
  baseUrl: env.SERVER_URL,
  defaultTimeoutMs: 10_000, // 10 seconds
  interceptors: [userAgentInterceptor],
});

export const authenticationClient = createClient(
  AuthenticationService,
  publicTransport
);
