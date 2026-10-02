import { create } from "@bufbuild/protobuf";
import { InitiatePasswordResetRequestSchema } from "@qarven/mono/oryon/identity/v1/authentication_pb";
import { authenticationClient } from "#/lib/clients";
import { catchErrorServer } from "#/lib/clients/error";
import { convertProtoTimeToDate } from "#/lib/utils/date";
import { toModelVerificationPurpose } from "../mappers/verification-purpose";
import type { InitiateVerificationInput } from "../models/initiate-verification";
import type { VerificationChallenge } from "../types/verification-challenge";

export const initiateVerification = async (
  input: InitiateVerificationInput
): Promise<VerificationChallenge> => {
  try {
    const request = create(InitiatePasswordResetRequestSchema, {
      identifier: input.identifier,
    });

    const { challenge } =
      await authenticationClient.initiatePasswordReset(request);

    if (challenge && challenge.expiresAt !== undefined) {
      return {
        id: challenge.id,
        identifier: challenge.identifier,
        purpose: toModelVerificationPurpose(challenge.purpose),
        expiresAt: convertProtoTimeToDate(
          challenge.expiresAt.seconds,
          challenge.expiresAt.nanos
        ),
      };
    }

    throw new Error("unsupported response api");
  } catch (error) {
    throw catchErrorServer(error);
  }
};
