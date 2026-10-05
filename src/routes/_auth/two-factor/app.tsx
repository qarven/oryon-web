import { createFileRoute } from "@tanstack/react-router";
import { TwoFactorApp } from "#/features/auth/presentation/pages/two-factor-app";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/_auth/two-factor/app")({
  head: () => ({
    meta: seoMeta({
      title: "Two-factor authentication · Oryon",
      description: "Secure your Oryon account with an authenticator app.",
      path: "/two-factor/app",
    }),
  }),
  component: TwoFactorApp,
});
