import type { FlowState } from "./flow-state";
import type { FlowType } from "./flow-type";

export interface Flow {
  expiresAt: Date;
  flowState: FlowState;
  flowType: FlowType;
  id: bigint;
}
