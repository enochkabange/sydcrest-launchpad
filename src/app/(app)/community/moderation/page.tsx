import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "@/components/ui/link";
import { MainWithRail } from "@/components/ui/layout";
import { Markdown } from "@/components/learn/markdown";
import { HideContent } from "@/components/community/content-tools";
import { ReportStatusButtons } from "@/components/community/report-status";
import { getMyCommunity, loadReportQueue, REPORT_STATUSES, type MyCommunity, type QueueItem, type ReportStatus } from "@/lib/community/data";
import { createClient } from "@/lib/supabase/server";
import { timeAgo } from "@/lib/community/model";

export const metadata: Metadata = { title: "Community moderation", robots: { index: false } };

type Params = Pick<PageProps<"/community/moderation">, "searchParams">;

const LABELS: Record<ReportStatus, string> = { open: "Open", reviewing: "Reviewing", actioned: "Actioned", dismissed: "Dismissed" };

async function statusFrom(searchParams: Params["searchParams"]): Promise<ReportStatus> {
  const raw = (await searchParams).status;
  const s = Array.isArray(raw) ? raw[0] : raw;
  return (REPORT_STATUSES as readonly string[]).includes(s ?? "") ? (s as ReportStatus) : "open";
}

/** Names for the groups in the queue: the viewer's own, then chapters and cohorts they can read (admins). */
async function groupNames(me: MyCommunity, items: QueueItem[]) {
  const names = new Map<string, string>();
  for (const c of me.chapters) names.set(c.id, c.name);
  for (const c of me.cohorts) names.set(c.id, c.name);
  const chapterIds = [...new Set(items.flatMap((i) => (i.chapterId && !names.has(i.chapterId) ? [i.chapterId] : [])))];
  const cohortIds = [...new Set(items.flatMap((i) => (i.cohortId && !names.has(i.cohortId) ? [i.cohortId] : [])))];
  if (chapterIds.length || cohortIds.length) {
    const supabase = await createClient();
    const [{ data: chapters }, { data: cohorts }] = await Promise.all([
      chapterIds.length ? supabase.from("chapters").select("id, name").in("id", chapterIds) : Promise.resolve({ data: [] }),
      cohortIds.length ? supabase.from("cohorts").select("id, name").in("id", cohortIds) : Promise.resolve({ data: [] }),
    ]);
    for (const c of [...(chapters ?? []), ...(cohorts ?? [])]) names.set(c.id, c.name);
  }
  return (i: QueueItem) =>
    i.scope === "everyone"
      ? "Everyone"
      : names.get(i.chapterId ?? i.cohortId ?? "") ?? (i.scope === "chapter" ? "A chapter" : "A cohort");
}

function StatusNav({ current }: { current: ReportStatus }) {
  return (
    <nav aria-label="Report status" className="flex flex-wrap gap-1">
      {REPORT_STATUSES.map((s) => (
        <Link
          key={s}
          href={`/community/moderation?status=${s}`}
          aria-current={s === current ? "page" : undefined}
          className={`inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold no-underline ${
            s === current ? "bg-surface-sunken text-content" : "text-content-2 hover:bg-surface-sunken hover:text-content"
          }`}
        >
          {LABELS[s]}
        </Link>
      ))}
    </nav>
  );
}

