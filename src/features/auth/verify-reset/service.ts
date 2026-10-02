import { createServerFn } from "@tanstack/react-start";
import {
  getVerificationCookie,
  setVerificationCode,
} from "#/app/cookies/verification";
import { catchErrorServer } from "#/lib/clients/error";
import type { VerifyResetOutput } from "./model";
import { verifyResetSchema } from "./schema";

export const verifyResetFn = createServerFn({ method: "POST" })
  .validator((input) => verifyResetSchema.parse(input))
  .handler(({ data: input }): VerifyResetOutput => {
    try {
      const verification = getVerificationCookie();
      if (!verification) {
        throw new Error(
          "Verification session expired. Please request a new code."
        );
      }

      // The code and new password are verified together by
      // CompletePasswordReset. Hold the code in the verification cookie
      // until the new password is collected on /change-password.
      setVerificationCode(verification.id, input.code);

      return { success: true };
    } catch (error) {
      throw catchErrorServer(error);
    }
  });
