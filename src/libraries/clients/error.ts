import { ConnectError } from "@connectrpc/connect";

export function catchErrorServer(error: unknown): Error {
  if (error instanceof ConnectError) {
    throw new Error(error.rawMessage);
  }

  throw new Error("Something went wrong, please try again later");
}
