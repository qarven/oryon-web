import { createFileRoute, Link } from "@tanstack/react-router";
import { Google } from "#/components/logos/google";
import { Button } from "#/components/ui/button";
import { Field, FieldDescription, FieldSeparator } from "#/components/ui/field";
import { FormLayout } from "#/features/auth/components/form-layout";
import { useSignUp } from "#/features/auth/hooks/use-signup";

export const Route = createFileRoute("/_auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const { form, onSubmitDefault } = useSignUp();

  return (
    <FormLayout
      onSubmit={onSubmitDefault}
      subtitle="Enter your credentials to continue"
      title="Sign In"
    >
      <form.AppField name="name">
        {(field) => (
          <field.TextField
            autoComplete="name"
            label="Name"
            placeholder="John Doe"
          />
        )}
      </form.AppField>

      <form.AppField name="email">
        {(field) => (
          <field.TextField
            autoComplete="email"
            label="Email"
            placeholder="email@oryon.com"
          />
        )}
      </form.AppField>

      <form.AppField name="password">
        {(field) => (
          <field.PasswordField
            autoComplete="current-password"
            label="Password"
          />
        )}
      </form.AppField>

      <form.AppField name="captchaToken">
        {(field) => <field.TurnstileField />}
      </form.AppField>

      <form.AppForm>
        <form.SubmitField
          idleText="Create account"
          pendingText="Creating account..."
        />
      </form.AppForm>

      <FieldDescription className="mt-0 text-justify text-xs">
        <span>By creating an account, you agree to the </span>
        <Link to="/legal/terms-of-service">Terms of Service</Link>
        <span>. For more information about privacy practices, see the </span>
        <Link to="/legal/privacy-police">Privacy Statement</Link>
      </FieldDescription>

      <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
        OR
      </FieldSeparator>

      <Field className="gap-4">
        <Button type="button" variant="outline">
          <Google />
          Continue with Google
        </Button>

        <FieldDescription className="text-center">
          <span>Already have an Atlassian account? </span>
          <Link replace to="/signin">
            Log in
          </Link>
        </FieldDescription>
      </Field>
    </FormLayout>
  );
}
