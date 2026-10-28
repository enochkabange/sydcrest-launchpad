import { ExternalLink, Paperclip } from "lucide-react";
import { displayTheme } from "@/components/marketing/curriculum-weeks";
import type { PortfolioItem } from "@/lib/submissions/public-portfolio";

/** Portfolio work on a public profile: week, theme, an excerpt and the learner's link. */
export function PublicPortfolio({ items }: { items: PortfolioItem[] }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.submission_id} className="flex flex-col gap-2 rounded-lg border border-line p-4">
          <p className="text-sm text-content-3">
            {item.program_title} · {item.is_capstone ? "Capstone" : `Week ${item.week_number}`}
          </p>
          <h3 className="font-semibold text-content">{displayTheme(item.theme)}</h3>
          {item.body_excerpt && (
            <p className="line-clamp-4 whitespace-pre-line text-content-2">
              {item.body_excerpt.trim()}
              {item.body_is_excerpt && "…"}
            </p>
          )}
          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            {item.link_url && (
              <a
                href={item.link_url}
                target="_blank"
                rel="nofollow ugc noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 text-content-accent underline-offset-4 hover:underline"
              >
                <ExternalLink aria-hidden="true" className="size-4" />
                Open the work
              </a>
            )}
            {item.has_file && (
              <span className="inline-flex items-center gap-1.5 text-content-3">
                <Paperclip aria-hidden="true" className="size-4" />
                File not shown publicly
              </span>
            )}
            <time dateTime={item.graded_at} className="ml-auto text-content-3">
              Graded {formatDate(item.graded_at)}
            </time>
          </div>
        </li>
      ))}
    </ul>
  );
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Accra" }).format(
    new Date(iso),
  );
}
