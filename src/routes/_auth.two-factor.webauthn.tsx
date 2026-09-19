import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/two-factor/webauthn")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/two-factor/webauthn"!</div>;
}
