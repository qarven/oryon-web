import { env } from "#/env";

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify" as const;

interface SiteverifyResponse {
  success: boolean;
}

export const verifyCaptcha = async (token: string): Promise<void> => {
  const response = await fetch(SITEVERIFY_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error("Captcha verification failed, please try again");
  }

  const data = (await response.json()) as SiteverifyResponse;

  if (!data.success) {
    throw new Error("Captcha verification failed, please try again");
  }
};
