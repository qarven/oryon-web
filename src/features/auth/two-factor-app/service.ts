import { createServerFn } from "@tanstack/react-start";
import { clearFlowCookie, getFlowCookie } from "#/app/cookies/flow";
import { setSessionCookies } from "#/app/cookies/session";
import { catchErrorServer } from "#/lib/clients/error";
import { verifyTotp } from "./data";
import type { TwoFactorAppOutput } from "./model";
import { twoFactorAppSchema } from "./schema";

export const verifyTotpFn = createServerFn({ method: "POST" })
  .validator((input) => twoFactorAppSchema.parse(input))
  .handler(async ({ data: input }): Promise<TwoFactorAppOutput> => {
    try {
      const flow = getFlowCookie();
      if (!flow) {
        throw new Error("Verification session expired. Please sign in again.");
      }

      const output = await verifyTotp({
        code: input.code,
        flowId: BigInt(flow.id),
      });

      setSessionCookies(output.token);
      clearFlowCookie();

      return { success: true };
    } catch (error) {
      throw catchErrorServer(error);
    }
  });
