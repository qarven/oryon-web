import { createFileRoute } from "@tanstack/react-router";
import { SignUpForm } from "#/features/auth/signup/sign-up-form";

export const Route = createFileRoute("/_auth/signup")({
  head: () => ({
    meta: [
      {
        title: "Sign up to Oryon · Oryon",
      },
    ],
  }),
  component: SignUpForm,
});
