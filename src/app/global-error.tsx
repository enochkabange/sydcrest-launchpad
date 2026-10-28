"use client";

import "./globals.css";
import { ErrorFallback } from "@/lib/analytics/error-fallback";

/**
 * Last resort error boundary: replaces the root layout, so it brings its own
 * document and styles. Reports the error to first party analytics (issue #242).
 */
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col bg-surface px-4">
        <title>Something went wrong · SydCrest Launchpad</title>
        <ErrorFallback error={error} retry={retry} />
      </body>
    </html>
  );
}
