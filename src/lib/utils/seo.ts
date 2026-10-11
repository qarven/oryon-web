import { env } from "#/env";

const SITE_URL = env.VITE_SITE_URL;
const DEFAULT_IMAGE = `${SITE_URL}/logo.webp`;

interface SeoOptions {
  description: string;
  path: string;
  title: string;
}

export function seoMeta({ title, description, path }: SeoOptions) {
  const url = `${SITE_URL}${path}`;
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: DEFAULT_IMAGE },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:url", content: url },
    { name: "twitter:image", content: DEFAULT_IMAGE },
  ];
}
