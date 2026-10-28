import type { ReactNode } from "react";
import Link from "@/components/ui/link";
import { Initials } from "@/components/social/profile-bits";
import { VerifiedSkillBadges } from "@/components/skills/verified-skill-badges";
import { regionLabel } from "@/lib/regions";
import { parseVerifiedSkills } from "@/lib/skills/verified";
import { availabilityLabel, trackLabel } from "@/lib/talent/forms";
import { Badge, Chip, formatDate } from "./bits";

export type TalentRow = {
  profile_id: string | null;
  display_name: string | null;
  public_slug: string | null;
  headline: string | null;
  summary: string | null;
  skills: string[] | null;
  tracks: string[] | null;
  region: string | null;
  availability: string | null;
  open_to_remote: boolean | null;
  portfolio_url: string | null;
  certificates: unknown;
  /** `[{slug, name, source, issued_at}]` from the view (#165); earned, never typed in. */
  verified_skills?: unknown;
};

type Certificate = { program_title?: string; specialization_label?: string | null; issued_at?: string };

export function certificatesOf(row: Pick<TalentRow, "certificates">): Certificate[] {
  return Array.isArray(row.certificates) ? (row.certificates as Certificate[]) : [];
}

/**
 * One learner as organisations see them in the directory. Shows only what the
 * talent_directory view returns: never an email or phone number.
 */
export function TalentCard({
  row,
  href,
  full = false,
  action,
}: {
  row: TalentRow;
  /** Makes the name a link that covers the card. */
  href?: string;
  /** Show the summary and portfolio (detail page and preview). */
  full?: boolean;
  action?: ReactNode;
}) {
  const name = row.display_name ?? "Launchpad learner";
  const region = regionLabel(row.region);
  const certs = certificatesOf(row);
  const verified = parseVerifiedSkills(row.verified_skills);
  return (
    <article className={`relative flex h-full flex-col gap-4 rounded-lg border border-line bg-surface p-5 ${href ? "transition-colors hover:bg-surface-sunken" : ""}`}>
      <header className="flex items-start gap-3">
        <Initials name={name} />
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="text-h3 text-content">
            {href ? (
              <Link href={href} className="after:absolute after:inset-0 after:content-['']">
                {name}
              </Link>
            ) : (
              name
            )}
          </h3>
          {row.headline && <p className="text-content-2">{row.headline}</p>}
          <p className="text-sm text-content-3">
            {[region ? `${region} Region` : null, row.open_to_remote ? "Open to remote" : null].filter(Boolean).join(" · ")}
          </p>
        </div>
      </header>
      <Badge tone="info">{availabilityLabel(row.availability)}</Badge>
      {certs.length > 0 && (
        <ul className="flex flex-col gap-1 text-sm">
          {certs.map((c, i) => (
            <li key={`${c.program_title}-${i}`} className="text-success-fg">
              <span className="font-semibold">Certified:</span> {c.program_title}
              {c.specialization_label ? `, ${c.specialization_label}` : ""}
              {c.issued_at ? <span className="text-content-3"> ({formatDate(c.issued_at)})</span> : null}
            </li>
          ))}
        </ul>
      )}
      {full && row.summary && <p className="whitespace-pre-line text-content-2">{row.summary}</p>}
      {(row.tracks?.length ?? 0) > 0 && (
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-content-2">Tracks</h4>
          <ul className="flex flex-wrap gap-2">
            {row.tracks!.map((t) => (
              <Chip key={t}>{trackLabel(t)}</Chip>
            ))}
          </ul>
        </div>
      )}
      {verified.length > 0 && (
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-content-2">Verified skills</h4>
          <VerifiedSkillBadges skills={verified} variant="compact" label={`Verified skills of ${name}`} />
        </div>
      )}
      {(row.skills?.length ?? 0) > 0 && (
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-content-2">{verified.length > 0 ? "Other skills" : "Skills"}</h4>
          <ul className="flex flex-wrap gap-2">
            {(full ? row.skills! : row.skills!.slice(0, 8)).map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
            {!full && row.skills!.length > 8 && <li className="px-1 py-1 text-sm text-content-3">and {row.skills!.length - 8} more</li>}
          </ul>
        </div>
      )}
      {full && (row.portfolio_url || row.public_slug) && (
        <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {row.portfolio_url && (
            <a href={row.portfolio_url} target="_blank" rel="noopener noreferrer nofollow" className="relative font-semibold text-content-link underline">
              Portfolio
            </a>
          )}
          {row.public_slug && (
            <Link href={`/u/${row.public_slug}`} className="relative font-semibold text-content-link underline">
              Public profile
            </Link>
          )}
        </p>
      )}
      {action && <div className="relative mt-auto">{action}</div>}
    </article>
  );
}
