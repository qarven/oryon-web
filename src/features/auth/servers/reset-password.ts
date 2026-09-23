import { create } from "@bufbuild/protobuf";
import { InitiateVerificationRequestSchema } from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { VerificationPurpose } from "@qarven/mono/oryon/identity/v1/enum_pb";
import { createServerFn } from "@tanstack/react-start";
import { authenticationClient } from "#/lib/clients";
import { catchErrorServer } from "#/lib/clients/error";
import {
  type ResetPasswordOutput,
  resetPasswordSchema,
} from "../model/reset-password";

export const resetPasswordFn = createServerFn({ method: "POST" })
  .validator((input) => resetPasswordSchema.parse(input))
  .handler(async ({ data: input }): Promise<ResetPasswordOutput> => {
    try {
      const request = create(InitiateVerificationRequestSchema, {
        identifier: input.email,
        purpose: VerificationPurpose.PASSWORD_RESET,
      });
      const resp = await authenticationClient.initiateVerification(request);
      console.log("RESPONSE", resp);

      return { success: true };
    } catch (error) {
      throw catchErrorServer(error);
    }
  });
