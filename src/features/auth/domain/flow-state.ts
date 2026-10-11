export const FlowState = {
  Unknown: 0,
  PendingIdentifier: 1,
  PendingPassword: 2,
  PendingMfa: 3,
  PendingVerification: 4,
  Completed: 5,
  Failed: 6,
} as const;

export type FlowState = (typeof FlowState)[keyof typeof FlowState];
