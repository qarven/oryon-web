import { createFileRoute, Link } from "@tanstack/react-router";
import { Field, FieldDescription, FieldSeparator } from "#/components/ui/field";
import { FormLayout } from "#/features/auth/components/form-layout";
import { useTwoFactorApp } from "#/features/auth/hooks/use-two-factor-app";

export const Route = createFileRoute("/_auth/two-factor/app")({
  head: () => ({
    meta: [
      {
        title: "Two-factor authentication · Oryon",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { form, onSubmitDefault } = useTwoFactorApp();

  return (
    <FormLayout
      onSubmit={onSubmitDefault}
      subtitle="Enter the 6-digit code from your authenticator app"
      title="Two-factor authentication"
    >
      <form.AppField name="code">
        {(field) => (
          <field.OtpField
            label="Authentication code"
            onComplete={() => form.handleSubmit()}
          />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubmitField idleText="Verify" pendingText="Verifying..." />
      </form.AppForm>

      <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
        OR
      </FieldSeparator>

      <Field className="gap-4">
        <FieldDescription className="text-center">
          <span>Can't access your authenticator app? </span>
          <Link replace to="/two-factor/recovery">
            Use a recovery code
          </Link>
        </FieldDescription>

        <FieldDescription className="text-center">
          <span>Prefer a security key? </span>
          <Link replace to="/two-factor/webauthn">
            Use WebAuthn
          </Link>
        </FieldDescription>

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
