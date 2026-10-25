import type { MetadataRoute } from "next";

/**
 * Web app manifest (served at /manifest.webmanifest). Colours mirror the light
 * theme tokens in src/styles/tokens.css: --color-surface for the splash and
 * status bar. Icons are rendered from src/assets/brand (see public/icons).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "SydCrest Launchpad",
    short_name: "SydCrest",
    description:
      "Find your path into tech, learn with people beside you, and earn from your skills. Built in Northern Ghana.",
    start_url: "/dashboard",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "en",
    categories: ["education"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
