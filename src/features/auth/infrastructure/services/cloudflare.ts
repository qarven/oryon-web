import { env } from "#/env";
import { catchErrorServer } from "#/lib/clients/error";
import type { CaptchaService } from "../../application/ports/captcha-service";

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify" as const;

interface SiteverifyResponse {
  success: boolean;
}

export class Cloudflare implements CaptchaService {
  async verify(token: string): Promise<void> {
    try {
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
    } catch (error) {
      throw catchErrorServer(error);
    }
  }
}
