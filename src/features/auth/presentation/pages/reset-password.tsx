import { Link } from "@tanstack/react-router";
import { Field, FieldDescription, FieldSeparator } from "#/components/ui/field";
import { FormLayout } from "../components/form-layout";
import { useResetPassword } from "../hooks/use-reset-password";

export function ResetPassword() {
  const { form, onSubmitDefault } = useResetPassword();

  return (
    <FormLayout
      onSubmit={onSubmitDefault}
      subtitle="Enter your user account's verified email address and we will send you a verification code."
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
