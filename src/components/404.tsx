import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";

export function NotFoundComponent() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <img alt="logo-app" height="105" src="/logo.webp" width="166" />
        </div>

        <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="font-semibold text-xl tracking-tight md:text-2xl">
            Page Not Found
          </h1>

          <p className="text-muted-foreground text-sm md:text-base">
            We couldn't find the page you were looking for
          </p>
        </div>

        <div className="flex items-center justify-center">
          <Button type="button" variant="secondary">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
