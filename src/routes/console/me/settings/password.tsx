import { createFileRoute } from "@tanstack/react-router";
import { PasswordSettings } from "#/features/console/me/presentation/pages/settings/password";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/console/me/settings/password")({
  head: () => ({
    meta: seoMeta({
      title: "Password settings · Oryon",
      description: "Change your Oryon password.",
      path: "/console/me/settings/password",
    }),
  }),
  component: PasswordSettings,
});
