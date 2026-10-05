import { z } from "zod";

// Recovery codes are alphanumeric, optionally split into dash-separated
// groups. The proto leaves `CompleteLoginMfaRequest.code` unconstrained, so this
// matches the shape rather than a fixed length.
const RECOVERY_CODE_PATTERN = /^[a-z\d]{4,}(?:-[a-z\d]{4,})*$/i;

export const twoFactorRecoverySchema = z.object({
  code: z
    .string()
    .trim()
    .regex(RECOVERY_CODE_PATTERN, "Enter a valid recovery code"),
});
