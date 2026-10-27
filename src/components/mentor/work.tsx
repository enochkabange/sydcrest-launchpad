import { ExternalLink, Paperclip } from "lucide-react";
import type { Criterion } from "@/lib/mentor/progress";

/**
 * The learner's work as sent: text, a link and an attached file. The file
 * is shown by a signed URL only, never by its storage path (the path starts
 * with the author's id, which peer reviewers must not be handed).
 */
export function Work({
  bodyText,
  linkUrl,
  fileUrl,
  hasFile,
}: {
  bodyText: string | null;
  linkUrl: string | null;
  fileUrl: string | null;
  hasFile: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      {bodyText ? (
        <div className="max-w-reading rounded-lg border border-line bg-surface p-4 whitespace-pre-line text-content">{bodyText}</div>
      ) : null}
      {(linkUrl || hasFile) && (
        <ul className="flex flex-col gap-2">
          {linkUrl && (
            <li>
              <a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex min-h-11 items-center gap-2 break-all text-content-link underline"
              >
                <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
                {linkUrl}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          )}
          {hasFile && (
            <li>
              {fileUrl ? (
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-content-link underline">
                  <Paperclip aria-hidden="true" className="size-4 shrink-0" />
                  Open the attached file
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <span className="text-sm text-content-2">The attached file could not be opened right now. Reload to try again.</span>
              )}
            </li>
          )}
        </ul>
      )}
      {!bodyText && !linkUrl && !hasFile && <p className="text-sm text-content-2">No content.</p>}
    </div>
  );
}

/** Rubric scores as a small table: criterion, points out of the maximum. */
export function RubricScores({ criteria, scores }: { criteria: Criterion[]; scores: Record<string, unknown> }) {
  const total = criteria.reduce((sum, c) => sum + (typeof scores[c.id] === "number" ? (scores[c.id] as number) : 0), 0);
  const max = criteria.reduce((sum, c) => sum + c.max_points, 0);
  return (
    <dl className="flex flex-col gap-1 text-sm">
      {criteria.map((c) => (
        <div key={c.id} className="flex justify-between gap-4">
          <dt className="text-content-2">{c.label}</dt>
          <dd className="font-semibold text-content">
            {typeof scores[c.id] === "number" ? String(scores[c.id]) : "none"} of {c.max_points}
          </dd>
        </div>
      ))}
      {criteria.length > 0 && (
        <div className="flex justify-between gap-4 border-t border-line pt-1">
          <dt className="font-semibold text-content">Total</dt>
          <dd className="font-semibold text-content">
            {total} of {max}
          </dd>
        </div>
      )}
    </dl>
  );
}
