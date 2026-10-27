import Link from "@/components/ui/link";
import { MessageCircle, ShieldCheck, Users } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { feedAccess, getMyCommunity, type MyCommunity } from "@/lib/community/data";
import { EVERYONE, feedHref, sameFeed, type FeedRef } from "@/lib/community/model";

/**
 * Pieces around the feed: the scope switcher, the WhatsApp group link for the
 * current chapter or cohort, and the community guidelines. WhatsApp is the
 * main place to chat; the feed is where posts stay easy to find.
 */

type Entry = { ref: FeedRef; label: string; hint: string };

function entries(me: MyCommunity): Entry[] {
  return [
    { ref: EVERYONE, label: "Everyone", hint: "All learners" },
    ...me.chapters.map((c) => ({
      ref: { scope: "chapter" as const, scopeId: c.id },
      label: c.name,
      hint: c.isLead ? "Your chapter, you lead it" : "Your chapter",
    })),
    ...me.cohorts.map((c) => ({
      ref: { scope: "cohort" as const, scopeId: c.id },
      label: c.name,
      hint: c.isStaff ? "Your cohort, you are staff" : "Your cohort",
    })),
  ];
}

const card = "flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 xl:p-5";
const cardTitle = "text-sm font-semibold tracking-wide text-content-3 uppercase";

/** Every feed the viewer belongs to, as links. `pills` is the compact phone row. */
export function ScopeSwitcher({ me, current, variant }: { me: MyCommunity; current: FeedRef; variant: "rail" | "pills" }) {
  const list = entries(me);
  if (variant === "pills") {
    return (
      <nav aria-label="Feeds" className="-mx-4 overflow-x-auto px-4">
        <ul className="flex gap-2">
          {list.map((e) => {
            const active = sameFeed(e.ref, current);
            return (
              <li key={feedHref(e.ref)} className="shrink-0">
                <Link
                  href={feedHref(e.ref)}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold no-underline ${
                    active ? "border-info-fg/40 bg-info-bg text-info-fg" : "border-line text-content-2 hover:bg-surface-sunken"
                  }`}
                >
                  {e.label}
                </Link>
              </li>
            );
          })}
          {me.isModerator && (
            <li className="shrink-0">
              <Link
                href="/community/moderation"
                className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-semibold text-content-2 no-underline hover:bg-surface-sunken"
              >
                Moderation
              </Link>
            </li>
          )}
        </ul>
      </nav>
    );
  }
  return (
    <section aria-labelledby="feeds-heading" className={card}>
      <h2 id="feeds-heading" className={cardTitle}>
        Feeds
      </h2>
      <nav aria-labelledby="feeds-heading">
        <ul className="flex flex-col gap-1">
          {list.map((e) => {
            const active = sameFeed(e.ref, current);
            return (
              <li key={feedHref(e.ref)}>
                <Link
                  href={feedHref(e.ref)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 flex-col justify-center rounded-md px-3 py-1.5 no-underline ${
                    active ? "bg-info-bg text-info-fg" : "text-content-2 hover:bg-surface-sunken hover:text-content"
                  }`}
                >
                  <span className="text-sm font-semibold">{e.label}</span>
                  <span className={`text-xs ${active ? "text-info-fg" : "text-content-3"}`}>{e.hint}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {me.chapters.length === 0 && (
        <p className="text-sm text-content-2">
          Join a chapter near you to get its feed and WhatsApp group.{" "}
          <Link href="/chapters" className="text-content-link underline">
            See chapters
          </Link>
        </p>
      )}
      {me.isModerator && (
        <Link href="/community/moderation" className={buttonClasses("secondary", "self-start")}>
          <ShieldCheck className="size-4" aria-hidden="true" />
          Moderation queue
        </Link>
      )}
    </section>
  );
}

function WhatsAppButton({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "self-start")}>
      <MessageCircle className="size-4" aria-hidden="true" />
      {label}
    </a>
  );
}

/**
 * The WhatsApp group for the current chapter or cohort, shown prominently.
 * On the everyone feed it lists the viewer's group links instead. Honest
 * when a group has no link yet.
 */
export function WhatsAppCard({ me, current, compact = false }: { me: MyCommunity; current: FeedRef; compact?: boolean }) {
  if (current.scope !== "everyone") {
    const access = feedAccess(me, current);
    if (!access.canPost) return null;
    const what = current.scope === "chapter" ? "chapter" : "cohort";
    return (
      <section
        aria-label="WhatsApp group"
        className={`flex flex-col gap-3 rounded-lg border border-success-fg/30 bg-success-bg p-4 xl:p-5 ${compact ? "sm:flex-row sm:items-center sm:justify-between" : ""}`}
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-success-fg">{access.label} on WhatsApp</h2>
          <p className="text-sm text-content-2">
            {access.whatsappUrl
              ? `Quick questions and day to day chat happen in the ${what} WhatsApp group. Posts here stay easy to find.`
              : `The ${what} WhatsApp group link is not set yet. Your ${what === "chapter" ? "chapter lead" : "mentor"} will add it here.`}
          </p>
        </div>
        {access.whatsappUrl && <WhatsAppButton href={access.whatsappUrl} label={`Open the ${what} group`} />}
      </section>
    );
  }

  const groups = [
    ...me.chapters.map((c) => ({ id: c.id, name: c.name, url: c.whatsappUrl })),
    ...me.cohorts.map((c) => ({ id: c.id, name: c.name, url: c.whatsappUrl })),
  ];
  if (compact && !groups.some((g) => g.url)) return null;
  return (
    <section aria-labelledby="wa-heading" className={card}>
      <h2 id="wa-heading" className={cardTitle}>
        WhatsApp groups
      </h2>
      {groups.length === 0 ? (
        <p className="text-sm text-content-2">
          WhatsApp is where most of our chat happens. Each chapter and cohort has its own group, and you get the link when
          you join one.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {groups.map((g) => (
            <li key={g.id} className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-semibold text-content">{g.name}</span>
              {g.url ? (
                <a
                  href={g.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-sm font-semibold text-content-link hover:bg-surface-sunken"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Open group
                </a>
              ) : (
                <span className="text-sm text-content-3">Link coming</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export const GUIDELINES = [
  "Be kind and patient. Everyone here is learning.",
  "Share what helps: wins, questions, resources and honest feedback.",
  "No spam, scams, adverts or requests for money.",
  "Keep phone numbers and private details out of posts.",
  "Report anything that breaks these rules. Moderators review every report.",
];

export function Guidelines() {
  return (
    <section aria-labelledby="guidelines-heading" className={card}>
      <h2 id="guidelines-heading" className={cardTitle}>
        <Users className="mr-1.5 inline size-4 align-[-2px]" aria-hidden="true" />
        Community guidelines
      </h2>
      <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-content-2">
        {GUIDELINES.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </section>
  );
}

/** The whole rail for a feed or thread. Reads the session: mount inside Suspense. */
export async function CommunityRail({ current }: { current: FeedRef }) {
  const me = await getMyCommunity();
  return (
    <div className="flex flex-col gap-4">
      <ScopeSwitcher me={me} current={current} variant="rail" />
      <WhatsAppCard me={me} current={current} />
      <Guidelines />
    </div>
  );
}

export function RailSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-busy="true">
      <div className="h-48 animate-skeleton rounded-lg bg-surface-sunken" />
      <div className="h-32 animate-skeleton rounded-lg bg-surface-sunken" />
    </div>
  );
}
