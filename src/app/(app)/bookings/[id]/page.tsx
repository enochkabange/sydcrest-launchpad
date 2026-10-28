import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { PersonAvatar, StatusBadge } from "@/components/bookings/bits";
import Link from "@/components/ui/link";
import { MainWithRail } from "@/components/ui/layout";
import { requireUser } from "@/lib/auth";
import { loadMessages, loadMyReview, loadThread, type ThreadMessage } from "@/lib/bookings/data";
import {
  BOOKINGS_PATH,
  allowedActions,
  canMessage,
  canReview,
  formatDay,
  formatMoment,
  otherParty,
  roleIn,
  type BookingRole,
  type BookingThread,
} from "@/lib/bookings/model";
import { SOFT_LAUNCH_PRICE, expertPath, offerKindLabel, offerPath } from "@/lib/experts/offers";
import { createClient } from "@/lib/supabase/server";
import { MessageComposer, ReviewForm, StatusActions } from "./thread-forms";

export const metadata: Metadata = { title: "Booking", robots: { index: false } };

export default function BookingPage({ params }: PageProps<"/bookings/[id]">) {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href={BOOKINGS_PATH}
        className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-content-2 hover:text-content"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All bookings
      </Link>
      <Suspense fallback={<ThreadSkeleton />}>
        <Booking params={params} />
      </Suspense>
    </div>
  );
}

const firstName = (name: string) => name.split(/[\s,]+/)[0];

async function Booking({ params }: Pick<PageProps<"/bookings/[id]">, "params">) {
  const user = await requireUser();
  const { id } = await params;
  const supabase = await createClient();
  const thread = await loadThread(supabase, id);
  if (!thread) notFound();

  const role = roleIn(thread, user.id);
  const isRequester = thread.requesterId === user.id;
  const other = otherParty(thread, user.id);
  const [messages, myReview] = await Promise.all([
    loadMessages(supabase, thread.id),
    isRequester && thread.status === "completed" ? loadMyReview(supabase, thread.id, user.id) : Promise.resolve(null),
  ]);
  const actions = allowedActions(thread.status, role);
  const reviewable = canReview(thread.status, role, thread.hasReview, isRequester);

  return (
    <>
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <PersonAvatar name={other.name} avatarUrl={other.avatarUrl} size="md" />
          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="text-title text-content">{thread.offerTitle ?? "Booking"}</h1>
            <p className="text-content-2">
              {role === "expert" ? "Requested by " : "With "}
              <span className="font-semibold text-content">{other.name}</span>
            </p>
          </div>
        </div>
        <div className="self-start md:self-auto">
          <StatusBadge status={thread.status} />
        </div>
      </header>

      <MainWithRail railLabel="Booking details" rail={<Details thread={thread} />}>
        <NextStep thread={thread} role={role} otherFirst={firstName(other.name)}>
          {actions.length > 0 && <StatusActions bookingId={thread.id} actions={actions} />}
        </NextStep>

        {reviewable && (
          <section aria-labelledby="review-heading" className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 lg:p-6">
            <h2 id="review-heading" className="text-subtitle text-content">
              Review {firstName(thread.expertName)}
            </h2>
            <ReviewForm bookingId={thread.id} expertFirstName={firstName(thread.expertName)} />
          </section>
        )}
        {myReview && (
          <section aria-labelledby="your-review-heading" className="flex flex-col gap-2 rounded-lg border border-line bg-surface-sunken p-5">
            <h2 id="your-review-heading" className="text-h3 text-content">
              Your review
            </h2>
            <Stars rating={myReview.rating} />
            {myReview.body && <p className="max-w-reading whitespace-pre-line text-content-2">{myReview.body}</p>}
            <p className="text-sm text-content-3">
              {myReview.is_hidden
                ? "Our team hid this review from the public page."
                : thread.expertSlug
                  ? (
                    <Link href={expertPath(thread.expertSlug)} className="underline underline-offset-2 hover:text-content">
                      It shows on {firstName(thread.expertName)}&rsquo;s page
                    </Link>
                  )
                  : "Thank you for reviewing."}
            </p>
          </section>
        )}

        <section aria-labelledby="thread-heading" className="flex flex-col gap-4">
          <h2 id="thread-heading" className="text-subtitle text-content">
            Conversation
          </h2>
          <ol className="flex flex-col gap-3">
            <Bubble
              name={isRequester ? "You" : thread.requesterName}
              at={thread.createdAt}
              mine={isRequester}
              label="Request"
            >
              <p className="whitespace-pre-line break-words">{thread.message}</p>
              {thread.preferredTimes && (
                <p className="mt-2 text-sm text-content-2">
                  <span className="font-semibold text-content">When suits: </span>
                  {thread.preferredTimes}
                </p>
              )}
            </Bubble>
            {messages.map((m) => (
              <Bubble key={m.id} name={senderName(m, thread, user.id)} at={m.createdAt} mine={m.senderId === user.id}>
                <p className="whitespace-pre-line break-words">{m.body}</p>
              </Bubble>
            ))}
          </ol>
          {messages.length === 0 && (
            <p className="text-sm text-content-3">No replies yet. Messages you both send appear here.</p>
          )}
          {canMessage(thread.status) ? (
            <div className="rounded-lg border border-line bg-surface p-4 lg:p-5">
              <MessageComposer bookingId={thread.id} otherName={firstName(other.name)} />
            </div>
          ) : (
            <p className="rounded-lg border border-line bg-surface-sunken p-4 text-sm text-content-2">
              This thread is closed because the booking was {thread.status}. You can still read it here.
            </p>
          )}
        </section>
      </MainWithRail>
    </>
  );
}

