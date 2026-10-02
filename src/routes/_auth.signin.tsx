import { createFileRoute } from "@tanstack/react-router";
import { SignInForm } from "#/features/auth/signin/sign-in-form";

export const Route = createFileRoute("/_auth/signin")({
  head: () => ({
    meta: [
      {
        title: "Sign in to Oryon · Oryon",
      },
    ],
  }),
  component: SignInForm,
});