async function Queue({ searchParams, me }: Params & { me: MyCommunity }) {
  const status = await statusFrom(searchParams);
  const items = await loadReportQueue(status);
  const groupOf = await groupNames(me, items);

  return (
    <div className="flex flex-col gap-4">
      <StatusNav current={status} />
      {items.length === 0 ? (
        <div className="flex flex-col gap-2 rounded-lg border border-line bg-surface-sunken p-5 xl:p-6">
          <h2 className="text-h3 text-content">Nothing {LABELS[status].toLowerCase()}</h2>
          <p className="text-content-2">
            {status === "open"
              ? "No open reports in the groups you moderate. New reports on posts and replies show here."
              : "Reports you move to this status show here."}
          </p>
        </div>
      ) : (
        <ol className="flex flex-col gap-4" aria-label={`${LABELS[status]} reports`}>
          {items.map((r) => {
            const what = r.targetType === "community_post" ? "post" : "reply";
            return (
              <li key={r.id} className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 xl:p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-content">
                    {what === "post" ? "Post" : "Reply"} by {r.authorName} in {groupOf(r)}
                  </p>
                  <span className="text-xs text-content-3">
                    Reported{" "}
                    <time dateTime={r.createdAt} suppressHydrationWarning>
                      {timeAgo(r.createdAt)}
                    </time>
                  </span>
                </div>
                {r.hidden && (
                  <p className="self-start rounded-full bg-warning-bg px-2 py-0.5 text-xs font-semibold text-warning-fg">Hidden</p>
                )}
                <blockquote className="max-h-60 overflow-y-auto rounded-md border border-line bg-surface-sunken p-3 text-sm break-words">
                  <Markdown source={r.body} />
                </blockquote>
                <dl className="flex flex-col gap-1 text-sm">
                  <div className="flex flex-wrap gap-1">
                    <dt className="font-semibold text-content">Reason:</dt>
                    <dd className="text-content-2">{r.reason}</dd>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <dt className="font-semibold text-content">Reported by:</dt>
                    <dd className="text-content-2">{r.reporterName}</dd>
                  </div>
                </dl>
                <div className="flex flex-wrap items-start gap-1 border-t border-line pt-3">
                  <Link
                    href={`/community/post/${r.postId}`}
                    className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-content-link hover:bg-surface-sunken"
                  >
                    Open the thread
                  </Link>
                  <HideContent target={what} id={r.targetId} hidden={r.hidden} />
                </div>
                <ReportStatusButtons id={r.id} status={r.status} />
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

function ModeratorGuide() {
  return (
    <section aria-labelledby="mod-guide" className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 xl:p-5">
      <h2 id="mod-guide" className="text-sm font-semibold tracking-wide text-content-3 uppercase">
        How to moderate
      </h2>
      <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-sm text-content-2">
        <li>Open the thread to see the post in context.</li>
        <li>Hide it if it breaks the guidelines. Give a short reason for the other moderators.</li>
        <li>Mark the report actioned, or dismissed if nothing was wrong.</li>
        <li>For anything about safety, tell an admin straight away.</li>
      </ol>
      <p className="text-sm text-content-3">
        You see reports for the groups you moderate: your chapter as its lead, your cohort as its staff, and everything as
        an admin.
      </p>
    </section>
  );
}

/** Reports on posts and replies for admins, chapter leads and cohort staff (#162). */
/**
 * A staff tool (admins, chapter leads, cohort staff), so everyone else gets a
 * 404 and the page stays unlisted (founder decision D6, #252). The whole page
 * sits behind the check, guide included: a layout or sibling gate would not
 * stop this markup reaching the response.
 */
export default function ModerationPage({ searchParams }: PageProps<"/community/moderation">) {
  return (
    <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" aria-busy="true" />}>
      <ModeratorsOnly searchParams={searchParams} />
    </Suspense>
  );
}

async function ModeratorsOnly({ searchParams }: Params) {
  const me = await getMyCommunity();
  if (!me.isModerator) notFound();
  return (
    <MainWithRail
      railLabel="Moderation guide"
      rail={<ModeratorGuide />}
    >
      <header className="flex flex-col gap-2">
        <Link href="/community" className="self-start text-sm font-semibold text-content-2 no-underline hover:text-content">
          Community
        </Link>
        <h1 className="text-title text-content">Moderation</h1>
        <p className="max-w-reading text-lead text-content-2">Reports on posts and replies in the groups you look after.</p>
      </header>
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" aria-busy="true" />}>
        <Queue searchParams={searchParams} me={me} />
      </Suspense>
    </MainWithRail>
  );
}
