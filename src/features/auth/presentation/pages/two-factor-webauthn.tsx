import { Link } from "@tanstack/react-router";
import { Fingerprint, Info, LockKeyhole, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "#/components/ui/alert";
import { Button } from "#/components/ui/button";
import { Field, FieldDescription, FieldSeparator } from "#/components/ui/field";
import { toast } from "#/components/ui/toast";
import { FormLayout } from "../components/form-layout";

export function TwoFactorWebauthn() {
  // A browser without WebAuthn cannot complete this step at all, so disable the
  // call to action instead of letting it fail on click. Checked in an effect
  // because the server has no `window`, and rendering the check directly would
  // mismatch on hydration.
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(typeof window.PublicKeyCredential !== "undefined");
  }, []);

  const handlePasskey = () => {
    // TODO: no backend support yet, so this cannot be completed.
    //
    // 1. A "begin" RPC is required to start the ceremony. Nothing in the proto
    //    serves one: `AuthenticationService` has no WebAuthn RPC, and
    //    `VerificationChallenge` (`authentication.proto:43`) is an
    //    identifier + `VerificationPurpose` OTP challenge, not a WebAuthn
    //    challenge. It must return the `PublicKeyCredentialRequestOptionsJSON`
    //    (challenge, rpId, allowCredentials, userVerification).
    // 2. Call `navigator.credentials.get()` with those options.
    // 3. A "finish" RPC is required to verify the resulting
    //    `PublicKeyCredentialJSON`. `CompleteMfaRequest`
    //    (`authentication.proto:146`) is only `{ flow_id, code, factor_type }`,
    //    so an assertion cannot be carried in `code`, and it is unverifiable
    //    without the challenge the server never issued.
    toast.add({
      type: "info",
      title: "Passkeys are not available yet",
      description:
        "Passkey verification needs backend support before it can be used.",
    });
  };

  return (
    <FormLayout
      subtitle="Use a passkey, a security key, or the fingerprint sensor on this device to verify it is you."
      title="Use a passkey"
    >
      <Field className="gap-2">
        <Button disabled={!isSupported} onClick={handlePasskey} size="lg">
          <Fingerprint />
          Sign in with a passkey
        </Button>
      </Field>

      {isSupported ? null : (
        <Alert>
          <Info />
          <AlertTitle>Passkeys are unavailable</AlertTitle>
          <AlertDescription>
            This browser does not support passkeys. Use an authenticator app or
            a recovery code instead.
          </AlertDescription>
        </Alert>
      )}

      <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
        OR
      </FieldSeparator>

      <Field className="gap-2">
        <Button
          nativeButton={false}
          render={<Link replace to="/two-factor/app" />}
          variant="outline"
        >
          <Smartphone />
          Use an authenticator app
        </Button>

        <Button
          nativeButton={false}
          render={<Link replace to="/two-factor/recovery" />}
          variant="outline"
        >
          <LockKeyhole />
          Use a recovery code
        </Button>
      </Field>

      <Field className="gap-4">
        <FieldDescription className="text-center">
          <span>Wrong account? </span>
          <Link replace to="/signin">
            Back to sign in
          </Link>
        </FieldDescription>
      </Field>
    </FormLayout>
  );
}
