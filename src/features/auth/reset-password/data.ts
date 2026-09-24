import { create } from "@bufbuild/protobuf";
import { InitiateVerificationRequestSchema } from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { VerificationPurpose } from "@qarven/mono/oryon/identity/v1/enum_pb";
import { authenticationClient } from "#/lib/clients";
import type { ResetPasswordInput, ResetPasswordOutput } from "./model";

export const initiateVerification = async (
  input: ResetPasswordInput
): Promise<ResetPasswordOutput> => {
  const request = create(InitiateVerificationRequestSchema, {
    identifier: input.email,
    purpose: VerificationPurpose.PASSWORD_RESET,
  });

  const response = await authenticationClient.initiateVerification(request);

  console.log(response);

  return { success: true };
};
