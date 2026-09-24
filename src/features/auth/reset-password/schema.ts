import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .transform((val) => val.trim())
    .pipe(z.email("Please enter a valid email address")),
});
