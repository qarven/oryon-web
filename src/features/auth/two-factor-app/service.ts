import { createServerFn } from "@tanstack/react-start";
import { catchErrorServer } from "#/lib/clients/error";
import { verifyTotp } from "./data";
import type { TwoFactorAppOutput } from "./model";
import { twoFactorAppSchema } from "./schema";

export const verifyTotpFn = createServerFn({ method: "POST" })
  .validator((input) => twoFactorAppSchema.parse(input))
  .handler(async ({ data: input }): Promise<TwoFactorAppOutput> => {
    try {
      const output = await verifyTotp(input);

      return output;
    } catch (error) {
      throw catchErrorServer(error);
    }
  });
