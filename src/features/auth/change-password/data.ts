import { create } from "@bufbuild/protobuf";
import { CompletePasswordResetRequestSchema } from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { authenticationClient } from "#/lib/clients";

export const completePasswordReset = async (input: {
  code: string;
  newPassword: string;
  verificationId: bigint;
}): Promise<void> => {
  const request = create(CompletePasswordResetRequestSchema, {
    code: input.code,
    newPassword: input.newPassword,
    verificationId: input.verificationId,
  });

  const response = await authenticationClient.completePasswordReset(request);

  if (!response.user) {
    throw new Error("unsupported response api");
  }
};
