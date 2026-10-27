import { Badge, formatDate } from "./bits";

const KIND_LABELS: Record<string, string> = {
  job: "Job",
  internship: "Internship",
  scholarship: "Scholarship",
  grant: "Grant",
  gig: "Gig",
};

export function opportunityKindLabel(kind: string) {
  return KIND_LABELS[kind] ?? kind;
}

const STATUS = { draft: "Draft", open: "Open", closed: "Closed" } as const;

export type OpportunityRow = { id: string; title: string; kind: string; status: string; deadline: string | null; location: string | null; is_remote: boolean };

/** An organisation's opportunities as a plain list (member view shows drafts and status too). */
export function OpportunityList({ rows, showStatus }: { rows: OpportunityRow[]; showStatus: boolean }) {
  return (
    <ul className="flex flex-col divide-y divide-line rounded-lg border border-line">
      {rows.map((o) => (
        <li key={o.id} className="flex flex-col gap-1 px-4 py-3 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="flex min-w-0 flex-col gap-1">
            <p className="font-semibold text-content">{o.title}</p>
            <p className="text-sm text-content-2">
              {[opportunityKindLabel(o.kind), o.location, o.is_remote ? "Remote friendly" : null].filter(Boolean).join(" · ")}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {o.deadline && <span className="text-sm text-content-3">Closes {formatDate(o.deadline)}</span>}
            {showStatus && <Badge tone={o.status === "open" ? "success" : "neutral"}>{STATUS[o.status as keyof typeof STATUS] ?? o.status}</Badge>}
          </div>
        </li>
      ))}
    </ul>
  );
}
