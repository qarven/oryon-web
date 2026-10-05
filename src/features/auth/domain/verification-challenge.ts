import type { VerificationPurpose } from "./verification-purpose";

export interface VerificationChallenge {
  expiresAt: Date;
  id: bigint;
  identifier: string;
  purpose: VerificationPurpose;
}
