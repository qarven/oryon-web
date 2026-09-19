import { create } from "@bufbuild/protobuf";
import { CompleteMfaRequestSchema } from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { MfaFactorType } from "@qarven/mono/oryon/identity/v1/enum_pb";
import { createServerFn } from "@tanstack/react-start";
import { authenticationClient } from "#/libraries/clients";
import { catchErrorServer } from "#/libraries/clients/error";
import {
  type TwoFactorAppOutput,
  twoFactorAppSchema,
} from "../model/two-factor-app";

export const verifyTotpFn = createServerFn({ method: "POST" })
  .validator((input) => twoFactorAppSchema.parse(input))
  .handler(async ({ data: input }): Promise<TwoFactorAppOutput> => {
    try {
      const request = create(CompleteMfaRequestSchema, {
        code: input.code,
        factorType: MfaFactorType.TOTP,
        flowId: BigInt(1),
      });
      await authenticationClient.completeMfa(request);

      // clearMfaFlowCookie();

      return { success: true };
    } catch (error) {
      throw catchErrorServer(error);
    }
  });
