/**
 * Canonical origin for metadata, sitemap and robots. Production sets
 * NEXT_PUBLIC_SITE_URL; previews fall back to the production domain Vercel
 * exposes at build time, so canonical links never point at localhost.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
