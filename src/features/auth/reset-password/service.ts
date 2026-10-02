import { createServerFn } from "@tanstack/react-start";
import { setEmailCookie } from "#/app/cookies/email";
import { setVerificationCookie } from "#/app/cookies/verification";
import { initiateVerification } from "../shared/data/initiate-verification";
import { resetPasswordSchema } from "./schema";

export const resetPasswordFn = createServerFn({ method: "POST" })
  .validator((input) => resetPasswordSchema.parse(input))
  .handler(async ({ data: input }): Promise<void> => {
    const challenge = await initiateVerification({
      identifier: input.email,
    });

    setVerificationCookie(challenge.id, challenge.expiresAt);
    setEmailCookie(input.email, challenge.expiresAt);
  });
