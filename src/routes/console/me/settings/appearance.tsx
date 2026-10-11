import { createFileRoute } from "@tanstack/react-router";
import { AppearanceSettings } from "#/features/console/me/presentation/pages/settings/appearance";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/console/me/settings/appearance")({
  head: () => ({
    meta: seoMeta({
      title: "Appearance settings · Oryon",
      description: "Customize theme, language and timezone.",
      path: "/console/me/settings/appearance",
    }),
  }),
  component: AppearanceSettings,
});
