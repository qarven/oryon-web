import { createFileRoute } from "@tanstack/react-router";
import { ConnectionSettings } from "#/features/console/me/presentation/pages/settings/connection";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/console/me/settings/connection")({
  head: () => ({
    meta: seoMeta({
      title: "Connection settings · Oryon",
      description: "Manage linked accounts and active sessions.",
      path: "/console/me/settings/connection",
    }),
  }),
  component: ConnectionSettings,
});
