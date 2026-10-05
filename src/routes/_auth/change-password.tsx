import { createFileRoute, notFound } from "@tanstack/react-router";
import { getVerificationFn } from "#/features/auth/presentation/controllers/verification";
import { ChangePassword } from "#/features/auth/presentation/pages/change-password";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/_auth/change-password")({
  head: () => ({
    meta: seoMeta({
      title: "Set a new password · Oryon",
      description: "Set a new password for your Oryon account.",
      path: "/change-password",
    }),
  }),
  beforeLoad: async () => {
    const verification = await getVerificationFn();
    if (!(verification?.id && verification.code)) {
      throw notFound();
    }
  },
  component: ChangePassword,
});
