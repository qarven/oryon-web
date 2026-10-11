import { Link } from "@tanstack/react-router";
import { Fingerprint, Info, LockKeyhole, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "#/components/ui/alert";
import { Button } from "#/components/ui/button";
import { Field, FieldDescription, FieldSeparator } from "#/components/ui/field";
import { FormLayout } from "../components/form-layout";
import { useTwoFactorWebauthn } from "../hooks/use-two-factor-webauthn";

export function TwoFactorWebauthn() {
  // Assume WebAuthn is supported until the client proves otherwise. The real
  // check needs `window`, which the server lacks; starting at `false` renders
  // `disabled` into the SSR HTML but not the first client paint, which React
  // reports as a hydration mismatch. The effect below corrects unsupported
  // browsers right after hydration.
  const [isSupported, setIsSupported] = useState(true);
  const { handlePasskey, isPending } = useTwoFactorWebauthn();

  useEffect(() => {
    setIsSupported(typeof window.PublicKeyCredential !== "undefined");
  }, []);

  return (
    <FormLayout
      subtitle="Use a passkey, a security key, or the fingerprint sensor on this device to verify it is you."
      title="Use a passkey"
    >
      <Field className="gap-2">
        <Button
          disabled={!isSupported || isPending}
          onClick={handlePasskey}
          size="lg"
        >
          <Fingerprint />
          {isPending
            ? "Waiting for your security key..."
            : "Sign in with a passkey"}
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
