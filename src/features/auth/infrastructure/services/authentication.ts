import { create } from "@bufbuild/protobuf";
import {
  CompleteLoginMfaRequestSchema,
  CompletePasswordResetRequestSchema,
  CompleteRegistrationRequestSchema,
  InitiatePasswordResetRequestSchema,
  LoginRequestSchema,
  RefreshTokenRequestSchema,
  RegistrationRequestSchema,
  ResendRegistrationCodeRequestSchema,
} from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { authenticationClient } from "#/lib/clients";
import { catchErrorServer } from "#/lib/clients/error";
import { convertProtoTimeToDate } from "#/lib/utils/date";
import type {
  AuthenticationService,
  CompleteLoginMfaRequest,
  CompleteRegistrationRequest,
  LoginRequest,
  LoginResult,
  RefreshTokenRequest,
  RegistrationRequest,
  ResendRegistrationCodeRequest,
} from "../../application/ports/authentication-service";
import type { Flow } from "../../domain/flow";
import type { Token } from "../../domain/token";
import { toModelFlowState } from "../mappers/flow-state";
import { toModelFlowType } from "../mappers/flow-type";
import {
  toModelMfaFactorType,
  toProtoMfaFactorType,
} from "../mappers/mfa-factor-type";

export class Authentication implements AuthenticationService {
  async login(input: LoginRequest): Promise<LoginResult> {
    try {
      const request = create(LoginRequestSchema, {
        identifier: input.email,
        password: input.password,
      });

      const response = await authenticationClient.login(request);

      const data: LoginResult = {};
      switch (response.result.case) {
        case "loginToken":
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
        case "loginMfa":
          if (response.result.value.availableMfaMethods.length > 0) {
            data.availableMfaMethods =
              response.result.value.availableMfaMethods.map(
                toModelMfaFactorType
              );
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
          throw new Error("unexpected response from authentication service");
      }

      if (!(data.flow || data.token)) {
        throw new Error("unexpected response from authentication service");
      }

      return data;
    } catch (error) {
      throw catchErrorServer(error);
    }
  }

  async refreshToken(input: RefreshTokenRequest): Promise<Token> {
    try {
      const request = create(RefreshTokenRequestSchema, {
        refreshToken: input.refreshToken,
      });
      const response = await authenticationClient.refreshToken(request);

      if (!response.token) {
        throw new Error("unsupported response api");
      }

      return {
        accessToken: response.token.accessToken,
        expiresIn: response.token.expiresIn,
        refreshToken: response.token.refreshToken,
      };
    } catch (error) {
      throw catchErrorServer(error);
    }
  }

  async completeLoginMfa(input: CompleteLoginMfaRequest): Promise<Token> {
    try {
      const request = create(CompleteLoginMfaRequestSchema, {
        code: input.code,
        factorType: toProtoMfaFactorType(input.factorType),
        flowId: input.flowId,
      });
      const response = await authenticationClient.completeLoginMfa(request);

      if (!response.token) {
        throw new Error("unsupported response api");
      }

      return {
        accessToken: response.token.accessToken,
        expiresIn: response.token.expiresIn,
        refreshToken: response.token.refreshToken,
      };
    } catch (error) {
      throw catchErrorServer(error);
    }
  }

  async registration(input: RegistrationRequest): Promise<Flow> {
    try {
      const request = create(RegistrationRequestSchema, input);
      const { flow } = await authenticationClient.registration(request);

      if (flow && flow.expiresAt !== undefined) {
        return {
          id: flow?.id,
          flowType: toModelFlowType(flow?.flowType),
          flowState: toModelFlowState(flow.flowState),
          expiresAt: convertProtoTimeToDate(
            flow?.expiresAt.seconds,
            flow?.expiresAt.nanos
          ),
        };
      }

      throw new Error("unsupported response api");
    } catch (error) {
      throw catchErrorServer(error);
    }
  }

  async completeRegistration(
    input: CompleteRegistrationRequest
  ): Promise<void> {
    try {
      const request = create(CompleteRegistrationRequestSchema, {
        flowId: input.flowId,
        emailCode: input.code,
      });

      await authenticationClient.completeRegistration(request);
    } catch (error) {
      throw catchErrorServer(error);
    }
  }

  async resendRegistrationCode(
    input: ResendRegistrationCodeRequest
  ): Promise<Flow> {
    try {
      const request = create(ResendRegistrationCodeRequestSchema, {
        flowId: input.flowId,
      });
      const { flow } =
        await authenticationClient.resendRegistrationCode(request);

      if (flow && flow.expiresAt !== undefined) {
        return {
          id: flow.id,
          flowType: toModelFlowType(flow.flowType),
          flowState: toModelFlowState(flow.flowState),
          expiresAt: convertProtoTimeToDate(
            flow.expiresAt.seconds,
            flow.expiresAt.nanos
          ),
        };
      }

      throw new Error("unsupported response api");
    } catch (error) {
      throw catchErrorServer(error);
    }
  }

  async initiatePasswordReset(input: { identifier: string }): Promise<void> {
    try {
      const request = create(InitiatePasswordResetRequestSchema, {
        identifier: input.identifier,
      });

      await authenticationClient.initiatePasswordReset(request);
    } catch (error) {
      throw catchErrorServer(error);
    }
  }

  async completePasswordReset(input: {
    code: string;
    newPassword: string;
  }): Promise<void> {
    try {
      const request = create(CompletePasswordResetRequestSchema, {
        code: input.code,
        newPassword: input.newPassword,
      });

      const response =
        await authenticationClient.completePasswordReset(request);

      if (!response.user) {
        throw new Error("unsupported response api");
      }
    } catch (error) {
      throw catchErrorServer(error);
    }
  }
}
