import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/legal/terms-of-service")({
  head: () => ({
    meta: [
      {
        title: "Terms of Service · Oryon",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_public/legal/terms-of-service"!</div>;
}
