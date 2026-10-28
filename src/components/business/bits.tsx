import type { ReactNode } from "react";
import { VERIFICATION, type VerificationStatus } from "@/lib/organisations/forms";

/** Small shared pieces for business accounts and the talent directory (issue #161). Server safe. */

const TONES = {
  neutral: "border-line bg-surface-sunken text-content-2",
  info: "border-info-fg/30 bg-info-bg text-info-fg",
  success: "border-success-fg/30 bg-success-bg text-success-fg",
  danger: "border-danger-fg/30 bg-danger-bg text-danger-fg",
  warning: "border-warning-fg/30 bg-warning-bg text-warning-fg",
} as const;
export type Tone = keyof typeof TONES;

export function Badge({ tone = "neutral", className = "", children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center self-start rounded-full border px-2.5 py-0.5 text-sm font-semibold whitespace-nowrap ${TONES[tone]} ${className}`}>
      {children}
    </span>
  );
}

export function VerificationBadge({ status }: { status: string }) {
  const v = VERIFICATION[status as VerificationStatus] ?? VERIFICATION.unverified;
  return <Badge tone={v.tone}>{v.label}</Badge>;
}

export function Chip({ children }: { children: ReactNode }) {
  return <li className="rounded-full border border-line bg-surface-sunken px-3 py-1 text-sm text-content">{children}</li>;
}

/** A bordered card that fills its slot: rail cards, honest empty states. */
export function Panel({
  title,
  children,
  tone = "plain",
  headingLevel = 2,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  tone?: "plain" | "sunken";
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <section className={`flex flex-col gap-3 rounded-lg border border-line p-5 xl:p-6 ${tone === "sunken" ? "bg-surface-sunken" : "bg-surface"} ${className}`}>
      {title && <H className="text-h3 text-content">{title}</H>}
      {children}
    </section>
  );
}

export function formatDate(iso: string | null | undefined) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Accra" }).format(
    new Date(iso),
  );
}

export function Skeleton({ className = "h-64" }: { className?: string }) {
  return <div className={`animate-skeleton rounded-lg bg-surface-sunken ${className}`} />;
}
