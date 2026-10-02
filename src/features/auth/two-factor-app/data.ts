import { create } from "@bufbuild/protobuf";
import { CompleteLoginMfaRequestSchema } from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { MfaFactorType } from "@qarven/mono/oryon/identity/v1/enum_pb";
import { authenticationClient } from "#/lib/clients";

export const verifyTotp = async (input: {
  code: string;
  flowId: bigint;
}): Promise<{
  token: { accessToken: string; expiresIn: bigint; refreshToken: string };
}> => {
  const request = create(CompleteLoginMfaRequestSchema, {
    code: input.code,
    factorType: MfaFactorType.TOTP,
    flowId: input.flowId,
  });
  const response = await authenticationClient.completeLoginMfa(request);

  if (!response.token) {
    throw new Error("unsupported response api");
  }

  return {
    token: {
      accessToken: response.token.accessToken,
      expiresIn: response.token.expiresIn,
      refreshToken: response.token.refreshToken,
    },
  };
};
