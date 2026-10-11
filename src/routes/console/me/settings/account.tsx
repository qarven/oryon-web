import { createFileRoute } from "@tanstack/react-router";
import { AccountSettings } from "#/features/console/me/presentation/pages/settings/account";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/console/me/settings/account")({
  head: () => ({
    meta: seoMeta({
      title: "Account settings · Oryon",
      description: "Manage your profile, email and account.",
      path: "/console/me/settings/account",
    }),
  }),
  component: AccountSettings,
});
