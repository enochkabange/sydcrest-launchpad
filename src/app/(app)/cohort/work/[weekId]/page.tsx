import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "@/components/ui/link";
import { displayTheme } from "@/components/marketing/curriculum-weeks";
import { SubmissionSkeleton, WeekSubmission } from "@/components/cohort/submission";
import { requireUser } from "@/lib/auth";
import { getWeek } from "@/lib/submissions/queries";

export const metadata: Metadata = { title: "Your work" };

// The app shell's nav reads usePathname() outside a Suspense boundary, which a
// dynamic segment cannot prerender; same as /learn/[slug]/[node] until the
// shell wraps the nav in Suspense.
export const instant = false;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** One week's assignment and feedback, linked from Your work. The cohort week page mounts the same section. */
export default function WorkDetailPage({ params }: PageProps<"/cohort/work/[weekId]">) {
  return (
    <div className="flex flex-col gap-8">
      <Link
        href="/cohort/work"
        className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-content-2 hover:text-content"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Your work
      </Link>
      <Suspense
        fallback={
          <>
            <div className="h-24 animate-skeleton rounded-lg bg-surface-sunken" />
            <SubmissionSkeleton />
          </>
        }
      >
        <WeekDetail params={params} />
      </Suspense>
    </div>
  );
}

async function WeekDetail({ params }: Pick<PageProps<"/cohort/work/[weekId]">, "params">) {
  const { weekId } = await params;
  if (!UUID.test(weekId)) notFound();
  await requireUser();
  const week = await getWeek(weekId);
  if (!week) notFound();

  return (
    <>
      <header className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-content-3">
          {week.programTitle} · Week {week.weekNumber}
          {week.isCapstone ? " · Capstone" : ""}
        </p>
        <h1 className="text-title text-content">{displayTheme(week.theme)}</h1>
        {week.assignment && (
          <div className="flex max-w-reading flex-col gap-1">
            <h2 className="text-sm font-semibold text-content">Assignment</h2>
            <p className="whitespace-pre-line text-lead text-content-2">{week.assignment}</p>
          </div>
        )}
      </header>
      <section aria-labelledby="your-work-heading" id="submit">
        <WeekSubmission weekId={week.id} />
      </section>
    </>
  );
}
