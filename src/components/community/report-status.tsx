"use client";

import { useState, useTransition } from "react";
import { setReportStatus } from "@/lib/community/actions";
import { Button } from "@/components/ui/button";

const NEXT: Record<string, { status: string; label: string }[]> = {
  open: [
    { status: "reviewing", label: "Mark reviewing" },
    { status: "actioned", label: "Actioned" },
    { status: "dismissed", label: "Dismiss" },
  ],
  reviewing: [
    { status: "actioned", label: "Actioned" },
    { status: "dismissed", label: "Dismiss" },
    { status: "open", label: "Reopen" },
  ],
  actioned: [{ status: "open", label: "Reopen" }],
  dismissed: [{ status: "open", label: "Reopen" }],
};

/** Moves a report along: open, reviewing, then actioned or dismissed. */
export function ReportStatusButtons({ id, status }: { id: string; status: string }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <div className="flex flex-wrap items-center gap-2">
      {(NEXT[status] ?? []).map((n) => (
        <Button
          key={n.status}
          variant={n.status === "actioned" ? "primary" : "secondary"}
          disabled={pending}
          onClick={() =>
            start(async () => {
              setError(null);
              const res = await setReportStatus(id, n.status);
              if (res.error) setError(res.error);
            })
          }
        >
          {n.label}
        </Button>
      ))}
      {error && (
        <p role="alert" className="basis-full text-sm text-danger-fg">
          {error}
        </p>
      )}
    </div>
  );
}
