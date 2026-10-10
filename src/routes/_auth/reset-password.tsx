import { createFileRoute } from "@tanstack/react-router";
import { ResetPassword } from "#/features/auth/presentation/pages/reset-password";
import { seoMeta } from "#/lib/utils/seo";

export const Route = createFileRoute("/_auth/reset-password")({
  head: () => ({
    meta: seoMeta({
      title: "Reset your password · Oryon",
      description: "Reset your Oryon account password.",
      path: "/reset-password",
    }),
  }),
  validateSearch: (search: Record<string, unknown>): { token?: string } => {
    if (typeof search.token === "string" && search.token.trim() !== "") {
      return { token: search.token };
    }
    return {};
  },
  component: () => {
    const { token } = Route.useSearch();
    return <ResetPassword token={token} />;
  },
});
