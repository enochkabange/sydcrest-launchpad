import Link from "@/components/ui/link";
import { kindLabel } from "@/lib/events/labels";
import { formatEventDayShort, formatEventTimes } from "@/lib/events/time";

/** Title block for the signed in event pages, with the way back to the event. */
export function EventPageHeader({
  event,
  title,
  lead,
}: {
  event: { slug: string; kind: string; title: string; starts_at: string; ends_at: string };
  title: string;
  lead?: string;
}) {
  return (
    <header className="max-w-4xl">
      <nav aria-label="Breadcrumb" className="text-sm text-content-2">
        <Link href={`/events/${event.slug}`} className="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-content">
          {event.title}
        </Link>
      </nav>
      <p className="mt-2 text-xs font-bold tracking-widest text-content-3 uppercase">
        {kindLabel(event.kind)}, {formatEventDayShort(event.starts_at)}, {formatEventTimes(event.starts_at, event.ends_at)}
      </p>
      <h1 className="mt-1 text-title text-content">{title}</h1>
      {lead && <p className="mt-3 max-w-reading text-lead text-content-2">{lead}</p>}
    </header>
  );
}
