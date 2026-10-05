import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAccessSessionFn } from "#/features/auth/presentation/controllers/access-session-fn";
import { SignUp } from "#/features/auth/presentation/pages/sign-up";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/_auth/signup")({
  head: () => ({
    meta: seoMeta({
      title: "Sign up to Oryon · Oryon",
      description:
        "Create your Oryon account. Complete authentication and authorization platform ready to ship in minutes.",
      path: "/signup",
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
  component: SignUp,
});
