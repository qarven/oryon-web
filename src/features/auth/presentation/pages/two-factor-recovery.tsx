import { Link } from "@tanstack/react-router";
import { Fingerprint, Smartphone } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Field, FieldDescription, FieldSeparator } from "#/components/ui/field";
import { FormLayout } from "../components/form-layout";
import { useTwoFactorRecovery } from "../hooks/use-two-factor-recovery";

export function TwoFactorRecovery() {
  const { form, onSubmitDefault } = useTwoFactorRecovery();

  return (
    <FormLayout
      onSubmit={onSubmitDefault}
      subtitle="Enter one of the recovery codes you saved when you enabled two-factor authentication."
      title="Use a recovery code"
    >
      <form.AppField name="code">
        {(field) => (
          <field.TextField
            autoCapitalize="none"
            autoComplete="one-time-code"
            label="Recovery code"
            placeholder="xxxx-xxxx"
            spellCheck={false}
          />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubmitField idleText="Verify" pendingText="Verifying..." />
      </form.AppForm>

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
          render={<Link replace to="/two-factor/webauthn" />}
          variant="outline"
        >
          <Fingerprint />
          Use passkey
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
