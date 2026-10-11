import { z } from "zod";

export const completePasswordResetSchema = z
  .object({
    code: z.string().min(1, "Missing recovery token"),
    newPassword: z.string().min(8, "Please enter your password"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
