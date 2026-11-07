"use client";

import { ErrorFallback } from "@/lib/analytics/error-fallback";

/** Keeps the app frame (navigation) when a signed in page fails, and reports it (issue #242). */
export default function AppError({ error, retry }: { error: unknown; retry: () => void }) {
  return <ErrorFallback error={error} retry={retry} />;
}
