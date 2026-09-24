import { create } from "@bufbuild/protobuf";
import { RegistrationRequestSchema } from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { authenticationClient } from "#/lib/clients";
import type { SignUpInput, SignUpOutput } from "./model";

export const registration = async (
  input: SignUpInput
): Promise<SignUpOutput> => {
  const request = create(RegistrationRequestSchema, {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    password: input.password,
  });

  const response = await authenticationClient.registration(request);

  console.log(response);

  return { mfaRequired: true };
};
