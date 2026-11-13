import Link from "@/components/ui/link";
import { DataTable, rowLinkClass, type Column } from "@/components/ui/layout";
import { RETURN_WINDOW_DAYS, describeFilters, summariseResults, type AudienceFilters, type ResultRow } from "@/lib/messaging/audience";
import type { MessageDetail, SentMessage } from "@/lib/messaging/composer-server";

/** Results of the audience composer (#334): server components, no session reads of their own. */

const CHANNEL_LABEL: Record<string, string> = { in_app: "In app", whatsapp: "WhatsApp" };

function formatDay(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Africa/Accra" }).format(
    new Date(iso),
  );
}

function pct(value: number | null) {
  return value === null ? "–" : `${value}%`;
}

export function SentList({ messages, base }: { messages: SentMessage[]; base: string }) {
  if (!messages.length) {
    return (
      <div className="rounded-lg border border-line bg-surface-sunken p-5 text-sm text-content-2">
        No messages yet. Messages you send show here with their results.
      </div>
    );
  }
  const columns: Column<SentMessage>[] = [
    {
      header: "Message",
      cell: (m) => (
        <span className="flex min-w-0 flex-col">
          <Link href={`${base}/${m.id}`} className={`font-semibold text-content ${rowLinkClass}`}>
            {m.title}
          </Link>
          <span className="text-sm text-content-2">
            {CHANNEL_LABEL[m.channel] ?? m.channel} · {formatDay(m.created_at)}
          </span>
        </span>
      ),
      className: "min-w-0 flex-1",
    },
    { header: "Audience", cell: (m) => m.audience_count, align: "end" },
    { header: "Held out", cell: (m) => m.holdout_count, align: "end", phone: "hide" },
  ];
  return <DataTable caption="Messages sent" columns={columns} rows={messages} rowKey={(m) => m.id} />;
}

export function MessageResults({
  message,
  rows,
  windowOpen,
  names,
}: {
  message: MessageDetail;
  rows: ResultRow[];
  /** True while the return window is still running. */
  windowOpen: boolean;
  names?: { chapter?: string };
}) {
  const r = summariseResults(rows);
  const filters = (message.filters && typeof message.filters === "object" ? message.filters : {}) as AudienceFilters;
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-1 rounded-lg border border-line p-5">
        <p className="text-sm text-content-3">
          {CHANNEL_LABEL[message.channel] ?? message.channel} · sent {formatDay(message.created_at)}
        </p>
        <p className="text-h3 text-content">{message.title}</p>
        {message.body && <p className="text-sm text-content-2">{message.body}</p>}
        <p className="mt-2 text-sm text-content-2">{describeFilters(filters, names)}.</p>
      </section>

      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-testid="message-results">
        <Stat label="Got the message" value={String(r.sent.delivered)} note={`of ${r.sent.people} chosen`} />
        <Stat
          label="Opened"
          value={message.channel === "in_app" ? String(r.sent.opened) : "–"}
          note={message.channel === "in_app" ? `${pct(r.openedRate)} of those who got it` : "WhatsApp does not tell us"}
        />
        <Stat label="Came back" value={pct(r.sentRate)} note={`${r.sent.came_back} of ${r.sent.people} within ${RETURN_WINDOW_DAYS} days`} />
        <Stat
          label="Held out, came back"
          value={pct(r.heldRate)}
          note={r.held.people ? `${r.held.came_back} of ${r.held.people}, who got nothing` : "No holdout for this message"}
        />
      </dl>
      <p className="max-w-reading text-sm text-content-2">
        {r.lift === null
          ? "Without a holdout there is nothing to compare against, so the came back rate alone cannot show what the message did."
          : r.lift > 0
            ? `${r.lift} more in every 100 came back than in the holdout.`
            : r.lift < 0
              ? `${Math.abs(r.lift)} fewer in every 100 came back than in the holdout.`
              : "The same share came back as in the holdout."}{" "}
        {windowOpen && `The ${RETURN_WINDOW_DAYS} days are not over yet, so these numbers will still change.`} Small groups swing a lot; treat a
        few people either way as noise. Came back counts members who used Launchpad and did not turn analytics off.
      </p>
    </div>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-line p-4">
      <dt className="text-sm font-semibold text-content-2">{label}</dt>
      <dd className="text-h2 text-content">{value}</dd>
      <dd className="text-sm text-content-3">{note}</dd>
    </div>
  );
}
