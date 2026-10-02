import { createServerFn } from "@tanstack/react-start";
import { setEmailCookie } from "#/app/cookies/email";
import { setFlowCookie } from "#/app/cookies/flow";
import { verifyCaptcha } from "../shared/data/captcha";
import { registration } from "./data";
import { signUpSchema } from "./schema";

export const signUpFn = createServerFn({ method: "POST" })
  .validator((input) => signUpSchema.parse(input))
  .handler(async ({ data: input }): Promise<void> => {
    await verifyCaptcha(input.captchaToken);

    const output = await registration({
      name: input.name,
      password: input.password,
      email: input.email,
    });

    setFlowCookie(output);
    setEmailCookie(input.email, output.expiresAt);
  });
