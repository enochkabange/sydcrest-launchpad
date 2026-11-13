import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { CampaignLinkBuilder } from "@/components/chapters/campaign-link-builder";
import { Composer } from "@/components/messaging/composer";
import { SentList } from "@/components/messaging/results";
import Link from "@/components/ui/link";
import { getChapterDashboard, requireChapterLead, type ChapterDashboard } from "@/lib/chapters/lead";
import { STAGES } from "@/lib/learners/attributes";
import { DAILY_SENDS } from "@/lib/messaging/audience";
import { getTrackOptions, listSentMessages } from "@/lib/messaging/composer-server";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = { title: "Chapter lead tools", robots: { index: false } };

/**
 * One page for a chapter's leads (#335): who is in the chapter and how they
 * found it, how active they are, events and check ins, a tagged link and QR
 * poster, and messages to the chapter (#334). Counts only: leads never see
 * another member's stage or where they came from.
 */
export default function ChapterLeadPage({ params }: PageProps<"/chapters/[slug]/lead">) {
  return (
    <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" aria-busy="true" />}>
      <LeadTools params={params} />
    </Suspense>
  );
}

const SOURCE_LABEL: Record<string, string> = {
  whatsapp: "WhatsApp",
  share: "Shared links",
  copy: "Copied links",
  direct: "Typed the address or an app",
  internal: "From inside Launchpad",
  search: "Search",
  unknown: "Not known",
};

function sourceLabel(source: string) {
  return SOURCE_LABEL[source] ?? source.charAt(0).toUpperCase() + source.slice(1).replace(/[-_]/g, " ");
}

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Africa/Accra" }).format(
    new Date(iso),
  );
}

async function LeadTools({ params }: Pick<PageProps<"/chapters/[slug]/lead">, "params">) {
  const { slug } = await params;
  const { chapter } = await requireChapterLead(slug);
  const [dashboard, tracks, messages] = await Promise.all([getChapterDashboard(chapter.id), getTrackOptions(), listSentMessages(chapter.id, 10)]);

  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <Link href={`/chapters/${chapter.slug}`} className="-mb-2 inline-flex min-h-11 items-center self-start text-sm text-content-link">
          {chapter.name} page
        </Link>
        <h1 className="text-title text-content">Lead tools: {chapter.name}</h1>
        <p className="max-w-reading text-lead text-content-2">Your members, where they come from, your events, and messages to the chapter.</p>
      </header>

      <Overview dashboard={dashboard} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="New members by where they came from" note="Joined the chapter in the last 90 days.">
          {dashboard.joins_by_source.length === 0 ? (
            <p className="text-sm text-content-2">Nobody new yet. Share your chapter link to bring people in.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-line">
              {dashboard.joins_by_source.map((s) => (
                <li key={s.source} className="flex min-h-11 items-center justify-between gap-3 text-sm">
                  <span className="text-content">{sourceLabel(s.source)}</span>
                  <span className="font-semibold text-content">{s.count}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card title="Members by stage" note="Worked out each day from what members do on Launchpad.">
          <ul className="flex flex-col divide-y divide-line">
            {STAGES.map((s) => (
              <li key={s.value} className="flex min-h-11 items-center justify-between gap-3 text-sm">
                <span className="flex flex-col">
                  <span className="text-content">{s.label}</span>
                  <span className="text-content-3">{s.hint}</span>
                </span>
                <span className="font-semibold text-content">{dashboard.by_stage[s.value] ?? 0}</span>
              </li>
            ))}
            {(dashboard.by_stage.not_computed ?? 0) > 0 && (
              <li className="flex min-h-11 items-center justify-between gap-3 text-sm">
                <span className="text-content-2">Joined today, counted tomorrow</span>
                <span className="font-semibold text-content">{dashboard.by_stage.not_computed}</span>
              </li>
            )}
          </ul>
        </Card>
        <Card title="Events and check ins" note="This chapter's events, from 30 days ago onwards.">
          {dashboard.events.length === 0 ? (
            <p className="text-sm text-content-2">No events yet. Staff publish chapter events; ask them to add your next Skillshop.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-line">
              {dashboard.events.map((e) => (
                <li key={e.slug} className="flex flex-col gap-1 py-2 text-sm">
                  <Link href={`/events/${e.slug}/host`} className="font-semibold text-content-link">
                    {e.title}
                  </Link>
                  <span className="text-content-2">
                    {formatWhen(e.starts_at)} · {e.going} going · {e.checked_in} checked in
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="text-sm text-content-3">Open an event for its check in code and attendance list.</p>
        </Card>
      </div>

      <section aria-labelledby="link-heading" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 id="link-heading" className="text-subtitle text-content">
            Chapter link and poster
          </h2>
          <p className="max-w-reading text-sm text-content-2">
            Use this link in your WhatsApp group, on posters and on flyers, so we can see how many people your chapter brings in.
          </p>
        </div>
        <div className="rounded-lg border border-line p-5">
          <CampaignLinkBuilder chapterSlug={chapter.slug} chapterName={chapter.name} origin={SITE_URL} />
        </div>
      </section>

      <section aria-labelledby="message-heading" className="grid gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 id="message-heading" className="text-subtitle text-content">
              Message your chapter
            </h2>
            <p className="max-w-reading text-sm text-content-2">
              Reaches members of {chapter.name} only, up to {DAILY_SENDS.lead} messages a day. Members can see what they get on the privacy page.
            </p>
          </div>
          <Composer
            chapterId={chapter.id}
            chapterName={chapter.name}
            chapterHref={`/chapters/${chapter.slug}`}
            tracks={tracks}
            origin={SITE_URL}
            resultsBase={`/chapters/${chapter.slug}/lead/messages`}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-subtitle text-content">Sent to the chapter</h2>
          <SentList messages={messages} base={`/chapters/${chapter.slug}/lead/messages`} />
        </div>
      </section>
    </article>
  );
}

function Overview({ dashboard }: { dashboard: ChapterDashboard }) {
  const active = dashboard.by_stage.active ?? 0;
  const items = [
    { label: "Members", value: dashboard.members },
    { label: "Joined in 30 days", value: dashboard.joined_30 },
    { label: "Active this week", value: active },
    { label: "Came through chapter links", value: dashboard.from_chapter_links },
  ];
  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((i) => (
        <div key={i.label} className="flex flex-col gap-1 rounded-lg border border-line p-4">
          <dt className="text-sm font-semibold text-content-2">{i.label}</dt>
          <dd className="text-h2 text-content">{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Card({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-line p-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-h3 text-content">{title}</h2>
        <p className="text-sm text-content-3">{note}</p>
      </div>
      {children}
    </section>
  );
}
