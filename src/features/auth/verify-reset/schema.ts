import { z } from "zod";

export const verifyResetSchema = z.object({
  code: z.string().trim().length(6, "Enter the code we sent to your email"),
});
