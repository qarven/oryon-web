import { create } from "@bufbuild/protobuf";
import { LoginRequestSchema } from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { createServerFn } from "@tanstack/react-start";
import { authenticationClient } from "#/libraries/clients";
import { catchErrorServer } from "#/libraries/clients/error";
import { type LoginOutput, loginSchema } from "../model/signin";

export const signInFn = createServerFn({ method: "POST" })
  .validator((input) => loginSchema.parse(input))
  .handler(async ({ data: input }): Promise<LoginOutput> => {
    try {
      const request = create(LoginRequestSchema, {
        identifier: input.email,
        password: input.password,
      });
      const { mfaRequired, availableMfaMethods } =
        await authenticationClient.login(request);

      return {
        mfaRequired,
        availableMfaMethods,
      };
    } catch (error) {
      throw catchErrorServer(error);
    }
  });
