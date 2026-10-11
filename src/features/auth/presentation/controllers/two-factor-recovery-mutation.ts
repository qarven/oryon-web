import { createServerFn } from "@tanstack/react-start";
import { MfaFactorType } from "../../domain/mfa-factor-type";
import { container } from "../../injection";
import { twoFactorRecoverySchema } from "../schemas/two-factor-recovery";

export const verifyRecoveryCodeMutation = createServerFn({ method: "POST" })
  .validator((input) => twoFactorRecoverySchema.parse(input))
  .handler(({ data: { code } }) =>
    container
      .getCompleteLoginMfaUseCase()
      .exec({ code, factorType: MfaFactorType.BackupCode })
  );
