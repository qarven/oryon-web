import { createFileRoute } from "@tanstack/react-router";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/_public/legal/terms-of-service")({
  head: () => ({
    meta: seoMeta({
      title: "Terms of Service · Oryon",
      description: "The terms that govern your use of the Oryon platform.",
      path: "/legal/terms-of-service",
    }),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_public/legal/terms-of-service"!</div>;
}
