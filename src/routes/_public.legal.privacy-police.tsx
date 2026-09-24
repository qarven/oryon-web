import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/legal/privacy-police")({
  head: () => ({
    meta: [
      {
        title: "Privacy Policy · Oryon",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_public/legal/privacy-police"!</div>;
}
