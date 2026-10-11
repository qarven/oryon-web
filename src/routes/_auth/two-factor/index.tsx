import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/two-factor/")({
  beforeLoad: () => {
    throw redirect({
      to: "/two-factor/app",
      replace: true,
    });
  },
});
