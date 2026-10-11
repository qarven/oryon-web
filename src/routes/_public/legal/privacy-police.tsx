import { createFileRoute } from "@tanstack/react-router";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/_public/legal/privacy-police")({
  head: () => ({
    meta: seoMeta({
      title: "Privacy Policy · Oryon",
      description: "How Oryon collects, uses and protects your data.",
      path: "/legal/privacy-police",
    }),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_public/legal/privacy-police"!</div>;
}
