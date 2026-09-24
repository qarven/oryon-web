import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  emptyStringAsUndefined: true,
  client: {
    VITE_APP_TITLE: z.string(),
    VITE_APP_TURNSTILE_SITE_KEY: z.string(),
  },
  server: {
    ENV: z.string(),
    SERVER_URL: z.url(),
  },
  runtimeEnv: {
    VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE,
    VITE_APP_TURNSTILE_SITE_KEY: import.meta.env.VITE_APP_TURNSTILE_SITE_KEY,
    //
    ENV: process.env.NODE_ENV,
    SERVER_URL: process.env.SERVER_URL,
  },
});
