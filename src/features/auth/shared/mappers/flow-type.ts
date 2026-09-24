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
