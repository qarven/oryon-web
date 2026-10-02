import { createFileRoute, notFound } from "@tanstack/react-router";
import { getEmailFn } from "#/app/servers/email";
import { getVerificationFn } from "#/app/servers/verification";
import { VerifyResetForm } from "#/features/auth/verify-reset/verify-reset-form";

export const Route = createFileRoute("/_auth/verify-reset")({
  head: () => ({
    meta: [
      {
        title: "Verify password reset · Oryon",
      },
    ],
  }),
  beforeLoad: async () => {
    const [verification, email] = await Promise.all([
      getVerificationFn(),
      getEmailFn(),
    ]);
    if (!(verification && email)) {
      throw notFound();
    }

    return { verification, email };
  },
  component: () => {
    const { email } = Route.useRouteContext();
    return <VerifyResetForm email={email} />;
  },
});
