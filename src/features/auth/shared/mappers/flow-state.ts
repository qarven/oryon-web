import { AuthFlowState } from "@qarven/mono/oryon/identity/v1/enum_pb";
import { FlowState } from "../types/flow-state";

export function toModelFlowState(value: AuthFlowState): FlowState {
  switch (value) {
    case AuthFlowState.PENDING_IDENTIFIER:
      return FlowState.PendingIdentifier;
    case AuthFlowState.PENDING_PASSWORD:
      return FlowState.PendingPassword;
    case AuthFlowState.PENDING_MFA:
      return FlowState.PendingMfa;
    case AuthFlowState.PENDING_VERIFICATION:
      return FlowState.PendingVerification;
    case AuthFlowState.COMPLETED:
      return FlowState.Completed;
    case AuthFlowState.FAILED:
      return FlowState.Failed;
    default:
      return FlowState.Unknown;
  }
}

export function toProtoFlowState(value: FlowState): AuthFlowState {
  switch (value) {
    case FlowState.PendingIdentifier:
      return AuthFlowState.PENDING_IDENTIFIER;
    case FlowState.PendingPassword:
      return AuthFlowState.PENDING_PASSWORD;
    case FlowState.PendingMfa:
      return AuthFlowState.PENDING_MFA;
    case FlowState.PendingVerification:
      return AuthFlowState.PENDING_VERIFICATION;
    case FlowState.Completed:
      return AuthFlowState.COMPLETED;
    case FlowState.Failed:
      return AuthFlowState.FAILED;
    default:
      return AuthFlowState.UNSPECIFIED;
  }
}
