import { create } from "@bufbuild/protobuf";
import { RegistrationRequestSchema } from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { createServerFn } from "@tanstack/react-start";
import { authenticationClient } from "#/lib/clients";
import { catchErrorServer } from "#/lib/clients/error";
import { type SignUpOutput, signUpSchema } from "../model/signup";

export const signUpFn = createServerFn({ method: "POST" })
  .validator((input) => signUpSchema.parse(input))
  .handler(async ({ data: input }): Promise<SignUpOutput> => {
    try {
      // validate input.captchaToken

      const request = create(RegistrationRequestSchema, {
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        password: input.password,
      });
      const { flow } = await authenticationClient.registration(request);
      if (!flow) {
        return {
          mfaRequired: false,
        };
      }

      return {
        mfaRequired: true,
      };
    } catch (error) {
      throw catchErrorServer(error);
    }
  });
