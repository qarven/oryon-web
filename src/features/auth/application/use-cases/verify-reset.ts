import {
  getVerificationCookie,
  setVerificationCode,
} from "../../infrastructure/cookies/verification";

export interface VerifyResetInput {
  code: string;
}

export interface VerifyResetUseCase {
  exec: (input: VerifyResetInput) => Promise<void>;
}

export class VerifyReset implements VerifyResetUseCase {
  exec(input: VerifyResetInput): Promise<void> {
    const verification = getVerificationCookie();
    if (!verification) {
      throw new Error(
        "Verification session expired. Please request a new code."
      );
    }

    // The code and new password are verified together by
    // CompletePasswordReset. Hold the code in the verification cookie
    // until the new password is collected on /change-password.
    setVerificationCode(verification.id, input.code);

    return Promise.resolve();
  }
}
