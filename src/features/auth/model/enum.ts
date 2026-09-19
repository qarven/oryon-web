export const MfaFactorType = {
  Unknown: 0,
  Totp: 1,
  Sms: 2,
  Email: 3,
  Webauthn: 4,
  BackupCode: 5,
} as const;

export type MfaFactorTypeType =
  (typeof MfaFactorType)[keyof typeof MfaFactorType];

export const FlowType = {
  Unknown: 0,
  Registration: 1,
  Login: 2,
  Recovery: 3,
  StepUpMfa: 4,
} as const;

export type FlowTypeType = (typeof FlowType)[keyof typeof FlowType];

export const FlowState = {
  Unknown: 0,
  PendingIdentifier: 1,
  PendingPassword: 2,
  PendingMfa: 3,
  PendingVerification: 4,
  Completed: 5,
  Failed: 6,
} as const;

export type FlowStateType = (typeof FlowState)[keyof typeof FlowState];
