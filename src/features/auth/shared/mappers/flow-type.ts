import { AuthFlowType } from "@qarven/mono/oryon/identity/v1/enum_pb";
import { FlowType } from "../types/flow-type";

export function toModelFlowType(value: AuthFlowType): FlowType {
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

export function toProtoFlowType(value: FlowType): AuthFlowType {
  switch (value) {
    case FlowType.Registration:
      return AuthFlowType.REGISTRATION;
    case FlowType.Login:
      return AuthFlowType.LOGIN;
    case FlowType.Recovery:
      return AuthFlowType.RECOVERY;
    case FlowType.StepUpMfa:
      return AuthFlowType.STEP_UP_MFA;
    default:
      return AuthFlowType.UNSPECIFIED;
  }
}
