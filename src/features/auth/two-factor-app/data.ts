import { create } from "@bufbuild/protobuf";
import { CompleteMfaRequestSchema } from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { MfaFactorType } from "@qarven/mono/oryon/identity/v1/enum_pb";
import { authenticationClient } from "#/lib/clients";
import type { TwoFactorAppInput, TwoFactorAppOutput } from "./model";

export const verifyTotp = async (
  input: TwoFactorAppInput
): Promise<TwoFactorAppOutput> => {
  const request = create(CompleteMfaRequestSchema, {
    code: input.code,
    factorType: MfaFactorType.TOTP,
    flowId: BigInt(1),
  });
  await authenticationClient.completeMfa(request);

  // clearMfaFlowCookie();

  return { success: true };
};
