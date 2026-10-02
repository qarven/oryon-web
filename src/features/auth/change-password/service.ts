import { createServerFn } from "@tanstack/react-start";
import { clearEmailCookie } from "#/app/cookies/email";
import {
  clearVerificationCookie,
  getVerificationCookie,
} from "#/app/cookies/verification";
import { catchErrorServer } from "#/lib/clients/error";
import { completePasswordReset } from "./data";
import type { ChangePasswordOutput } from "./model";
import { changePasswordSchema } from "./schema";

export const changePasswordFn = createServerFn({ method: "POST" })
  .validator((input) => changePasswordSchema.parse(input))
  .handler(async ({ data: input }): Promise<ChangePasswordOutput> => {
    try {
      const verification = getVerificationCookie();
      if (!verification?.code) {
        throw new Error(
          "Verification session expired. Please request a new code."
        );
      }

      await completePasswordReset({
        code: verification.code,
        newPassword: input.newPassword,
        verificationId: BigInt(verification.id),
      });

      clearVerificationCookie();
      clearEmailCookie();

      return { success: true };
    } catch (error) {
      throw catchErrorServer(error);
    }
  });
