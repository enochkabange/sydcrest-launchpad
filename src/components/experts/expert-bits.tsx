import { BadgeCheck, Clock, MessageCircle, Star } from "lucide-react";
import { initialsOf } from "@/components/social/profile-bits";
import {
  ratingLabel,
  responseTimeLabel,
  sessionsLabel,
  type DirectoryExpert,
} from "@/lib/experts/directory";

/** Small pieces shared by the expert directory, expert page and offer page. Server safe. */

const AVATAR = { sm: "size-12 text-base", md: "size-16 text-xl", lg: "size-20 text-2xl lg:size-24" } as const;

/** The expert's own photo when they set one, else their initials. We never invent photos. */
export function ExpertAvatar({ expert, size = "sm" }: { expert: Pick<DirectoryExpert, "name" | "avatarUrl">; size?: keyof typeof AVATAR }) {
  if (expert.avatarUrl) {
    return (
      // An external avatar (Google sign in); next/image would need every host allow listed.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={expert.avatarUrl} alt="" className={`shrink-0 rounded-full object-cover ring-1 ring-line ${AVATAR[size]}`} />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-surface-sunken font-semibold text-content-2 ring-1 ring-line ${AVATAR[size]}`}
    >
      {initialsOf(expert.name)}
    </span>
  );
}

/**
 * The admin's trust flag on an expert (expert_profiles.is_verified). There is
 * no ID check behind it yet, so it says SydCrest vouches, not that an
 * identity was checked (founder decision on #191). Verified skills are a
 * separate badge (#165).
 */
export function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-info-bg px-2.5 py-0.5 text-xs font-semibold text-info-fg">
      <BadgeCheck aria-hidden className="size-3.5" />
      Verified by SydCrest
    </span>
  );
}

export function FeaturedBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-warning-bg px-2.5 py-0.5 text-xs font-semibold text-warning-fg">
      Featured
    </span>
  );
}

/**
 * Trust signals, only the ones backed by real rows: a rating appears after
 * the first review, sessions after the first completed booking, response time
 * after three answered requests. A new expert says so plainly.
 */
export function TrustFacts({ expert, layout = "inline" }: { expert: DirectoryExpert; layout?: "inline" | "stacked" }) {
  const rating = ratingLabel(expert.averageRating, expert.reviewCount);
  const sessions = sessionsLabel(expert.completedBookings);
  const response = responseTimeLabel(expert.medianResponseHours);
  const facts = [
    rating && { icon: Star, text: rating, key: "rating" },
    sessions && { icon: MessageCircle, text: sessions, key: "sessions" },
    response && { icon: Clock, text: response, key: "response" },
  ].filter(Boolean) as { icon: typeof Star; text: string; key: string }[];

  if (facts.length === 0) {
    return <p className="text-sm text-content-3">New on SydCrest, no reviews yet</p>;
  }
  return (
    <ul className={layout === "inline" ? "flex flex-wrap gap-x-4 gap-y-1" : "flex flex-col gap-2"}>
      {facts.map(({ icon: Icon, text, key }) => (
        <li key={key} className="flex items-center gap-1.5 text-sm text-content-2">
          <Icon aria-hidden className="size-4 shrink-0 text-content-3" />
          {text}
        </li>
      ))}
    </ul>
  );
}

export function SkillChips({ skills, max }: { skills: string[]; max?: number }) {
  const shown = max ? skills.slice(0, max) : skills;
  const more = skills.length - shown.length;
  if (skills.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Skills">
      {shown.map((skill) => (
        <li key={skill} className="rounded-full border border-line bg-surface-sunken px-2.5 py-0.5 text-xs text-content">
          {skill}
        </li>
      ))}
      {more > 0 && <li className="px-1 py-0.5 text-xs text-content-3">and {more} more</li>}
    </ul>
  );
}

/** JSON-LD for search engines. `<` is escaped so user text can never close the script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
