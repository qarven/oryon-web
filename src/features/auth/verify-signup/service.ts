import { createServerFn } from "@tanstack/react-start";
import { clearEmailCookie } from "#/app/cookies/email";
import { clearFlowCookie, getFlowCookie } from "#/app/cookies/flow";
import { catchErrorServer } from "#/lib/clients/error";
import { completeRegistration } from "./data";
import type { VerifySignUpOutput } from "./model";
import { verifySignUpSchema } from "./schema";

export const verifySignUpFn = createServerFn({ method: "POST" })
  .validator((input) => verifySignUpSchema.parse(input))
  .handler(async ({ data: input }): Promise<VerifySignUpOutput> => {
    try {
      const flow = getFlowCookie();
      if (!flow) {
        throw new Error("Verification session expired. Please sign up again.");
      }

      await completeRegistration({
        code: input.code,
        flowId: BigInt(flow.id),
      });

      clearFlowCookie();
      clearEmailCookie();

      return { success: true };
    } catch (error) {
      throw catchErrorServer(error);
    }
  });
