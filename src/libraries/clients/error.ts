import { Code, ConnectError } from "@connectrpc/connect";
import { setResponseStatus } from "@tanstack/react-start/server";

export function catchErrorServer(error: unknown): Error {
  let message = "Something went wrong, please try again later";
  let code = 500;
  if (error instanceof ConnectError) {
    message = error.rawMessage || error.message;
    code = codeToHttpStatus(error.code);
  }

  setResponseStatus(code);

  throw new Error(message);
}

/**
 * Maps Connect RPC error codes to HTTP status codes.
 * See https://connectrpc.com/docs/protocol#error-codes
 */
function codeToHttpStatus(code: Code): number {
  switch (code) {
    case Code.Canceled:
      return 499;
    case Code.Unknown:
      return 500;
    case Code.InvalidArgument:
      return 400;
    case Code.DeadlineExceeded:
      return 504;
    case Code.NotFound:
      return 404;
    case Code.AlreadyExists:
      return 409;
    case Code.PermissionDenied:
      return 403;
    case Code.ResourceExhausted:
      return 429;
    case Code.FailedPrecondition:
      return 400;
    case Code.Aborted:
      return 409;
    case Code.OutOfRange:
      return 400;
    case Code.Unimplemented:
      return 501;
    case Code.Internal:
      return 500;
    case Code.Unavailable:
      return 503;
    case Code.DataLoss:
      return 500;
    case Code.Unauthenticated:
      return 401;
    default:
      return 500;
  }
}
