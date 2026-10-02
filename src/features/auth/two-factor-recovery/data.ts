import { create } from "@bufbuild/protobuf";
import { CompleteMfaRequestSchema } from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { MfaFactorType } from "@qarven/mono/oryon/identity/v1/enum_pb";
import { authenticationClient } from "#/lib/clients";
import type { TwoFactorRecoveryInput, TwoFactorRecoveryOutput } from "./model";

export const verifyRecoveryCode = async (
  input: TwoFactorRecoveryInput
): Promise<TwoFactorRecoveryOutput> => {
  const request = create(CompleteMfaRequestSchema, {
    code: input.code,
    factorType: MfaFactorType.BACKUP_CODE,
    // TODO: hardcoded, same as the TOTP path. Read the real id from the flow
    // cookie once the MFA flow id is plumbed end to end.
    flowId: BigInt(1),
  });

  // TODO: `CompleteMfaResponse` carries a token on success, but neither MFA
  // path calls `setSessionCookies`, so completing MFA never signs the user in.
  await authenticationClient.completeMfa(request);

  // TODO: also commented out in the TOTP path, so a completed flow never
  // clears its cookie.
  // clearFlowCookie();

  return { success: true };
};
