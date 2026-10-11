import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Field, FieldDescription } from "#/components/ui/field";
import { FormLayout } from "../components/form-layout";
import { useResendSignUp } from "../hooks/use-resend-sign-up";
import { useVerifySignUp } from "../hooks/use-verify-sign-up";

export function VerifySignUp({ email }: { email: string }) {
  const { form, onSubmitDefault } = useVerifySignUp();
  const { resendCode, isPending } = useResendSignUp();

  return (
    <FormLayout
      onSubmit={onSubmitDefault}
      subtitle={
        <span>
          We have sent a code to <strong>{email}</strong>
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
          <span>Didn&apos;t get your email? </span>
          <Button
            className="h-auto p-0 text-muted-foreground underline hover:text-primary"
            disabled={isPending}
            onClick={() => resendCode()}
            type="button"
            variant="link"
          >
            Resend the code
          </Button>
          <span> or </span>
          <Link replace to="/signup">
            update your email address.
          </Link>
        </FieldDescription>
      </Field>
    </FormLayout>
  );
}
