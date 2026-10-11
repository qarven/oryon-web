import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/console/me/notifications")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/console/me/notifications"!</div>;
}
