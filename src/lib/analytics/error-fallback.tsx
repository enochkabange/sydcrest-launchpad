"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { reportClientError } from "./client/analytics";

/**
 * What an error boundary shows, and the client_error report behind it
 * (sampled, deduped, scrubbed message and digest only). Used by
 * src/app/global-error.tsx and the signed in area's error.tsx.
 */
export function ErrorFallback({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    reportClientError("boundary", error);
  }, [error]);

  return (
    <div role="alert" className="mx-auto flex w-full max-w-reading flex-col gap-4 py-12">
      <h1 className="text-h2 text-content">Something went wrong</h1>
      <p className="text-body text-content-2">
        This page ran into a problem on our side. Try again; if it keeps happening, go back to your dashboard
        and come back to it later.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => retry()}>Try again</Button>
        {/* A full load, in case the problem is in the page's own code. */}
        <a href="/dashboard" className="inline-flex min-h-11 items-center rounded-md px-4 text-sm font-semibold text-content-2 hover:bg-surface-sunken hover:text-content">
          Go to your dashboard
        </a>
      </div>
    </div>
  );
}
