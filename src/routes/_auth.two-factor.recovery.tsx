import { createFileRoute, Link } from "@tanstack/react-router";
import { Fingerprint, Smartphone } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Field, FieldDescription, FieldSeparator } from "#/components/ui/field";
import { FormLayout } from "#/features/auth/shared/components/form-layout";
import { useTwoFactorRecovery } from "#/features/auth/two-factor-recovery";

export const Route = createFileRoute("/_auth/two-factor/recovery")({
  head: () => ({
    meta: [
      {
        title: "Two-factor recovery · Oryon",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { form, onSubmitDefault } = useTwoFactorRecovery();

  return (
    <FormLayout
      onSubmit={onSubmitDefault}
      subtitle="Enter one of the recovery codes you saved when you enabled two-factor authentication. Each code can only be used once."
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
