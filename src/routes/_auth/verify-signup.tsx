import { createFileRoute, notFound } from "@tanstack/react-router";
import { getEmailFn } from "#/features/auth/presentation/controllers/email";
import { getFlowFn } from "#/features/auth/presentation/controllers/flow";
import { VerifySignUp } from "#/features/auth/presentation/pages/verify-signup";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/_auth/verify-signup")({
  head: () => ({
    meta: seoMeta({
      title: "Verify your account · Oryon",
      description: "Verify your Oryon account with the code we sent you.",
      path: "/verify-signup",
    }),
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
    return <VerifySignUp email={email} />;
  },
});
