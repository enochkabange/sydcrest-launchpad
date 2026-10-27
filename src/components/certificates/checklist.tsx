import { Check, Circle } from "lucide-react";
import { checklistItems, type CertificationStatus } from "@/lib/certificates/status";

/**
 * The four steps to a certificate as a list. Presentational and server safe:
 * pass the status from certification_status (see CertificationChecklist for
 * the version that loads it). Each step says done or not in words as well
 * as with the icon.
 */
export function ChecklistView({
  status,
  issued = false,
  audience = "learner",
  compact = false,
}: {
  status: CertificationStatus;
  issued?: boolean;
  audience?: "learner" | "staff";
  compact?: boolean;
}) {
  const items = checklistItems(status, { issued, audience });
  return (
    <ol className={`flex flex-col ${compact ? "gap-2" : "gap-3"}`}>
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className={`mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full ${
              item.done ? "bg-success-bg text-success-fg ring-1 ring-success-fg/40" : "text-content-3 ring-1 ring-line-strong"
            }`}
          >
            {item.done ? <Check className="size-4" strokeWidth={3} /> : <Circle className="size-2 fill-current" />}
          </span>
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="font-semibold text-content">
              {item.label}
              <span className="sr-only">{item.done ? " (done)" : " (not yet)"}</span>
            </p>
            {!compact && <p className="text-sm text-content-2">{item.detail}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
