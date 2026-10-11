import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAccessSessionFn } from "#/features/auth/presentation/controllers/access-session-fn";
import { SignIn } from "#/features/auth/presentation/pages/sign-in";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/_auth/signin")({
  head: () => ({
    meta: seoMeta({
      title: "Sign in to Oryon · Oryon",
      description:
        "Sign in to your Oryon account. Secure authentication with MFA, passkeys and fine-grained permissions.",
      path: "/signin",
    }),
  }),
  beforeLoad: async () => {
    const token = await getAccessSessionFn();
    if (token) {
      throw redirect({
        replace: true,
        to: "/console",
      });
    }
  },
  component: SignIn,
});
