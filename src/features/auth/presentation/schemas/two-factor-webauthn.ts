import { z } from "zod";

export const twoFactorWebauthnSchema = z.object({
  assertionResponseJson: z.string().trim().min(2).max(32_768),
});
