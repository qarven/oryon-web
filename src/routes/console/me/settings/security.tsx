import { createFileRoute } from "@tanstack/react-router";
import { SecuritySettings } from "#/features/console/me/presentation/pages/settings/security";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/console/me/settings/security")({
  head: () => ({
    meta: seoMeta({
      title: "Security settings · Oryon",
      description: "Manage two-factor authentication and passkeys.",
      path: "/console/me/settings/security",
    }),
  }),
  component: SecuritySettings,
});
