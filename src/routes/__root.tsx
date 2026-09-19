import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import { ThemeProvider } from "#/app/providers/theme-provider";
import appCss from "#/app/styles.css?url";
import { NotFoundComponent } from "#/components/404";
import { Toaster } from "#/components/ui/toast";
import { TooltipProvider } from "#/components/ui/tooltip";
import { getLocale } from "#/libraries/paraglide/runtime";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Oryon",
      },
      {
        name: "description",
        content: "Oryon development by creating an account on GitHub.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { href: "/favicon.ico", rel: "icon", type: "image/x-icon" },
      {
        href: "/favicon-16x16.png",
        rel: "icon",
        sizes: "16x16",
        type: "image/png",
      },
      {
        href: "/favicon-32x32.png",
        rel: "icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        href: "/apple-touch-icon.png",
        rel: "apple-touch-icon",
        sizes: "180x180",
      },
      { href: "/manifest.json", rel: "manifest" },
      { color: "#000000", href: "/safari-pinned-tab.svg", rel: "mask-icon" },
    ],
  }),
  notFoundComponent: NotFoundComponent,
  shellComponent: ({ children }: { children: ReactNode }) => (
    <html lang={getLocale()} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <Toaster />
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>

        <TanStackDevtools
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            {
              name: "Tanstack Query",
              render: <ReactQueryDevtoolsPanel />,
            },
            {
              name: "Tanstack Form",
              render: <FormDevtoolsPanel />,
            },
          ]}
        />

        <Scripts />
      </body>
    </html>
  ),
});
