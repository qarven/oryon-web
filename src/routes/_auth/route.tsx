import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { FieldDescription } from "#/components/ui/field";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          className="flex items-center gap-2 self-center font-medium"
          to="/"
        >
          <img alt="logo-app" height="105" src="/logo.webp" width="166" />
        </Link>

        <Outlet />

        <FieldDescription className="px-6 text-center">
          <span>See our </span>
          <Link to="/legal/terms-of-service">Terms of Service</Link>
          <span> and </span>
          <Link to="/legal/privacy-police">Privacy Policy</Link>.
        </FieldDescription>
      </div>
    </div>
  );
}
