import { create } from "@bufbuild/protobuf";
import { LoginRequestSchema } from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { createServerFn } from "@tanstack/react-start";
import { authenticationClient } from "#/libraries/clients";
import { catchErrorServer } from "#/libraries/clients/error";
import { toModelMfaFactorType } from "../mappers/mfa";
import { type SignInOutput, signInSchema } from "../model/signin";

export const signInFn = createServerFn({ method: "POST" })
  .validator((input) => signInSchema.parse(input))
  .handler(async ({ data: input }): Promise<SignInOutput> => {
    try {
      const request = create(LoginRequestSchema, {
        identifier: input.email,
        password: input.password,
      });
      const { mfaRequired, availableMfaMethods, ...resp } =
        await authenticationClient.login(request);

      console.log("RESPONSE", resp);

      return {
        mfaRequired,
        availableMfaMethods: availableMfaMethods.map(toModelMfaFactorType),
      };
    } catch (error) {
      throw catchErrorServer(error);
    }
  });
