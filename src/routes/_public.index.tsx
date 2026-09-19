import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  Code2,
  Fingerprint,
  Globe,
  KeyRound,
  Lock,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Badge } from "#/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";

export const Route = createFileRoute("/_public/")({
  component: () => (
    <>
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <SecuritySection />
    </>
  ),
});

function HeroSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-6 pt-12 pb-16 md:grid-cols-[1.20fr_0.80fr] md:items-center md:pt-20 md:pb-24">
      <div className="flex flex-col items-start gap-6">
        <div className="space-y-4">
          <h1 className="text-balance font-semibold text-4xl leading-[0.95] tracking-tight md:text-5xl lg:text-[3.5rem]">
            Identity that
            <span className="relative inline-block px-2">
              <span className="relative z-10 bg-linear-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                just works
              </span>
            </span>
            for your users
          </h1>
          <p className="max-w-[52ch] text-pretty text-base text-muted-foreground leading-relaxed md:text-lg">
            Oryon is the complete authentication and authorization platform.
            Secure login, MFA, verification and fine-grained permissions. Ready
            to ship in minutes, not months.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-2 text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Check className="size-4 text-primary" />
            No credit card required
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Check className="size-4 text-primary" />
            5-minute setup
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Check className="size-4 text-primary" />
            SOC 2 ready
          </span>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-130 md:ml-auto">
        <img alt="logo-app" height="843" src="/logo.webp" width="1332" />
      </div>
    </section>
  );
}

function SocialProofSection() {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <p className="shrink-0 font-medium text-muted-foreground text-sm">
          Trusted by engineering teams
        </p>
        <div className="flex flex-wrap items-center gap-8 opacity-60 grayscale">
          <span className="flex items-center gap-2 font-semibold text-sm tracking-tight">
            <span className="flex size-6 items-center justify-center rounded bg-foreground text-background text-xs">
              ▲
            </span>
            VERCEL
          </span>
          <span className="font-bold font-mono text-sm tracking-widest">
            LINEAR
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-sm">
            <span className="size-5 rounded-full bg-foreground" />
            PlanetScale
          </span>
          <span className="font-semibold text-sm tracking-tight">SUPABASE</span>
          <span className="font-mono text-sm">◈ Notion</span>
        </div>
        <div className="hidden items-center gap-2 text-muted-foreground text-xs md:flex">
          <Globe className="size-3.5" />
          99.99% uptime • Global edge
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: Lock,
    title: "Passwordless & password auth",
    description:
      "Email, phone, username — with secure password hashing, verification flows and brute-force protection out of the box.",
    colSpan: "md:col-span-2",
  },
  {
    icon: Fingerprint,
    title: "Multi-factor authentication",
    description:
      "TOTP, WebAuthn / Passkeys and recovery codes. Step-up auth for sensitive actions with flexible policies.",
    colSpan: "md:col-span-1",
  },
  {
    icon: ShieldCheck,
    title: "Verification, done right",
    description:
      "Email & phone challenges with expiring codes, rate limiting and automatic invalidation of old attempts.",
    colSpan: "md:col-span-1",
  },
  {
    icon: KeyRound,
    title: "Authorization & permissions",
    description:
      "Fine-grained RBAC. Query user permissions in a single RPC — no more ad-hoc access checks.",
    colSpan: "md:col-span-2",
  },
  {
    icon: Zap,
    title: "Token lifecycle",
    description:
      "Access & refresh tokens, automatic rotation and revocation. Built for distributed services.",
    colSpan: "md:col-span-1",
  },
  {
    icon: Code2,
    title: "Developer-first",
    description:
      "Protobuf & ConnectRPC APIs. Type-safe clients generated for Go and TypeScript. Works everywhere.",
    colSpan: "md:col-span-1",
  },
] as const;

function FeaturesSection() {
  return (
    <section
      className="mx-auto max-w-6xl scroll-mt-16 px-6 py-16 md:py-24"
      id="features"
    >
      <div className="mx-auto max-w-2xl text-center">
        <Badge className="rounded-full" variant="secondary">
          <Sparkles className="size-3" />
          Features
        </Badge>
        <h2 className="mt-4 text-balance font-semibold text-3xl tracking-tight md:text-4xl">
          Everything you need to ship secure auth
        </h2>
        <p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
          From first sign-up to enterprise SSO, Oryon handles the hard parts so
          you can focus on your product.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <Card
            className={`group relative overflow-hidden transition-colors hover:bg-muted/20 ${feature.colSpan}`}
            key={feature.title}
          >
            <CardHeader>
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="size-4" />
              </div>
              <CardTitle className="mt-3 text-[15px]">
                {feature.title}
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card className="border-primary bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <p className="font-mono font-semibold text-3xl tracking-tight">
              99.99%
            </p>
            <p className="text-primary-foreground/80 text-sm">
              Uptime SLA on auth endpoints
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="font-mono font-semibold text-3xl tracking-tight">
              &lt; 50ms
            </p>
            <p className="text-muted-foreground text-sm">
              Median verification latency globally
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="font-mono font-semibold text-3xl tracking-tight">
              SOC 2
            </p>
            <p className="text-muted-foreground text-sm">
              Encryption at rest & in transit
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function SecuritySection() {
  return (
    <section className="border-y bg-card">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-8 rounded-2xl border bg-muted/20 p-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-medium text-xs">
              <ShieldCheck className="size-3.5 text-primary" />
              Security by default
            </div>
            <h2 className="mt-4 font-semibold text-2xl tracking-tight md:text-3xl">
              Built for compliance, without the complexity
            </h2>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed md:text-base">
              Every flow is encrypted, audited and rate-limited. Bring your own
              policies for password strength, session lifetime and MFA
              requirements. We handle the edge cases so you don’t have to.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <span className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                Argon2id hashing
              </span>
              <span className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                Encrypted at rest
              </span>
              <span className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                Rate limiting
              </span>
              <span className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                Audit logs
              </span>
            </div>
          </div>

          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-base">Compliance ready</CardTitle>
              <CardDescription>
                Designed to help you pass SOC 2, ISO 27001 and GDPR reviews
                faster.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-lg border px-3 py-2.5">
                <span className="font-medium">SOC 2 Type II</span>
                <Badge
                  className="rounded-full border-emerald-500/20 bg-emerald-500/10 text-emerald-700"
                  variant="outline"
                >
                  Ready
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border px-3 py-2.5">
                <span className="font-medium">GDPR / Data Residency</span>
                <Badge
                  className="rounded-full border-emerald-500/20 bg-emerald-500/10 text-emerald-700"
                  variant="outline"
                >
                  Ready
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border px-3 py-2.5">
                <span className="font-medium">ISO 27001</span>
                <Badge className="rounded-full" variant="secondary">
                  In progress
                </Badge>
              </div>
              <p className="pt-1 text-muted-foreground text-xs">
                Need a DPA or security questionnaire?{" "}
                <a
                  className="underline underline-offset-4 hover:text-foreground"
                  href="mailto:security@oryon.com"
                >
                  Contact us
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
