import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { PersonAvatar, StatusBadge } from "@/components/bookings/bits";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { DataTable, MainWithRail, rowLinkClass, type Column } from "@/components/ui/layout";
import { requireUser } from "@/lib/auth";
import { loadMyThreads } from "@/lib/bookings/data";
import {
  BOOKING_STATUSES,
  BOOKINGS_PATH,
  STATUS_FILTER_LABEL,
  bookingPath,
  countByStatus,
  filterInbox,
  formatDay,
  otherParty,
  parseSide,
  parseStatusFilter,
  roleIn,
  type BookingStatus,
  type BookingThread,
  type InboxSide,
} from "@/lib/bookings/model";
import { SOFT_LAUNCH_PRICE } from "@/lib/experts/offers";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Bookings", robots: { index: false } };

export default function BookingsPage({ searchParams }: PageProps<"/bookings">) {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-title text-content">Bookings</h1>
        <p className="max-w-reading text-lead text-content-2">
          Requests you sent to experts and requests people sent to you. {SOFT_LAUNCH_PRICE}, so no money changes hands.
        </p>
      </header>
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Inbox searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

function inboxHref(side: InboxSide, status: BookingStatus | null) {
  const q = new URLSearchParams();
  if (side !== "all") q.set("side", side);
  if (status) q.set("status", status);
  const s = q.toString();
  return s ? `${BOOKINGS_PATH}?${s}` : BOOKINGS_PATH;
}

const PILL =
  "inline-flex min-h-11 items-center justify-between gap-3 whitespace-nowrap rounded-md px-3 text-sm font-semibold transition-colors lg:w-full";
const pill = (active: boolean) =>
  `${PILL} ${active ? "bg-surface-sunken text-content" : "text-content-2 hover:bg-surface-sunken hover:text-content"}`;

async function Inbox({ searchParams }: Pick<PageProps<"/bookings">, "searchParams">) {
  const user = await requireUser();
  const supabase = await createClient();
  const [params, threads, expert] = await Promise.all([
    searchParams,
    loadMyThreads(supabase, user.id),
    supabase.from("expert_profiles").select("profile_id").eq("profile_id", user.id).maybeSingle(),
  ]);
  const status = parseStatusFilter(params.status);
  const receivesRequests = !!expert.data || threads.some((t) => roleIn(t, user.id) === "expert");
  const side = receivesRequests ? parseSide(params.side) : "all";
  const sided = filterInbox(threads, user.id, side, null);
  const counts = countByStatus(sided);
  const rows = filterInbox(sided, user.id, "all", status);

  const sides: { side: InboxSide; label: string }[] = [
    { side: "all", label: "All" },
    { side: "sent", label: "You asked" },
    { side: "received", label: "Asked you" },
  ];

  const filters = (
    <div className="flex flex-col gap-4">
      {receivesRequests && (
        <nav aria-label="Whose requests" className="flex gap-1 rounded-lg border border-line p-1">
          {sides.map((s) => (
            <Link
              key={s.side}
              href={inboxHref(s.side, status)}
              aria-current={s.side === side ? "page" : undefined}
              className={`${pill(s.side === side)} flex-1 justify-center lg:w-auto`}
            >
              {s.label}
            </Link>
          ))}
        </nav>
      )}
      <nav aria-label="Booking status" className="flex gap-1 overflow-x-auto rounded-lg border border-line p-1 lg:flex-col lg:overflow-visible">
        <Link href={inboxHref(side, null)} aria-current={status === null ? "page" : undefined} className={pill(status === null)}>
          Everything <span className="text-content-3">{sided.length}</span>
        </Link>
        {BOOKING_STATUSES.map((s) => (
          <Link key={s} href={inboxHref(side, s)} aria-current={status === s ? "page" : undefined} className={pill(status === s)}>
            {STATUS_FILTER_LABEL[s]} <span className="text-content-3">{counts[s]}</span>
          </Link>
        ))}
      </nav>
      <div className="hidden flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-4 text-sm text-content-2 lg:flex">
        <p>Looking for help with your work or your next step? Experts on SydCrest offer sessions and reviews.</p>
        <Link href="/experts" className="font-semibold text-content-link underline underline-offset-2">
          Browse experts
        </Link>
      </div>
    </div>
  );

  return (
    <MainWithRail railFirst sticky railLabel="Filter bookings" rail={filters}>
      {threads.length === 0 ? (
        <EmptyState
          title="No bookings yet"
          body={`Find an expert and request a session, a review or help with a project. ${SOFT_LAUNCH_PRICE}.`}
          action={
            <Link href="/experts" className={buttonClasses("primary")}>
              Browse experts
            </Link>
          }
        />
      ) : rows.length === 0 ? (
        <EmptyState
          title={status ? `Nothing in ${STATUS_FILTER_LABEL[status].toLowerCase()}` : "Nothing here yet"}
          body="Bookings move here as they change. Try another filter to see the rest."
          action={
            <Link href={BOOKINGS_PATH} className={buttonClasses("secondary")}>
              Show all bookings
            </Link>
          }
        />
      ) : (
        <DataTable
          caption={status ? `Bookings: ${STATUS_FILTER_LABEL[status]}` : "Your bookings"}
          columns={columns(user.id)}
          rows={rows}
          rowKey={(t) => t.id}
        />
      )}
    </MainWithRail>
  );
}

function columns(viewerId: string): Column<BookingThread>[] {
  return [
    {
      header: "With",
      className: "min-w-0 flex-1",
      cell: (t) => {
        const other = otherParty(t, viewerId);
        return (
          <span className="flex min-w-0 items-center gap-3">
            <PersonAvatar name={other.name} avatarUrl={other.avatarUrl} />
            <span className="flex min-w-0 flex-col">
              <Link href={bookingPath(t.id)} className={`truncate font-semibold text-content hover:underline ${rowLinkClass}`}>
                {other.name}
              </Link>
              <span className="truncate text-sm text-content-2 md:hidden">{t.offerTitle ?? "Booking"}</span>
            </span>
          </span>
        );
      },
    },
    { header: "Offer", phone: "hide", className: "md:min-w-56 xl:min-w-72", cell: (t) => <span className="text-content-2">{t.offerTitle ?? "Booking"}</span> },
    {
      header: "Side",
      phone: "hide",
      cell: (t) => <span className="whitespace-nowrap text-content-2">{roleIn(t, viewerId) === "expert" ? "Asked you" : "You asked"}</span>,
    },
    { header: "Status", cell: (t) => <StatusBadge status={t.status} /> },
    {
      header: "Last activity",
      align: "end",
      phone: "hide",
      cell: (t) => (
        <time dateTime={t.lastActivityAt} className="whitespace-nowrap text-sm text-content-2">
          {formatDay(t.lastActivityAt)}
        </time>
      ),
    },
  ];
}

function EmptyState({ title, body, action }: { title: string; body: string; action: ReactNode }) {
  return (
    <section className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface-sunken p-5 lg:p-8">
      <h2 className="text-subtitle text-content">{title}</h2>
      <p className="max-w-reading text-content-2">{body}</p>
      {action}
    </section>
  );
}
