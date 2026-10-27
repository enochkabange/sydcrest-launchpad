/**
 * Canonical origin for metadata, sitemap and robots. Production sets
 * NEXT_PUBLIC_SITE_URL; previews fall back to the production domain Vercel
 * exposes at build time, so canonical links never point at localhost.
 *
 * Empty strings count as missing (`||`, not `??`): Vercel returns sensitive
 * variables as "" outside its own builds, and `new URL("")` breaks the build.
 */
export function resolveSiteUrl(env: Record<string, string | undefined>): string {
  const explicit = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit;
  const production = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return `https://${production}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
});
