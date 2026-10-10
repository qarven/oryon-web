import { Link } from "@tanstack/react-router";
import { Field, FieldDescription, FieldSeparator } from "#/components/ui/field";
import type { useResetPassword } from "../hooks/use-reset-password";
import { FormLayout } from "./form-layout";

type ResetPasswordFormProps = Pick<
  ReturnType<typeof useResetPassword>,
  "form" | "onSubmitDefault"
>;

export function ResetPasswordForm({
  form,
  onSubmitDefault,
}: ResetPasswordFormProps) {
  return (
    <FormLayout
      onSubmit={onSubmitDefault}
      subtitle="Enter your user account's verified email address."
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

      <form.AppField name="captchaToken">
        {(field) => <field.TurnstileField />}
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
}
