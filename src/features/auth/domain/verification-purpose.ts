export const VerificationPurpose = {
  Unknown: 0,
  EmailVerification: 1,
  PhoneVerification: 2,
  PasswordReset: 3,
  MfaVerification: 4,
} as const;

export type VerificationPurpose =
  (typeof VerificationPurpose)[keyof typeof VerificationPurpose];
