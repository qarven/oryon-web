import {
  AuthFlowState,
  AuthFlowType,
} from "@qarven/mono/oryon/identity/v1/enum_pb";
import {
  FlowState,
  type FlowStateType,
  FlowType,
  type FlowTypeType,
} from "../../model/enum";

export function toModelFlowType(value: AuthFlowType): FlowTypeType {
  switch (value) {
    case AuthFlowType.REGISTRATION:
      return FlowType.Registration;
    case AuthFlowType.LOGIN:
      return FlowType.Login;
    case AuthFlowType.RECOVERY:
      return FlowType.Recovery;
    case AuthFlowType.STEP_UP_MFA:
      return FlowType.StepUpMfa;
    default:
      return FlowType.Unknown;
  }
}

export function toModelFlowState(value: AuthFlowState): FlowStateType {
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
