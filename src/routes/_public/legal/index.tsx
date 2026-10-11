import { createFileRoute } from "@tanstack/react-router";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/_public/legal/")({
  head: () => ({
    meta: seoMeta({
      title: "Legal · Oryon",
      description: "Legal documents for the Oryon platform.",
      path: "/legal",
    }),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_public/legal"!</div>;
}
