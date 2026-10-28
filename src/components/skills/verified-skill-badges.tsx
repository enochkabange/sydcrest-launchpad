import { BadgeCheck } from "lucide-react";
import Link from "@/components/ui/link";
import { formatIssued, sourceLabel, type VerifiedSkill } from "@/lib/skills/verified";

/**
 * Verified skill badges (issue #165), the one component for public profiles,
 * expert pages, the talent directory and the learner's own profile.
 * Visibly different from self declared skills: a tinted badge with a check,
 * and (in the full variant) how it was earned and when. Each badge links to
 * the skill's page, which explains what verification means.
 *
 * - `full`: a list, one badge per row with source and date (profiles).
 * - `compact`: small chips that wrap (cards, directory rows).
 */
export function VerifiedSkillBadges({
  skills,
  variant = "full",
  label = "Verified skills",
}: {
  skills: VerifiedSkill[];
  variant?: "full" | "compact";
  /** Accessible name of the list. */
  label?: string;
}) {
  if (skills.length === 0) return null;

  if (variant === "compact") {
    return (
      <ul aria-label={label} className="flex flex-wrap gap-1.5">
        {skills.map((s) => (
          <li key={s.slug}>
            <span
              className="inline-flex items-center gap-1 rounded-full border border-success-fg/30 bg-success-bg px-2.5 py-0.5 text-xs font-semibold text-success-fg"
              title={`Verified by SydCrest: ${sourceLabel(s.source).toLowerCase()}`}
            >
              <BadgeCheck aria-hidden className="size-3.5 shrink-0" />
              {s.name}
              <span className="sr-only"> (verified)</span>
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul aria-label={label} className="grid gap-2 sm:grid-cols-2">
      {skills.map((s) => (
        <li key={s.slug}>
          <Link
            href={`/skills/${s.slug}`}
            className="flex min-h-14 items-center gap-3 rounded-lg border border-success-fg/30 bg-success-bg px-3 py-2 transition-colors hover:border-success-fg/60"
          >
            <BadgeCheck aria-hidden className="size-6 shrink-0 text-success-fg" />
            <span className="flex min-w-0 flex-col">
              <span className="font-semibold text-content">{s.name}</span>
              <span className="text-sm text-content-2">
                {sourceLabel(s.source)}, {formatIssued(s.issuedAt)}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
