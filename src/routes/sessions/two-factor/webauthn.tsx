import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sessions/two-factor/webauthn")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/sessions/two-factor/webauthn"!</div>;
}
