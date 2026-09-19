import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .transform((val) => val.replace(/\s+/g, ""))
    .pipe(z.string().min(3, "Please enter a valid name")),
  email: z
    .string()
    .transform((val) => val.replace(/\s+/g, ""))
    .pipe(z.email("Please enter a valid email address")),
  password: z.string().min(8, "Please enter your password"),
  captchaToken: z.string().min(1, "Please complete the captcha"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export interface SignUpOutput {
  mfaRequired: boolean;
}
