import { create } from "@bufbuild/protobuf";
import { RegistrationRequestSchema } from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { authenticationClient } from "#/lib/clients";
import { catchErrorServer } from "#/lib/clients/error";
import { convertProtoTimeToDate } from "#/lib/utils/date";
import { toModelFlowState } from "../shared/mappers/flow-state";
import { toModelFlowType } from "../shared/mappers/flow-type";
import type { Flow } from "../shared/types/flow";
import type { RegistrationInput } from "./model";

export const registration = async (input: RegistrationInput): Promise<Flow> => {
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
};
