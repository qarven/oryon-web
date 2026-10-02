import { createFileRoute, notFound } from "@tanstack/react-router";
import { getEmailFn } from "#/app/servers/email";
import { getFlowFn } from "#/app/servers/flow";
import { VerifySignUpForm } from "#/features/auth/verify-signup/verify-signup-form";

export const Route = createFileRoute("/_auth/verify-signup")({
  head: () => ({
    meta: [
      {
        title: "Verify your account · Oryon",
      },
    ],
  }),
  beforeLoad: async () => {
    const [flow, email] = await Promise.all([getFlowFn(), getEmailFn()]);
    if (!(flow && email)) {
      throw notFound();
    }

    return { flow, email };
  },
  component: () => {
    const { email } = Route.useRouteContext();
    return <VerifySignUpForm email={email} />;
  },
});
