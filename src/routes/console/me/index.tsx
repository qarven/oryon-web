import { createFileRoute } from "@tanstack/react-router";
import { Profile } from "#/features/console/me/presentation/pages/profile";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/console/me/")({
  head: () => ({
    meta: seoMeta({
      title: "Profile · Oryon",
      description: "View your Oryon profile, linked accounts and sessions.",
      path: "/console/me",
    }),
  }),
  component: Profile,
});
