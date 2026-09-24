import { createServerFn } from "@tanstack/react-start";
import { catchErrorServer } from "#/lib/clients/error";
import { registration } from "./data";
import type { SignUpOutput } from "./model";
import { signUpSchema } from "./schema";

export const signUpFn = createServerFn({ method: "POST" })
  .validator((input) => signUpSchema.parse(input))
  .handler(async ({ data: input }): Promise<SignUpOutput> => {
    try {
      // validate input.captchaToken

      const output = await registration(input);

      return output;
    } catch (error) {
      throw catchErrorServer(error);
    }
  });
