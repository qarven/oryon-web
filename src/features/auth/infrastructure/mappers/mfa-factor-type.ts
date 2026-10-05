import { MfaFactorType as ProtoMfaFactorType } from "@qarven/mono/oryon/identity/v1/enum_pb";
import { MfaFactorType } from "../../domain/mfa-factor-type";

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

export function toProtoMfaFactorType(value: MfaFactorType): ProtoMfaFactorType {
  switch (value) {
    case MfaFactorType.Totp:
      return ProtoMfaFactorType.TOTP;
    case MfaFactorType.Sms:
      return ProtoMfaFactorType.SMS;
    case MfaFactorType.Email:
      return ProtoMfaFactorType.EMAIL;
    case MfaFactorType.Webauthn:
      return ProtoMfaFactorType.WEBAUTHN;
    case MfaFactorType.BackupCode:
      return ProtoMfaFactorType.BACKUP_CODE;
    default:
      return ProtoMfaFactorType.UNSPECIFIED;
  }
}
