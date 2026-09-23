import { createFileRoute, Link } from "@tanstack/react-router";
import { Field, FieldDescription, FieldSeparator } from "#/components/ui/field";
import { useResetPassword } from "#/features/auth/hooks/use-reset-password";
import { FormLayout } from "#/features/auth/shared/components/form-layout";

export const Route = createFileRoute("/_auth/reset-password")({
  head: () => ({
    meta: [
      {
        title: "Reset your password · Oryon",
      },
    ],
  }),
  component: () => {
    const { form, onSubmitDefault } = useResetPassword();

    return (
      <FormLayout
        onSubmit={onSubmitDefault}
        subtitle="Enter your user account's verified email address and we will send you a password reset link."
        title="Reset your password"
      >
        <form.AppField name="email">
          {(field) => (
            <field.TextField
              autoComplete="email"
              label="Email"
              placeholder="email@oryon.com"
            />
          )}
        </form.AppField>

        <form.AppForm>
          <form.SubmitField
            idleText="Send recovery link"
            pendingText="Sending recovery link..."
          />
        </form.AppForm>

        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          OR
        </FieldSeparator>

        <Field className="gap-4">
          <FieldDescription className="text-center">
            <span>Remember your password? </span>
            <Link replace to="/signin">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FormLayout>
    );
  },
});
