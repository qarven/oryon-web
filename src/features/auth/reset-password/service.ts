import { createServerFn } from "@tanstack/react-start";
import { catchErrorServer } from "#/lib/clients/error";
import { initiateVerification } from "./data";
import type { ResetPasswordOutput } from "./model";
import { resetPasswordSchema } from "./schema";

export const resetPasswordFn = createServerFn({ method: "POST" })
  .validator((input) => resetPasswordSchema.parse(input))
  .handler(async ({ data: input }): Promise<ResetPasswordOutput> => {
    try {
      const output = await initiateVerification(input);

      return output;
    } catch (error) {
      throw catchErrorServer(error);
    }
  });
