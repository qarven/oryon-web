import { create } from "@bufbuild/protobuf";
import { LoginRequestSchema } from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { authenticationClient } from "#/lib/clients";
import { convertProtoTimeToDate } from "#/lib/utils/date";
import { toModelFlowState } from "../shared/mappers/flow-state";
import { toModelFlowType } from "../shared/mappers/flow-type";
import { toModelMfaFactorType } from "../shared/mappers/mfa-factor-type";
import type { LoginData, SignInInput } from "./model";

export const login = async (input: SignInInput): Promise<LoginData> => {
  const request = create(LoginRequestSchema, {
    identifier: input.email,
    password: input.password,
  });

  const response = await authenticationClient.login(request);

  const data: LoginData = {};

  switch (response.result.case) {
    case "success":
      if (response.result.value.token !== undefined) {
        data.token = {
          accessToken: response.result.value.token.accessToken,
          expiresIn: response.result.value.token.expiresIn,
          refreshToken: response.result.value.token.refreshToken,
        };
      }

      if (response.result.value.user !== undefined) {
        data.user = {
          id: response.result.value.user.id,
          name: response.result.value.user.name,
          avatarUrl: response.result.value.user.avatarUrl,
        };
      }

      break;
    case "mfa":
      if (response.result.value.availableMfaMethods.length > 0) {
        data.availableMfaMethods =
          response.result.value.availableMfaMethods.map(toModelMfaFactorType);
      }

      if (response.result.value.flow?.expiresAt !== undefined) {
        data.flow = {
          id: response.result.value.flow.id,
          flowType: toModelFlowType(response.result.value.flow.flowType),
          flowState: toModelFlowState(response.result.value.flow.flowState),
          expiresAt: convertProtoTimeToDate(
            response.result.value.flow.expiresAt.seconds,
            response.result.value.flow.expiresAt.nanos
          ),
        };
      }

      break;
    default:
      throw new Error("unsupported response api");
  }

  return data;
};
