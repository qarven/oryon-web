import { create } from "@bufbuild/protobuf";
import { LogoutRequestSchema } from "@qarven/mono/oryon/identity/v1/session_pb";
import { sessionClient } from "#/lib/clients";
import { catchErrorServer } from "#/lib/clients/error";
import type { SessionService } from "../../application/ports/session-service";

export class Session implements SessionService {
  async logout(input: { refreshToken: string }): Promise<void> {
    try {
      const request = create(LogoutRequestSchema, {
        refreshToken: input.refreshToken,
      });

      await sessionClient.logout(request);
    } catch (error) {
      throw catchErrorServer(error);
    }
  }
}
