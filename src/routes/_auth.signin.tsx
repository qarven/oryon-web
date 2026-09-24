import { createFileRoute, Link } from "@tanstack/react-router";
import { Google } from "#/components/logos/google";
import { Button } from "#/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldSeparator,
} from "#/components/ui/field.tsx";
import { FormLayout } from "#/features/auth/shared/components/form-layout";
import { useSignIn } from "#/features/auth/signin";

export const Route = createFileRoute("/_auth/signin")({
  head: () => ({
    meta: [
      {
        title: "Sign in to Oryon · Oryon",
      },
    ],
  }),
  component: () => {
    const { form, onSubmitDefault } = useSignIn();

    return (
      <FormLayout
        onSubmit={onSubmitDefault}
        subtitle="Enter your credentials to continue"
        title="Sign In"
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

        <form.AppField name="password">
          {(field) => (
            <field.PasswordField
              autoComplete="current-password"
              label="Password"
            />
          )}
        </form.AppField>

        <form.AppForm>
          <form.SubmitField idleText="Sign In" pendingText="Signing in..." />
        </form.AppForm>

        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          OR
        </FieldSeparator>

        <Field className="gap-4">
          <Button type="button" variant="outline">
            <Google />
            Continue with Google
          </Button>

          <FieldDescription className="text-center">
            <span>Don't have an account? </span>
            <Link replace to="/signup">
              Create account
            </Link>
          </FieldDescription>

          <FieldDescription className="text-center text-sm">
            <span>Trouble signing in? </span>
            <Link replace to="/reset-password">
              Reset password
            </Link>
          </FieldDescription>
        </Field>
      </FormLayout>
    );
  },
});
