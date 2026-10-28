import { ExternalLink, Paperclip } from "lucide-react";
import { displayFileName } from "@/lib/submissions/files";
import type { Rubric } from "@/lib/submissions/feedback";

/** The work as it was sent: text, link and file. Learner text is shown as text, never as HTML. */
export function SubmittedWork({
  bodyText,
  linkUrl,
  filePath,
  fileUrl,
}: {
  bodyText: string | null;
  linkUrl: string | null;
  filePath: string | null;
  fileUrl: string | null;
}) {
  const fileName = displayFileName(filePath);
  return (
    <div className="flex flex-col gap-4">
      {bodyText ? (
        <div className="max-w-reading whitespace-pre-line break-words rounded-lg border border-line bg-surface-sunken p-4 text-content">
          {bodyText}
        </div>
      ) : (
        <p className="text-sm text-content-3">No written answer.</p>
      )}
      {(linkUrl || filePath) && (
        <ul className="flex flex-col gap-2">
          {linkUrl && (
            <li>
              <a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex min-h-11 max-w-full items-center gap-2 break-all text-sm font-semibold text-content-link underline-offset-4 hover:underline"
              >
                <ExternalLink aria-hidden className="size-4 shrink-0" />
                <span className="truncate">{linkUrl}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          )}
          {filePath && (
            <li>
              {fileUrl ? (
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 max-w-full items-center gap-2 text-sm font-semibold text-content-link underline-offset-4 hover:underline"
                >
                  <Paperclip aria-hidden className="size-4 shrink-0" />
                  <span className="truncate">{fileName}</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <span className="inline-flex min-h-11 items-center gap-2 text-sm text-content-2">
                  <Paperclip aria-hidden className="size-4" />
                  {fileName} (the link could not be made; refresh to try again)
                </span>
              )}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

/** How the week is marked: the rubric criteria and their points. */
export function RubricSummary({ rubric }: { rubric: Rubric }) {
  const total = rubric.criteria.reduce((sum, c) => sum + c.max_points, 0);
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 lg:p-5">
      <h3 className="text-h3 text-content">How this is marked</h3>
      <ul className="flex flex-col gap-3">
        {rubric.criteria.map((c) => (
          <li key={c.id} className="flex flex-col gap-0.5">
            <span className="flex items-baseline justify-between gap-3 text-sm font-semibold text-content">
              {c.label}
              <span className="shrink-0 tabular-nums font-normal text-content-3">{c.max_points} points</span>
            </span>
            {c.description && <span className="text-sm text-content-2">{c.description}</span>}
          </li>
        ))}
      </ul>
      <p className="text-xs text-content-3">{total} points in all, shown as a score out of 100.</p>
    </section>
  );
}
