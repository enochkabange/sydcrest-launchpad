import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { MainWithRail } from "@/components/ui/layout";
import { PersonRow, placeLabel, StatusBadge } from "@/components/chapters/chapter-bits";
import { isJoinable, statusCopy } from "@/lib/chapters/model";
import { getChapterLeads, getPublicChapter, getPublicChapters, type PublicChapter } from "@/lib/chapters/public";
import { getChapterRoster, getChapterViewer, getUpcomingChapterEvents, type Viewer } from "@/lib/chapters/viewer";
import { ChapterDetailsForm, MembershipButton, RemoveMemberButton } from "./controls";
import { ChapterFeedSlot } from "./feed-slot";

/** Placeholder so the build has one param when the database is unreachable (CI). */
const PLACEHOLDER_SLUG = "chapter";

/**
 * Visible chapters are prerendered at build; one created later renders on its
 * first visit, then is cached. The chapter, its leads and WhatsApp link are
 * public and cached; join and leave, the member list, upcoming events and the
 * lead tools are read per request inside <Suspense>.
 */
export async function generateStaticParams() {
  const chapters = await getPublicChapters();
  return chapters.length ? chapters.map(({ slug }) => ({ slug })) : [{ slug: PLACEHOLDER_SLUG }];
}

export async function generateMetadata({ params }: PageProps<"/chapters/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const chapter = await getPublicChapter(slug);
  if (!chapter) return { title: "Chapter not found", robots: { index: false } };
  return {
    title: chapter.name,
    description: chapter.summary ?? `The Launchpad chapter in ${placeLabel(chapter.city, chapter.region)}. ${statusCopy(chapter.status).summary}`,
    alternates: { canonical: `/chapters/${chapter.slug}` },
  };
}

export default function ChapterPage({ params }: PageProps<"/chapters/[slug]">) {
  return (
    <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
      <Chapter params={params} />
    </Suspense>
  );
}

const islandFallback = <div className="h-24 animate-skeleton rounded-lg bg-surface-sunken" />;