function senderName(m: ThreadMessage, thread: BookingThread, viewerId: string) {
  if (m.senderId === viewerId) return "You";
  if (m.senderId === thread.requesterId) return thread.requesterName;
  if (m.senderId === thread.expertId) return thread.expertName;
  return thread.organisationName ? `${thread.organisationName} team` : "Their team";
}

function Bubble({ name, at, mine, label, children }: { name: string; at: string; mine: boolean; label?: string; children: ReactNode }) {
  return (
    <li
      className={`flex max-w-reading flex-col gap-1.5 rounded-lg border p-4 ${
        mine ? "self-end border-info-fg/20 bg-info-bg text-content" : "self-start border-line bg-surface text-content"
      }`}
    >
      <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
        <span className="font-semibold">{name}</span>
        {label && <span className="text-content-3">{label}</span>}
        <time dateTime={at} className="text-content-3">
          {formatMoment(at)}
        </time>
      </p>
      {children}
    </li>
  );
}

/** Where the booking stands, in words for this person, with what they can do about it. */
function NextStep({ thread, role, otherFirst, children }: { thread: BookingThread; role: BookingRole; otherFirst: string; children: ReactNode }) {
  const lines: Record<string, string> = {
    "requested:expert": `${otherFirst} would like to book this with you. Read the request, ask anything you need below, then accept or decline.`,
    "requested:requester": `Waiting for ${otherFirst} to reply. You can add details below while you wait.`,
    "accepted:expert": `You accepted. Agree a time and how you will meet below, and mark it completed once it is done.`,
    "accepted:requester": `${otherFirst} accepted. Agree a time and how you will meet below. Either of you can mark it completed once it is done.`,
    "completed:expert": `Completed. ${thread.hasReview ? "They left a review on your page." : "They can leave a review on your page."}`,
    "completed:requester": thread.hasReview ? "Completed. Thank you for your review." : `Completed. Tell others how it went.`,
    "declined:expert": "You declined this request.",
    "declined:requester": `${otherFirst} declined this request. You can request again or find another expert.`,
    "cancelled:expert": "This booking was cancelled.",
    "cancelled:requester": "This booking was cancelled.",
  };
  return (
    <section aria-labelledby="next-heading" className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 lg:p-6">
      <h2 id="next-heading" className="text-h3 text-content">
        {thread.status === "requested" || thread.status === "accepted" ? "What happens next" : "Where this stands"}
      </h2>
      <p className="max-w-reading text-content-2">{lines[`${thread.status}:${role}`]}</p>
      {thread.statusReason && (thread.status === "declined" || thread.status === "cancelled") && (
        <p className="rounded-md bg-surface-sunken p-3 text-sm text-content-2">
          <span className="font-semibold text-content">Note: </span>
          {thread.statusReason}
        </p>
      )}
      {children}
    </section>
  );
}

function Details({ thread }: { thread: BookingThread }) {
  const rows: { label: string; value: ReactNode }[] = [];
  if (thread.offerTitle)
    rows.push({
      label: "Offer",
      value:
        thread.expertSlug && thread.offerId ? (
          <Link href={offerPath(thread.expertSlug, thread.offerId)} className="underline underline-offset-2 hover:text-content-link">
            {thread.offerTitle}
          </Link>
        ) : (
          thread.offerTitle
        ),
    });
  if (thread.offerKind) rows.push({ label: "Type", value: offerKindLabel(thread.offerKind) });
  rows.push({ label: "Expert", value: thread.expertSlug ? <Link href={expertPath(thread.expertSlug)} className="underline underline-offset-2 hover:text-content-link">{thread.expertName}</Link> : thread.expertName });
  if (thread.organisationName) rows.push({ label: "Organisation", value: thread.organisationName });
  rows.push({ label: "Requested", value: formatDay(thread.createdAt) });
  if (thread.respondedAt) rows.push({ label: "Answered", value: formatDay(thread.respondedAt) });
  if (thread.completedAt) rows.push({ label: "Completed", value: formatDay(thread.completedAt) });
  rows.push({ label: "Price", value: <span className="text-success-fg">{SOFT_LAUNCH_PRICE}</span> });

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 xl:p-6">
      <h2 className="text-h3 text-content">Details</h2>
      <dl className="flex flex-col gap-3 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between gap-4">
            <dt className="text-content-3">{r.label}</dt>
            <dd className="text-right font-semibold text-content">{r.value}</dd>
          </div>
        ))}
      </dl>
      <p className="rounded-md bg-surface-sunken p-3 text-sm text-content-2">
        Nothing is charged during the soft launch. Never send money to anyone you meet here.
      </p>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} aria-hidden className={`size-4 ${n <= rating ? "fill-current text-content-accent" : "text-line-strong"}`} />
      ))}
    </span>
  );
}

function ThreadSkeleton() {
  return (
    <div aria-busy="true" className="flex animate-pulse flex-col gap-6">
      <div className="h-16 w-2/3 rounded bg-surface-sunken" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex flex-col gap-4">
          <div className="h-32 rounded-lg bg-surface-sunken" />
          <div className="h-64 rounded-lg bg-surface-sunken" />
        </div>
        <div className="h-72 rounded-lg bg-surface-sunken" />
      </div>
    </div>
  );
}
