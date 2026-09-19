import { create } from "@bufbuild/protobuf";
import { LoginRequestSchema } from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { createServerFn } from "@tanstack/react-start";
import { clearFlowCookie, setFlowCookie } from "#/app/cookies/flow.cookie";
import { authenticationClient } from "#/libraries/clients";
import { catchErrorServer } from "#/libraries/clients/error";
import { convertProtoTimeToDate } from "#/libraries/utils/date";
import { type SignInOutput, signInSchema } from "../model/signin";
import { toModelMfaFactorType } from "./mappers/mfa";

export const signInFn = createServerFn({ method: "POST" })
  .validator((input) => signInSchema.parse(input))
  .handler(async ({ data: input }): Promise<SignInOutput> => {
    try {
      const request = create(LoginRequestSchema, {
        identifier: input.email,
        password: input.password,
      });
      const { mfaRequired, availableMfaMethods, flow } =
        await authenticationClient.login(request);

      if (mfaRequired && flow && flow.expiresAt !== undefined) {
        const expires = convertProtoTimeToDate(
          flow.expiresAt.seconds,
          flow.expiresAt.nanos
        );
        setFlowCookie(flow.id.toString(), expires);
      } else {
        clearFlowCookie();
      }

      return {
        mfaRequired,
        availableMfaMethods: availableMfaMethods.map(toModelMfaFactorType),
      };
    } catch (error) {
      throw catchErrorServer(error);
    }
  });
