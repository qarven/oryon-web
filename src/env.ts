import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  emptyStringAsUndefined: true,
  client: {
    VITE_APP_TITLE: z.string(),
    VITE_APP_TURNSTILE_SITE_KEY: z.string(),
    VITE_SITE_URL: z.url(),
  },
  server: {
    ENV: z.string(),
    SERVER_URL: z.url(),
    TURNSTILE_SECRET_KEY: z.string(),
  },
  runtimeEnv: {
    VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE,
    VITE_APP_TURNSTILE_SITE_KEY: import.meta.env.VITE_APP_TURNSTILE_SITE_KEY,
    VITE_SITE_URL: import.meta.env.VITE_SITE_URL,
    //
    ENV: process.env.NODE_ENV,
    SERVER_URL: process.env.SERVER_URL,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  },
});
