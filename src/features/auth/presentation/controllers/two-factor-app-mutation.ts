import { createServerFn } from "@tanstack/react-start";
import { MfaFactorType } from "../../domain/mfa-factor-type";
import { container } from "../../injection";
import { twoFactorAppSchema } from "../schemas/two-factor-app";

export const verifyTotpMutation = createServerFn({ method: "POST" })
  .validator((input) => twoFactorAppSchema.parse(input))
  .handler(({ data: { code } }) =>
    container
      .getCompleteLoginMfaUseCase()
      .exec({ code, factorType: MfaFactorType.Totp })
  );
