import { Link } from "@tanstack/react-router";
import { MailCheckIcon } from "lucide-react";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card.tsx";
import { Field, FieldDescription, FieldGroup } from "#/components/ui/field";
import type { useResetPassword } from "../hooks/use-reset-password";

type ResetPasswordSuccessProps = Pick<
  ReturnType<typeof useResetPassword>,
  "email" | "reset"
>;

export function ResetPasswordSuccess({
  email,
  reset,
}: ResetPasswordSuccessProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-muted">
            <MailCheckIcon aria-hidden="true" className="size-5" />
          </div>
          <CardTitle className="text-xl">Check your email</CardTitle>
          <CardDescription>
            {email ? (
              <>
                <span>
                  We sent a recovery link to <strong>{email}</strong>.
                </span>

                <br />
                <br />

                <span>
                  If you haven&apos;t received the email, check your spam folder
                  or{" "}
                </span>

                <Button
                  className="h-auto p-0 text-muted-foreground underline hover:text-primary"
                  onClick={reset}
                  type="button"
                  variant="link"
                >
                  Try a different email
                </Button>
              </>
            ) : null}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FieldGroup>
            <Field className="gap-4">
              <FieldDescription className="text-center">
                <span>Remember your password? </span>
                <Link replace to="/signin">
                  Sign in
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
