import { Briefcase, Building2, CalendarClock, MapPin, MessageSquare, Wallet } from "lucide-react";
import Link from "@/components/ui/link";
import { initialsOf } from "@/components/social/profile-bits";
import {
  briefKindLabel,
  briefStatusLabel,
  budgetLabel,
  formatDate,
  pitchStatusLabel,
  statusTone,
} from "@/lib/briefs/briefs";
import type { Brief } from "@/lib/briefs/queries";

/** Small pieces shared by the brief board, brief page and the "mine" lists. Server safe. */

export function Pill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${className}`}>
      {children}
    </span>
  );
}

export function KindPill({ kind }: { kind: string }) {
  return (
    <Pill className={kind === "job" ? "bg-warning-bg text-warning-fg" : "bg-surface-sunken text-content-2"}>
      {kind === "job" && <Briefcase aria-hidden className="size-3.5" />}
      {briefKindLabel(kind)}
    </Pill>
  );
}

export function BriefStatusPill({ status }: { status: string }) {
  return <Pill className={statusTone(status)}>{briefStatusLabel(status)}</Pill>;
}

export function PitchStatusPill({ status }: { status: string }) {
  return <Pill className={statusTone(status)}>{pitchStatusLabel(status)}</Pill>;
}

export function SkillList({ skills, max }: { skills: string[]; max?: number }) {
  if (skills.length === 0) return null;
  const shown = max ? skills.slice(0, max) : skills;
  const more = skills.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Skills">
      {shown.map((s) => (
        <li key={s} className="rounded-md border border-line bg-surface px-2 py-0.5 text-xs text-content-2">
          {s}
        </li>
      ))}
      {more > 0 && <li className="px-1 py-0.5 text-xs text-content-3">and {more} more</li>}
    </ul>
  );
}

/** Who posted: the organisation for a job brief, else the person. Initials only, never an invented photo. */
export function PosterLine({ brief }: { brief: Brief }) {
  const name = brief.organisation_name ?? brief.poster_name ?? "A SydCrest member";
  return (
    <p className="flex items-center gap-2 text-sm text-content-2">
      <span
        aria-hidden
        className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-xs font-semibold text-content-2 ring-1 ring-line"
      >
        {brief.organisation_name ? <Building2 className="size-3.5" /> : initialsOf(name)}
      </span>
      <span className="min-w-0">
        {name}
        {brief.organisation_name && brief.organisation_verified && <span className="text-content-3"> · verified organisation</span>}
      </span>
    </p>
  );
}

/** Budget, place, deadline and pitch count, each only when there is a value. */
export function BriefFacts({ brief, showPitches = true }: { brief: Brief; showPitches?: boolean }) {
  const budget = budgetLabel(brief.indicative_budget_ghs);
  const place = brief.is_remote ? (brief.location ? `Remote or ${brief.location}` : "Remote") : brief.location;
  const facts = [
    budget && { icon: Wallet, text: budget },
    place && { icon: MapPin, text: place },
    brief.deadline && { icon: CalendarClock, text: `By ${formatDate(brief.deadline)}` },
    showPitches && { icon: MessageSquare, text: pitchCount(brief.pitch_count ?? 0) },
  ].filter((f): f is { icon: typeof Wallet; text: string } => !!f);
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-content-2">
      {facts.map(({ icon: Icon, text }) => (
        <li key={text} className="inline-flex items-center gap-1.5">
          <Icon aria-hidden className="size-4 text-content-3" />
          {text}
        </li>
      ))}
    </ul>
  );
}

export function pitchCount(n: number): string {
  return n === 0 ? "No pitches yet" : n === 1 ? "1 pitch" : `${n} pitches`;
}

/** A brief on the board: the whole card is one link to the brief. */
export function BriefCard({ brief }: { brief: Brief }) {
  return (
    <article className="relative flex h-full flex-col gap-3 rounded-lg border border-line bg-surface p-5 transition-colors hover:border-line-strong xl:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <KindPill kind={brief.kind} />
        {brief.can_manage && <Pill className="bg-info-bg text-info-fg">Yours</Pill>}
        {brief.my_pitch_status && <PitchStatusPill status={brief.my_pitch_status} />}
        <span className="ml-auto text-xs text-content-3">Posted {formatDate(brief.created_at)}</span>
      </div>
      <h3 className="text-h3 text-content">
        <Link
          href={`/briefs/${brief.id}`}
          className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-blue-600"
        >
          {brief.title}
        </Link>
      </h3>
      <p className="line-clamp-3 text-sm text-content-2">{brief.description}</p>
      <SkillList skills={brief.skills} max={5} />
      <div className="mt-auto flex flex-col gap-2 border-t border-line pt-3">
        <PosterLine brief={brief} />
        <BriefFacts brief={brief} />
      </div>
    </article>
  );
}

export function PageHeading({ eyebrow, title, lead, actions }: { eyebrow: string; title: string; lead?: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold tracking-widest text-content-3 uppercase">{eyebrow}</p>
        <h1 className="text-title text-content">{title}</h1>
        {lead && <div className="max-w-reading text-lead text-content-2">{lead}</div>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </header>
  );
}

export function Skeleton({ className = "h-64" }: { className?: string }) {
  return <div className={`${className} animate-skeleton rounded-lg bg-surface-sunken`} />;
}
