import { createFileRoute } from "@tanstack/react-router";
import { TwoFactorRecovery } from "#/features/auth/presentation/pages/two-factor-recovery";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/_auth/two-factor/recovery")({
  head: () => ({
    meta: seoMeta({
      title: "Two-factor recovery · Oryon",
      description: "Recover access to your Oryon account with a recovery code.",
      path: "/two-factor/recovery",
    }),
  }),
  component: TwoFactorRecovery,
});
