import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Separator } from "#/components/ui/separator";

export const Route = createFileRoute("/_public")({
  component: () => (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <Header />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  ),
});

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link className="flex items-center gap-2.5" to="/">
          <div className="flex size-10 items-center justify-center rounded-lg">
            <img alt="logo-app" height="54" src="/icon.png" width="133" />
          </div>
          <span className="font-bold text-2xl">Oryon</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <a
            className="rounded-full px-3 py-1.5 font-medium text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground"
            href="#features"
          >
            Features
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button className="rounded-sm" type="button" variant="outline">
            <Link to="/signin">Sign in</Link>
          </Button>

          <Button className="rounded-sm" type="button" variant="default">
            <Link className="text-white" to="/signin">
              Sign up
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-3">
            <Link className="flex items-center gap-2.5" to="/">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ShieldCheck className="size-4" />
              </div>
              <span className="font-semibold tracking-tight">Oryon</span>
            </Link>
            <p className="max-w-[32ch] text-muted-foreground text-sm leading-relaxed">
              Secure authentication and authorization for modern applications.
              Built for developers, trusted by teams.
            </p>
          </div>

          <div>
            <p className="font-medium text-sm">Product</p>
            <ul className="mt-3 space-y-2.5 text-muted-foreground text-sm">
              <li>
                <a
                  className="transition-colors hover:text-foreground"
                  href="#features"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  className="transition-colors hover:text-foreground"
                  href="#how-it-works"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  className="transition-colors hover:text-foreground"
                  href="#developers"
                >
                  Developers
                </a>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-foreground"
                  to="/signup"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-sm">Resources</p>
            <ul className="mt-3 space-y-2.5 text-muted-foreground text-sm">
              <li>
                <a
                  className="transition-colors hover:text-foreground"
                  href="https://github.com/qarven"
                  rel="noopener"
                  target="_blank"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  className="transition-colors hover:text-foreground"
                  href="https://github.com/qarven/oryon-web"
                  rel="noopener"
                  target="_blank"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-foreground"
                  to="/legal/privacy-police"
                >
                  Security
                </Link>
              </li>
              <li>
                <a
                  className="transition-colors hover:text-foreground"
                  href="mailto:hello@oryon.com"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-sm">Legal</p>
            <ul className="mt-3 space-y-2.5 text-muted-foreground text-sm">
              <li>
                <Link
                  className="transition-colors hover:text-foreground"
                  to="/legal/privacy-police"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-foreground"
                  to="/legal/terms-of-service"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  className="transition-colors hover:text-foreground"
                  href="/robots.txt"
                >
                  Robots
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-3 text-muted-foreground text-xs md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Oryon. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with{" "}
            <span aria-hidden className="text-primary">
              ♥
            </span>{" "}
            for developers
          </p>
        </div>
      </div>
    </footer>
  );
}
