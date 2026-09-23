import { createServerFn } from "@tanstack/react-start";
import { catchErrorServer } from "#/lib/clients/error";
import { login } from "./data";
import type { SignInOutput } from "./model";
import { signInSchema } from "./schema";

export const signInFn = createServerFn({ method: "POST" })
  .validator((input) => signInSchema.parse(input))
  .handler(async ({ data: input }): Promise<SignInOutput> => {
    try {
      const output = await login(input);

      return output;
    } catch (error) {
      throw catchErrorServer(error);
    }
  });
