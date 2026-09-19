import { paraglideVitePlugin } from "@inlang/paraglide-js";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    paraglideVitePlugin({
      localStorageKey: "locale",
      project: "./project.inlang",
      outdir: "./src/libraries/paraglide",
      outputStructure: "message-modules",
      strategy: ["url", "localStorage", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["en", "/en/:path(.*)?"],
            ["id", "/id/:path(.*)?"],
          ],
        },
      ],
    }),
    nitro({
      compressPublicAssets: {
        brotli: true,
        gzip: true,
      },
      rollupConfig: { external: [/^@sentry\//] },
    }),
    tailwindcss(),
    tanstackStart({
      router: {
        entry: "app/router.tsx",
        generatedRouteTree: "app/route-tree.gen.ts",
      },
      server: {
        entry: "app/server.ts",
      },
      start: {
        entry: "app/start.ts",
      },
    }),
    viteReact(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
});

export default config;
