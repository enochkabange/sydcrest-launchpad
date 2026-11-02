import type { Metadata } from "next";
import { Suspense } from "react";
import { BadgeCheck, Briefcase, CalendarDays, Compass, Users } from "lucide-react";
import { MainWithRail } from "@/components/ui/layout";
import { StudyBuddy } from "@/components/study-buddy/study-buddy";
import { requireUser } from "@/lib/auth";
import { isStudyBuddyConfigured } from "@/lib/study-buddy/chat";
import { getStudyBuddyAllowance } from "@/lib/study-buddy/data";

export const metadata: Metadata = { title: "Study Buddy", robots: { index: false } };

/**
 * Study Buddy as the learner's companion (#166): the same chat as on a
 * lesson, without a topic, so it can look at the learner's path and
 * progress and suggest mentors, opportunities and events. Desktop: the chat
 * with a rail listing what it can do; phones: the chat first.
 */
export default function StudyBuddyPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex max-w-reading flex-col gap-2">
        <h1 className="text-title text-content">Study Buddy</h1>
        <p className="text-lead text-content-2">
          Your companion on SydCrest. Ask what to learn next, which expert could help you, or which opportunities and events
          fit your path.
        </p>
      </header>
      <MainWithRail railLabel="What Study Buddy can do" rail={<AboutRail />}>
        <Suspense fallback={<div aria-busy="true" className="h-80 animate-skeleton rounded-lg bg-surface-sunken" />}>
          <CompanionChat />
        </Suspense>
      </MainWithRail>
    </div>
  );
}

async function CompanionChat() {
  await requireUser();
  const available = isStudyBuddyConfigured();
  // A failed usage read only hides the counter; the route still enforces the cap.
  const allowance = available ? await getStudyBuddyAllowance().catch(() => null) : null;
  return (
    <StudyBuddy
      nodeId={null}
      signedIn
      available={available}
      remainingToday={allowance?.remaining ?? null}
      limit={allowance?.limit}
    />
  );
}

const CAN_DO = [
  { icon: Compass, title: "Your next steps", text: "Where you are on your path and which topic to open next." },
  { icon: Users, title: "Experts", text: "Approved experts whose skills match your track." },
  { icon: Briefcase, title: "Opportunities", text: "Open jobs, internships, scholarships and gigs that suit your path." },
  { icon: CalendarDays, title: "Events", text: "Upcoming skillshops and meetups, your chapter first." },
] as const;

function AboutRail() {
  return (
    <section aria-labelledby="can-do-heading" className="flex flex-col gap-4 rounded-lg border border-line bg-surface-sunken p-5">
      <h2 id="can-do-heading" className="text-h3 text-content">
        What I can help with
      </h2>
      <ul className="flex flex-col gap-4">
        {CAN_DO.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex gap-3">
            <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-content-accent" />
            <div className="flex flex-col gap-0.5">
              <p className="font-semibold text-content">{title}</p>
              <p className="text-sm text-content-2">{text}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="flex gap-2 text-sm text-content-3">
        <BadgeCheck aria-hidden className="size-4 shrink-0" />
        It only reads your own progress and what is public on SydCrest, and it never changes anything for you.
      </p>
    </section>
  );
}
