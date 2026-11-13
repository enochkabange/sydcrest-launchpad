import { loadChapterCheckIns } from "@/lib/early-warning/data";
import { CaseloadList } from "./caseload";

/**
 * Chapter leads only (issue #325): members routed to this chapter's lead
 * because they are not in a cohort with a mentor, flagged by the daily early
 * warning check. Reads the session, so the caller sits inside <Suspense>.
 */
export async function ChapterCheckIns({ chapterId }: { chapterId: string }) {
  const items = await loadChapterCheckIns(chapterId);
  return (
    <section aria-labelledby="check-ins-heading" className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 id="check-ins-heading" className="text-subtitle text-content">
          Members to check in with
        </h2>
        <p className="max-w-reading text-sm text-content-2">
          Only you and admins see this. Members who are not in a cohort, flagged once a day because they went quiet or got
          stuck. A friendly message often helps. Log it so we can learn what works.
        </p>
      </div>
      {items.length === 0 ? (
        <div className="rounded-lg border border-line bg-surface-sunken p-5 text-sm text-content-2">Nobody needs a check in today.</div>
      ) : (
        <CaseloadList label="Members to check in with" items={items} />
      )}
    </section>
  );
}
