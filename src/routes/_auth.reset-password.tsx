import { createFileRoute } from "@tanstack/react-router";
import { ResetPasswordForm } from "#/features/auth/reset-password/reset-password-form";

export const Route = createFileRoute("/_auth/reset-password")({
  head: () => ({
    meta: [
      {
        title: "Reset your password · Oryon",
      },
    ],
  }),
  component: ResetPasswordForm,
});
