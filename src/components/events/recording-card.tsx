import { ExternalLink, PlayCircle } from "lucide-react";
import Link from "@/components/ui/link";
import { kindLabel } from "@/lib/events/labels";
import type { PublicRecording } from "@/lib/events/public";
import { formatDuration, formatEventDayShort } from "@/lib/events/time";

/**
 * One recording. Opens the video where it is hosted (a link, not an embed,
 * so nothing streams until someone chooses to watch on their data).
 */
export function RecordingCard({ recording, showEvent = true }: { recording: PublicRecording; showEvent?: boolean }) {
  const duration = formatDuration(recording.duration_minutes);
  return (
    <article className="flex h-full flex-col gap-2 rounded-lg border border-line bg-surface p-5 xl:p-6">
      {showEvent && recording.event && (
        <p className="text-xs font-bold tracking-wider text-content-3 uppercase">{kindLabel(recording.event.kind)}</p>
      )}
      <h3 className="text-h3 text-content">{recording.title}</h3>
      {showEvent && recording.event && (
        <p className="text-sm text-content-2">
          From{" "}
          <Link href={`/events/${recording.event.slug}`} className="font-semibold text-content-link underline-offset-2 hover:underline">
            {recording.event.title}
          </Link>
          , {formatEventDayShort(recording.event.starts_at)}
        </p>
      )}
      {recording.summary && <p className="line-clamp-4 text-body text-content-2">{recording.summary}</p>}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
        {duration ? <span className="text-sm text-content-2">{duration}</span> : <span />}
        <a
          href={recording.video_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line-strong px-4 text-sm font-semibold text-content transition-colors hover:bg-surface-sunken"
        >
          <PlayCircle aria-hidden className="size-4" /> Watch
          <ExternalLink aria-hidden className="size-3.5 text-content-3" />
          <span className="sr-only">{recording.title} (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
