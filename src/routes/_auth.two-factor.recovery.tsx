import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/two-factor/recovery")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/two-factor/recovery"!</div>;
}
