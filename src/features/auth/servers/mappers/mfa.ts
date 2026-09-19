import { MfaFactorType as ProtoMfaFactorType } from "@qarven/mono/oryon/identity/v1/enum_pb";
import { MfaFactorType, type MfaFactorTypeType } from "../../model/enum";

export function toModelMfaFactorType(
  value: ProtoMfaFactorType
): MfaFactorTypeType {
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
