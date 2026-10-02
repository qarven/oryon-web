import { Link } from "@tanstack/react-router";
import { Field, FieldDescription } from "#/components/ui/field";
import { FormLayout } from "#/features/auth/shared/components/form-layout";
import { useChangePassword } from "./hooks";

export function ChangePasswordForm() {
  const { form, onSubmitDefault } = useChangePassword();

  return (
    <FormLayout
      onSubmit={onSubmitDefault}
      subtitle="Choose a new password for your account."
      title="Set a new password"
    >
      <form.AppField name="newPassword">
        {(field) => (
          <field.PasswordField
            autoComplete="new-password"
            label="New password"
          />
        )}
      </form.AppField>

      <form.AppField name="confirmPassword">
        {(field) => (
          <field.PasswordField
            autoComplete="new-password"
            label="Confirm new password"
          />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubmitField
          idleText="Set new password"
          pendingText="Setting new password..."
        />
      </form.AppForm>

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
