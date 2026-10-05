export const FlowType = {
  Unknown: 0,
  Registration: 1,
  Login: 2,
  Recovery: 3,
  StepUpMfa: 4,
} as const;

export type FlowType = (typeof FlowType)[keyof typeof FlowType];