async function Chapter({ params }: Pick<PageProps<"/chapters/[slug]">, "params">) {
  const { slug } = await params;
  const chapter = await getPublicChapter(slug);
  if (!chapter) notFound();
  const leads = await getChapterLeads(chapter.id);
  const status = statusCopy(chapter.status);

  return (
    <article className="flex flex-col gap-8">
      <Link href="/chapters" className="-mb-4 inline-flex min-h-11 items-center self-start text-sm text-content-link">
        All chapters
      </Link>
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={chapter.status} />
          <span className="text-sm text-content-3">{placeLabel(chapter.city, chapter.region)}</span>
        </div>
        <h1 className="text-title text-content">{chapter.name}</h1>
        <p className="max-w-reading whitespace-pre-line text-lead text-content-2">{chapter.summary ?? status.summary}</p>
        {chapter.summary && <p className="text-sm text-content-3">{status.summary}</p>}
      </header>

      <MainWithRail
        railLabel="Membership, leads and WhatsApp group"
        railFirst
        rail={
          <>
            <Suspense fallback={islandFallback}>
              <Membership chapter={chapter} />
            </Suspense>
            <WhatsappCard chapter={chapter} />
            <Card title={leads.length > 1 ? "Chapter leads" : "Chapter lead"}>
              {leads.length === 0 ? (
                <p className="text-sm text-content-2">
                  This chapter is looking for a volunteer lead. The lead runs local events and the WhatsApp group.
                </p>
              ) : (
                <ul className="flex flex-col gap-1">
                  {leads.map((l) => (
                    <li key={l.profile_id}>
                      <PersonRow person={l} note="Chapter lead" />
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </>
        }
      >
        <section aria-labelledby="events-heading" className="flex flex-col gap-3">
          <h2 id="events-heading" className="text-subtitle text-content">
            Upcoming events
          </h2>
          <Suspense fallback={islandFallback}>
            <UpcomingEvents chapter={chapter} />
          </Suspense>
        </section>
        <Suspense fallback={islandFallback}>
          <MembersOnly chapter={chapter} />
        </Suspense>
      </MainWithRail>
    </article>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-line p-5">
      <h2 className="text-h3 text-content">{title}</h2>
      {children}
    </section>
  );
}

function WhatsappCard({ chapter }: { chapter: PublicChapter }) {
  return (
    <Card title="WhatsApp group">
      {chapter.whatsapp_url ? (
        <>
          <p className="text-sm text-content-2">Day to day chat for the chapter happens in its WhatsApp group.</p>
          <a href={chapter.whatsapp_url} target="_blank" rel="noopener noreferrer" className={buttonClasses("secondary", "self-start")}>
            Open the WhatsApp group
          </a>
        </>
      ) : (
        <p className="text-sm text-content-2">The chapter lead will add the group link here once it is ready.</p>
      )}
    </Card>
  );
}

/** Join or leave, depending on who is looking. */
async function Membership({ chapter }: { chapter: PublicChapter }) {
  const viewer = await getChapterViewer(chapter.id);
  const joinable = isJoinable(chapter.status);
  if (!viewer) {
    return (
      <Card title="Join this chapter">
        <p className="text-sm text-content-2">
          {joinable ? "Sign in to join and see who else is in the chapter." : statusCopy(chapter.status).summary}
        </p>
        {joinable && (
          <Link href={`/login?next=/chapters/${chapter.slug}`} className={buttonClasses("primary", "self-start")}>
            Sign in to join
          </Link>
        )}
      </Card>
    );
  }
  if (viewer.role) {
    return (
      <Card title={viewer.role === "lead" ? "You lead this chapter" : "You are a member"}>
        <p className="text-sm text-content-2">
          {viewer.role === "lead"
            ? "You can edit the chapter page and manage members below."
            : "You see the member list and chapter posts. You can leave at any time."}
        </p>
        <MembershipButton chapterId={chapter.id} slug={chapter.slug} member name={chapter.name} />
      </Card>
    );
  }
  return (
    <Card title="Join this chapter">
      <p className="text-sm text-content-2">
        {joinable
          ? "Members see who else is in the chapter and its posts, and hear about local events first."
          : statusCopy(chapter.status).summary}
      </p>
      {joinable && <MembershipButton chapterId={chapter.id} slug={chapter.slug} member={false} name={chapter.name} />}
    </Card>
  );
}

const EVENT_KIND: Record<string, string> = {
  skillshop: "Skillshop",
  webinar: "Webinar",
  flagship: "Flagship event",
  activation: "Activation",
};

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Africa/Accra",
  }).format(new Date(iso));
}

async function UpcomingEvents({ chapter }: { chapter: PublicChapter }) {
  const events = await getUpcomingChapterEvents(chapter.id);
  if (events.length === 0) {
    return (
      <div className="rounded-lg border border-line bg-surface-sunken p-5 text-sm text-content-2">
        No events are scheduled yet.{" "}
        {chapter.status === "launching"
          ? "The first Skillshop is being planned; members hear about it first."
          : "New events show here as soon as they are published."}
      </div>
    );
  }
  return (
    <ul className="flex flex-col divide-y divide-line rounded-lg border border-line">
      {events.map((e) => (
        <li key={e.slug}>
          <Link
            href={`/events/${e.slug}`}
            className="flex min-h-14 flex-col gap-1 px-4 py-3 no-underline transition-colors hover:bg-surface-sunken sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <span className="flex min-w-0 flex-col">
              <span className="font-semibold text-content">{e.title}</span>
              <span className="text-sm text-content-3">
                {EVENT_KIND[e.kind] ?? "Event"} · {e.format === "online" ? "Online" : (e.venue_name ?? e.city ?? "In person")}
              </span>
            </span>
            <time dateTime={e.starts_at} className="shrink-0 text-sm text-content-2">
              {formatWhen(e.starts_at)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Chapter posts, members and lead tools: members and admins only. */
async function MembersOnly({ chapter }: { chapter: PublicChapter }) {
  const viewer = await getChapterViewer(chapter.id);
  if (!viewer?.role && !viewer?.isAdmin) {
    return (
      <section aria-labelledby="members-heading" className="flex flex-col gap-3">
        <h2 id="members-heading" className="text-subtitle text-content">
          Members
        </h2>
        <div className="rounded-lg border border-line bg-surface-sunken p-5 text-sm text-content-2">
          The member list and chapter posts are for members. {isJoinable(chapter.status) ? "Join to see them." : ""}
        </div>
      </section>
    );
  }
  const roster = await getChapterRoster(chapter.id);
  const canManage = viewer.role === "lead" || viewer.isAdmin;
  return (
    <>
      <ChapterFeedSlot chapterId={chapter.id} />
      <MemberList chapter={chapter} roster={roster} viewer={viewer} canManage={canManage} />
      {canManage && (
        <section aria-labelledby="lead-tools-heading" className="flex flex-col gap-3">
          <h2 id="lead-tools-heading" className="text-subtitle text-content">
            Edit the chapter page
          </h2>
          <div className="max-w-2xl rounded-lg border border-line p-5">
            <ChapterDetailsForm chapterId={chapter.id} slug={chapter.slug} summary={chapter.summary} whatsappUrl={chapter.whatsapp_url} />
          </div>
        </section>
      )}
    </>
  );
}

function MemberList({
  chapter,
  roster,
  viewer,
  canManage,
}: {
  chapter: PublicChapter;
  roster: Awaited<ReturnType<typeof getChapterRoster>>;
  viewer: Viewer;
  canManage: boolean;
}) {
  return (
    <section aria-labelledby="members-heading" className="flex flex-col gap-3">
      <h2 id="members-heading" className="text-subtitle text-content">
        Members <span className="text-content-3">({roster.length})</span>
      </h2>
      {roster.length === 0 ? (
        <div className="rounded-lg border border-line bg-surface-sunken p-5 text-sm text-content-2">Nobody has joined yet.</div>
      ) : (
        <ul className="grid gap-x-6 rounded-lg border border-line px-4 py-2 md:grid-cols-2">
          {roster.map((p) => {
            const you = p.profile_id === viewer.id;
            return (
              <li key={p.profile_id} className="flex items-center gap-2 border-b border-line py-1 last:border-b-0 md:[&:nth-last-child(2):nth-child(odd)]:border-b-0">
                <PersonRow
                  person={p}
                  you={you}
                  note={p.role === "lead" ? "Chapter lead" : `Joined ${new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "Africa/Accra" }).format(new Date(p.joined_at))}`}
                />
                {canManage && p.role === "member" && !you && (
                  <RemoveMemberButton chapterId={chapter.id} profileId={p.profile_id} name={p.display_name} />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
