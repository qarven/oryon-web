import { createServerFn } from "@tanstack/react-start";
import { setFlowCookie } from "#/app/cookies/flow";
import { setSessionCookies } from "#/app/cookies/session";
import { catchErrorServer } from "#/lib/clients/error";
import { login } from "./data";
import type { SignInOutput } from "./model";
import { signInSchema } from "./schema";

export const signInFn = createServerFn({ method: "POST" })
  .validator((input) => signInSchema.parse(input))
  .handler(async ({ data: input }): Promise<SignInOutput> => {
    try {
      const data: SignInOutput = { mfaRequired: false };

      const output = await login(input);
      if (output.flow) {
        setFlowCookie(output.flow);

        return {
          mfaRequired: true,
          availableMfaMethods: output.availableMfaMethods,
        };
      }

      if (output.token) {
        setSessionCookies(output.token);
      }

      return data;
    } catch (error) {
      throw catchErrorServer(error);
    }
  });
