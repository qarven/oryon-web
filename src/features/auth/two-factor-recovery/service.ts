import { createServerFn } from "@tanstack/react-start";
import { catchErrorServer } from "#/lib/clients/error";
import { verifyRecoveryCode } from "./data";
import type { TwoFactorRecoveryOutput } from "./model";
import { twoFactorRecoverySchema } from "./schema";

export const verifyRecoveryCodeFn = createServerFn({ method: "POST" })
  .validator((input) => twoFactorRecoverySchema.parse(input))
  .handler(async ({ data: input }): Promise<TwoFactorRecoveryOutput> => {
    try {
      const output = await verifyRecoveryCode(input);

      return output;
    } catch (error) {
      throw catchErrorServer(error);
    }
  });
