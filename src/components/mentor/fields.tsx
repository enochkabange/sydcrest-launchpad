import type { ReactNode } from "react";
import type { CellState } from "@/lib/mentor/progress";

const PILL = {
  neutral: "border-line text-content-2",
  info: "border-info-fg/30 bg-info-bg text-info-fg",
  success: "border-success-fg/30 bg-success-bg text-success-fg",
  warning: "border-warning-fg/30 bg-warning-bg text-warning-fg",
  danger: "border-danger-fg/30 bg-danger-bg text-danger-fg",
} as const;

export function Pill({ tone = "neutral", children }: { tone?: keyof typeof PILL; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm whitespace-nowrap ${PILL[tone]}`}>{children}</span>
  );
}

/** Colour and short mark for each progress grid cell; the label carries the meaning for screen readers. */
export const CELL_STYLE: Record<CellState, { className: string; mark: string }> = {
  passed: { className: "bg-success-bg text-success-fg", mark: "" },
  below: { className: "bg-danger-bg text-danger-fg", mark: "" },
  waiting: { className: "bg-info-bg text-info-fg", mark: "Review" },
  returned: { className: "bg-surface-sunken text-content-2", mark: "Back" },
  late: { className: "bg-danger-bg text-danger-fg", mark: "Late" },
  overdue: { className: "bg-warning-bg text-warning-fg", mark: "Due" },
  upcoming: { className: "text-content-3", mark: "" },
};

/** A titled card for rails and sections. */
export function Card({ title, children, as: Tag = "section" }: { title: string; children: ReactNode; as?: "section" | "div" }) {
  return (
    <Tag className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4">
      <h2 className="text-h3 font-semibold text-content">{title}</h2>
      {children}
    </Tag>
  );
}

/** An honest empty state that fills its column. */
export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-dashed border-line-strong bg-surface-sunken p-6">
      <p className="font-semibold text-content">{title}</p>
      {children && <div className="text-sm text-content-2">{children}</div>}
    </div>
  );
}
