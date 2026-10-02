import { create } from "@bufbuild/protobuf";
import { CompleteRegistrationRequestSchema } from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { authenticationClient } from "#/lib/clients";
import type { CompleteRegistrationInput } from "./model";

export const completeRegistration = async (
  input: CompleteRegistrationInput
): Promise<void> => {
  const request = create(CompleteRegistrationRequestSchema, {
    flowId: input.flowId,
    emailCode: input.code,
  });

  await authenticationClient.completeRegistration(request);
};
