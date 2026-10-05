import { VerificationPurpose as ProtoVerificationPurpose } from "@qarven/mono/oryon/identity/v1/enum_pb";
import { VerificationPurpose } from "../../domain/verification-purpose";

export function toModelVerificationPurpose(
  value: ProtoVerificationPurpose
): VerificationPurpose {
  switch (value) {
    case ProtoVerificationPurpose.EMAIL_VERIFICATION:
      return VerificationPurpose.EmailVerification;
    case ProtoVerificationPurpose.PHONE_VERIFICATION:
      return VerificationPurpose.PhoneVerification;
    case ProtoVerificationPurpose.MFA_VERIFICATION:
      return VerificationPurpose.MfaVerification;
    case ProtoVerificationPurpose.PASSWORD_RESET:
      return VerificationPurpose.PasswordReset;
    default:
      return VerificationPurpose.Unknown;
  }
}

export function toProtoVerificationPurpose(
  value: VerificationPurpose
): ProtoVerificationPurpose {
  switch (value) {
    case VerificationPurpose.EmailVerification:
      return ProtoVerificationPurpose.EMAIL_VERIFICATION;
    case VerificationPurpose.PhoneVerification:
      return ProtoVerificationPurpose.PHONE_VERIFICATION;
    case VerificationPurpose.MfaVerification:
      return ProtoVerificationPurpose.MFA_VERIFICATION;
    case VerificationPurpose.PasswordReset:
      return ProtoVerificationPurpose.PASSWORD_RESET;
    default:
      return ProtoVerificationPurpose.UNSPECIFIED;
  }
}
