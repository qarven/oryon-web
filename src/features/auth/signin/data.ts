import { create } from "@bufbuild/protobuf";
import { LoginRequestSchema } from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { authenticationClient } from "#/lib/clients";
import type { SignInInput, SignInOutput } from "./model";

export const login = async (input: SignInInput): Promise<SignInOutput> => {
  const request = create(LoginRequestSchema, {
    identifier: input.email,
    password: input.password,
  });

  const response = await authenticationClient.login(request);

  console.log(response);

  return { mfaRequired: true };
};
