import { createFileRoute } from "@tanstack/react-router";
import { ResetPassword } from "#/features/auth/presentation/pages/reset-password";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/_auth/reset-password")({
  head: () => ({
    meta: seoMeta({
      title: "Reset your password · Oryon",
      description: "Reset your Oryon account password.",
      path: "/reset-password",
    }),
  }),
  component: ResetPassword,
});
