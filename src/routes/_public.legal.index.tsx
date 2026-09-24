import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/legal/")({
  head: () => ({
    meta: [
      {
        title: "Legal · Oryon",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_public/legal"!</div>;
}
