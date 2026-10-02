import { createFileRoute, notFound } from "@tanstack/react-router";
import { getVerificationFn } from "#/app/servers/verification";
import { ChangePasswordForm } from "#/features/auth/change-password/change-password-form";

export const Route = createFileRoute("/_auth/change-password")({
  head: () => ({
    meta: [
      {
        title: "Set a new password · Oryon",
      },
    ],
  }),
  beforeLoad: async () => {
    const verification = await getVerificationFn();
    if (!(verification?.id && verification.code)) {
      throw notFound();
    }
  },
  component: ChangePasswordForm,
});
