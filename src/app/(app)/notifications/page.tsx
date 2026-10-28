import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { BellRing, MessageCircle } from "lucide-react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { MainWithRail } from "@/components/ui/layout";
import { NotificationList } from "@/components/notifications/notification-list";
import { requireUser } from "@/lib/auth";
import { listNotifications } from "@/lib/notifications/server";

export const metadata: Metadata = { title: "Notifications", robots: { index: false } };

/**
 * The notification centre (#166). Static shell; the learner's own list
 * streams in a Suspense island. Desktop: the list with a rail explaining
 * what arrives here; phones: the list first, the rail after it.
 */
export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex max-w-reading flex-col gap-2">
        <h1 className="text-title text-content">Notifications</h1>
        <p className="text-lead text-content-2">
          Replies, event news, verified skills and updates from your chapter, mentors and bookings, all in one place.
        </p>
      </header>
      <MainWithRail railLabel="About notifications" rail={<AboutRail />}>
        <Suspense fallback={<div aria-busy="true" className="h-72 animate-skeleton rounded-lg bg-surface-sunken" />}>
          <MyNotifications />
        </Suspense>
      </MainWithRail>
    </div>
  );
}

async function MyNotifications() {
  const user = await requireUser();
  await connection();
  const { items, unread } = await listNotifications(user.id);
  if (items.length === 0) return <EmptyState />;
  return <NotificationList items={items} unread={unread} now={new Date()} />;
}

function EmptyState() {
  return (
    <section
      aria-labelledby="notifications-empty-heading"
      className="flex flex-col items-start gap-4 rounded-lg border border-line bg-surface-sunken p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-8"
    >
      <div className="flex items-start gap-4">
        <span aria-hidden className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-surface text-content-3">
          <BellRing className="size-6" />
        </span>
        <div className="flex max-w-reading flex-col gap-1">
          <h2 id="notifications-empty-heading" className="text-h3 text-content">
            Nothing here yet
          </h2>
          <p className="text-content-2">
            When someone replies to your post, an event you joined changes, or you earn a verified skill, it shows up
            here. Keep learning and joining in, and news will follow.
          </p>
        </div>
      </div>
      <Link href="/path" className={buttonClasses("secondary", "shrink-0")}>
        Go to your path
      </Link>
    </section>
  );
}

function AboutRail() {
  return (
    <>
      <section aria-labelledby="what-heading" className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5">
        <h2 id="what-heading" className="text-h3 text-content">
          What lands here
        </h2>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-content-2">
          <li>Replies to your community posts</li>
          <li>Posts from your chapter lead</li>
          <li>Event changes, reminders and waitlist places</li>
          <li>Verified skills and portfolio reviews</li>
          <li>Bookings, briefs and opportunities</li>
        </ul>
        <p className="text-sm text-content-3">Open one to mark it read. Delete any you no longer need.</p>
      </section>
      <section aria-labelledby="buddy-heading" className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-5">
        <h2 id="buddy-heading" className="flex items-center gap-2 text-h3 text-content">
          <MessageCircle aria-hidden className="size-5 text-content-accent" />
          Not sure what to do next?
        </h2>
        <p className="text-content-2">
          Study Buddy looks at your path and progress and suggests mentors, opportunities and events that fit.
        </p>
        <Link href="/study-buddy" className={buttonClasses("secondary", "self-start")}>
          Ask Study Buddy
        </Link>
      </section>
    </>
  );
}
