import { Link } from "@tanstack/react-router";
import { Field, FieldDescription } from "#/components/ui/field";
import { FormLayout } from "#/features/auth/shared/components/form-layout";
import { useVerifySignUp } from "./hooks";

export function VerifySignUpForm({ email }: { email: string }) {
  const { form, onSubmitDefault } = useVerifySignUp();

  return (
    <FormLayout
      onSubmit={onSubmitDefault}
      subtitle={
        <span>
          Enter the code we sent to <strong>{email}</strong>
        </span>
      }
      title="Verify your account"
    >
      <form.AppField name="code">{(field) => <field.OtpField />}</form.AppField>

      <form.AppForm>
        <form.SubmitField idleText="Verify" pendingText="Verifying..." />
      </form.AppForm>

      <Field className="gap-4">
        <FieldDescription className="text-center">
          <span>Didn&apos;t get a code? </span>
          <Link replace to="/signup">
            Back to sign up
          </Link>
        </FieldDescription>
      </Field>
    </FormLayout>
  );
}
