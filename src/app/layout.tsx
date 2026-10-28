import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { DataSaverFlag } from "@/components/pwa/data-saver";
import { ServiceWorker } from "@/components/pwa/service-worker";
import { DisplayPrefsRoot } from "@/components/display/display-sync";
import { DISPLAY_SCRIPT } from "@/lib/display/script";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const urbanist = localFont({
  src: "./fonts/urbanist-variable.woff2",
  weight: "300 900",
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SydCrest Launchpad",
    template: "%s · SydCrest Launchpad",
  },
  description:
    "Find your path into tech, learn with people beside you, and earn from your skills. Built in Northern Ghana.",
  applicationName: "SydCrest Launchpad",
  appleWebApp: { capable: true, title: "SydCrest", statusBarStyle: "default" },
  formatDetection: { telephone: false },
};

// Status bar colour follows --color-surface in tokens.css for each theme.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#14171c" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The inline script sets data-theme and the other display attributes on
    // <html> before the first paint (issue #204); suppressHydrationWarning
    // lets React keep them. No cookie read, so every page stays prerendered.
    <html lang="en" className={urbanist.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: DISPLAY_SCRIPT }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        {children}
        <ServiceWorker />
        <DataSaverFlag />
        <DisplayPrefsRoot />
      </body>
    </html>
  );
}
