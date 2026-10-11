import { createFileRoute } from "@tanstack/react-router";
import { NotificationsSettings } from "#/features/console/me/presentation/pages/settings/notifications";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/console/me/settings/notifications")({
  head: () => ({
    meta: seoMeta({
      title: "Notification settings · Oryon",
      description: "Choose what lands in your inbox.",
      path: "/console/me/settings/notifications",
    }),
  }),
  component: NotificationsSettings,
});
