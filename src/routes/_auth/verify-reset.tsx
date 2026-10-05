import { createFileRoute, notFound } from "@tanstack/react-router";
import { getEmailFn } from "#/features/auth/presentation/controllers/email";
import { getVerificationFn } from "#/features/auth/presentation/controllers/verification";
import { VerifyReset } from "#/features/auth/presentation/pages/verify-reset";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/_auth/verify-reset")({
  head: () => ({
    meta: seoMeta({
      title: "Verify password reset · Oryon",
      description:
        "Verify your password reset request with the code we sent you.",
      path: "/verify-reset",
    }),
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
    return <VerifyReset email={email} />;
  },
});
