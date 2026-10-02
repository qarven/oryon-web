import { createFileRoute } from "@tanstack/react-router";
import { TwoFactorAppForm } from "#/features/auth/two-factor-app/two-factor-app-form";

export const Route = createFileRoute("/_auth/two-factor/app")({
  head: () => ({
    meta: [
      {
        title: "Two-factor authentication · Oryon",
      },
    ],
  }),
  component: TwoFactorAppForm,
});
