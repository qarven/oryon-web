import { MfaFactorType as ProtoMfaFactorType } from "@qarven/mono/oryon/identity/v1/enum_pb";
import { MfaFactorType } from "../types/mfa-factor-type";

export function toModelMfaFactorType(value: ProtoMfaFactorType): MfaFactorType {
  switch (value) {
    case ProtoMfaFactorType.TOTP:
      return MfaFactorType.Totp;
    case ProtoMfaFactorType.SMS:
      return MfaFactorType.Sms;
    case ProtoMfaFactorType.EMAIL:
      return MfaFactorType.Email;
    case ProtoMfaFactorType.WEBAUTHN:
      return MfaFactorType.Webauthn;
    case ProtoMfaFactorType.BACKUP_CODE:
      return MfaFactorType.BackupCode;
    default:
      return MfaFactorType.Unknown;
  }
}
