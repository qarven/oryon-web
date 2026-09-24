import { createFileRoute, Link } from "@tanstack/react-router";
import { Fingerprint, LockKeyhole } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Field, FieldDescription, FieldSeparator } from "#/components/ui/field";
import { FormLayout } from "#/features/auth/shared/components/form-layout";
import { useTwoFactorApp } from "#/features/auth/two-factor-app";

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
      subtitle="Enter the code from your two-factor authentication app"
      title="Two-factor authentication"
    >
      <form.AppField name="code">
        {(field) => <field.OtpField label="Authentication code" />}
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
          render={<Link replace to="/two-factor/recovery" />}
          variant="outline"
        >
          <LockKeyhole />
          Use a recovery code
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
