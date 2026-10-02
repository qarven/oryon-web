import { Link } from "@tanstack/react-router";
import { Field, FieldDescription } from "#/components/ui/field";
import { FormLayout } from "#/features/auth/shared/components/form-layout";
import { useVerifyReset } from "./hooks";

export function VerifyResetForm({ email }: { email: string }) {
  const { form, onSubmitDefault } = useVerifyReset();

  return (
    <FormLayout
      onSubmit={onSubmitDefault}
      subtitle={
        <span>
          Enter the code we sent to <strong>{email}</strong>
        </span>
      }
      title="Verify password reset"
    >
      <form.AppField name="code">{(field) => <field.OtpField />}</form.AppField>

      <form.AppForm>
        <form.SubmitField idleText="Verify" pendingText="Verifying..." />
      </form.AppForm>

      <Field className="gap-4">
        <FieldDescription className="text-center">
          <span>Didn&apos;t get a code? </span>
          <Link replace to="/reset-password">
            Back to reset password
          </Link>
        </FieldDescription>
      </Field>
    </FormLayout>
  );
}
