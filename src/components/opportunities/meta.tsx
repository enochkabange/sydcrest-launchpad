import { CalendarClock, MapPin } from "lucide-react";
import { deadlineLabel, kindLabel, locationLabel, type Opportunity } from "@/lib/opportunities/model";

/** The kind as a small label. Words, never colour alone. */
export function KindLabel({ kind }: { kind: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-info-bg px-2 py-0.5 text-xs font-semibold text-info-fg">
      {kindLabel(kind)}
    </span>
  );
}

export function StatusLabel({ status }: { status: "saved" | "applied" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
        status === "applied" ? "bg-success-bg text-success-fg" : "bg-surface-sunken text-content-2"
      }`}
    >
      {status === "applied" ? "Applied" : "Saved"}
    </span>
  );
}

/** Where and until when, as two short lines with icons. */
export function WhereAndWhen({ o, today, className = "" }: { o: Opportunity; today: string; className?: string }) {
  return (
    <ul className={`flex flex-col gap-1 text-sm text-content-2 ${className}`}>
      <li className="flex items-center gap-2">
        <MapPin aria-hidden className="size-4 shrink-0 text-content-3" />
        {locationLabel(o)}
      </li>
      <li className="flex items-center gap-2">
        <CalendarClock aria-hidden className="size-4 shrink-0 text-content-3" />
        {deadlineLabel(o.deadline, today)}
      </li>
    </ul>
  );
}
