import type { VerificationPurpose } from "./verification-purpose";

export interface VerificationChallenge {
  expiresAt: Date;
  id: string;
  identifier: string;
  purpose: VerificationPurpose;
}
