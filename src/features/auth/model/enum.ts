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
