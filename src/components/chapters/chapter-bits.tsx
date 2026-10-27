import Link from "@/components/ui/link";
import { Initials } from "@/components/social/profile-bits";
import { statusCopy } from "@/lib/chapters/model";
import type { ChapterPerson, PublicChapter } from "@/lib/chapters/public";
import { regionLabel } from "@/lib/regions";

/** Small pieces shared by /chapters, a chapter page, the admin editor and the dashboard. */

const BADGE_TONES: Record<string, string> = {
  active: "border-success-fg/30 bg-success-bg text-success-fg",
  launching: "border-info-fg/30 bg-info-bg text-info-fg",
  planned: "border-line bg-surface-sunken text-content-2",
};

export function StatusBadge({ status, label }: { status: string; label?: string }) {
  return (
    <span
      className={`inline-flex items-center self-start rounded-full border px-2.5 py-0.5 text-xs font-semibold ${BADGE_TONES[status] ?? BADGE_TONES.planned}`}
    >
      {label ?? statusCopy(status).label}
    </span>
  );
}

export function placeLabel(city: string, region: string) {
  const label = regionLabel(region);
  return label ? `${city}, ${label} Region` : city;
}

/** A person in a chapter: initials, name (linked when their profile is public) and an optional note. */
export function PersonRow({ person, note, you = false }: { person: ChapterPerson; note?: string; you?: boolean }) {
  const name = person.display_name;
  const inner = (
    <>
      <Initials name={name} />
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-semibold text-content">{you ? `${name} (you)` : name}</span>
        {note && <span className="text-sm text-content-3">{note}</span>}
      </span>
    </>
  );
  return person.public_slug ? (
    <Link
      href={`/u/${person.public_slug}`}
      className="flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-md no-underline hover:bg-surface-sunken"
    >
      {inner}
    </Link>
  ) : (
    <span className="flex min-h-11 min-w-0 flex-1 items-center gap-3">{inner}</span>
  );
}

function leadLine(leads: ChapterPerson[]) {
  if (leads.length === 0) return "Looking for a chapter lead";
  const names = leads.map((l) => l.display_name);
  return `Led by ${names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}` : names[0]}`;
}

/** A chapter in the list. The whole card is the link. */
export function ChapterCard({ chapter, leads }: { chapter: PublicChapter; leads: ChapterPerson[] }) {
  return (
    <li className="relative flex flex-col gap-3 rounded-lg border border-line p-5 transition-colors hover:border-line-strong hover:bg-surface-sunken">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <StatusBadge status={chapter.status} />
        <span className="text-sm text-content-3">{placeLabel(chapter.city, chapter.region)}</span>
      </div>
      <h2 className="text-h3 text-content">
        <Link href={`/chapters/${chapter.slug}`} className="text-content no-underline after:absolute after:inset-0 after:content-['']">
          {chapter.name}
        </Link>
      </h2>
      <p className="line-clamp-3 text-sm text-content-2">{chapter.summary ?? statusCopy(chapter.status).summary}</p>
      <p className="mt-auto border-t border-line pt-3 text-sm text-content-3">{leadLine(leads)}</p>
    </li>
  );
}

/** A northern capital with no chapter yet: honest, no link, no join button. */
export function PlannedCard({ city, regionLabel: region, first }: { city: string; regionLabel: string; first: boolean }) {
  return (
    <li className="flex flex-col gap-3 rounded-lg border border-dashed border-line-strong bg-surface-sunken p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <StatusBadge status="planned" label={first ? "Starting first" : "Planned"} />
        <span className="text-sm text-content-3">{region} Region</span>
      </div>
      <h2 className="text-h3 text-content">{city}</h2>
      <p className="text-sm text-content-2">
        {first
          ? "The first chapter is being set up here. Its page opens once the team and a lead are in place."
          : "Planned after Tamale. Its page opens once a lead is in place."}
      </p>
    </li>
  );
}
