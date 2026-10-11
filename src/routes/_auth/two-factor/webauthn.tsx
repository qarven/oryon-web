import { createFileRoute } from "@tanstack/react-router";
import { TwoFactorWebauthn } from "#/features/auth/presentation/pages/two-factor-webauthn";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/_auth/two-factor/webauthn")({
  head: () => ({
    meta: seoMeta({
      title: "Sign in with a security key · Oryon",
      description: "Sign in to Oryon with a passkey or security key.",
      path: "/two-factor/webauthn",
    }),
  }),
  component: TwoFactorWebauthn,
});
