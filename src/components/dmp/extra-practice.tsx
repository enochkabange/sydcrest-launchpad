import { ExternalLink } from "lucide-react";
import type { DmpResource } from "@/content/dmp/curriculum";

/**
 * A week's free official resources (issue #239), shown after SydCrest's own
 * lessons as extra practice. Each opens in a new tab and says so to screen
 * readers. `compact` is the dense list on /programme/curriculum.
 */
export function ExtraPracticeLinks({ resources, compact = false }: { resources: DmpResource[]; compact?: boolean }) {
  if (!resources.length) return null;
  return (
    <ul className={compact ? "flex flex-col gap-1" : "flex flex-col gap-2 lg:grid lg:grid-cols-2"}>
      {resources.map((r) => (
        <li key={r.url}>
          <a
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className={
              compact
                ? "inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
                : "flex h-full min-h-11 items-center gap-3 rounded-md border border-line px-3 py-2 text-sm font-semibold transition-colors hover:border-line-strong hover:bg-surface-sunken"
            }
          >
            <span>{r.name}</span>
            <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
