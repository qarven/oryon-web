import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/two-factor/webauthn")({
  head: () => ({
    meta: [
      {
        title: "Sign in with a security key · Oryon",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/two-factor/webauthn"!</div>;
}
