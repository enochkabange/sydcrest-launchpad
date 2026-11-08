import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "@/components/ui/link";
import { Alert } from "@/components/ui/alert";
import { Button, buttonClasses } from "@/components/ui/button";
import { canApply, type ApplicationStatus } from "@/lib/chapters/applications";
import { getCurrentUser } from "@/lib/auth";
import { regionLabel } from "@/lib/regions";
import { createClient } from "@/lib/supabase/server";
import { StartChapterForm } from "./start-form";
import { withdrawChapterApplication } from "./actions";

export const metadata: Metadata = {
  title: "Start a chapter",
  description: "SydCrest is community led. Apply to start and lead a Launchpad chapter where you live.",
};

const dateFormat = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "Africa/Accra" });

/**
 * Apply to start and lead a chapter (#301). Signed in only (the proxy sends
 * visitors to /login); shows the latest application's state, or the form.
 */
async function StartChapter({ searchParams }: { searchParams: PageProps<"/chapters/start">["searchParams"] }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/chapters/start");
  if (!user.isSetUp) redirect("/welcome?next=/chapters/start");
  const supabase = await createClient();
  const [{ data: latest }, { data: profile }, params] = await Promise.all([
    supabase
      .from("chapter_applications")
      .select("id, town, region, status, decision_note, created_at, chapter_id, chapters(slug, name)")
      .eq("profile_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase.from("profiles").select("region").eq("id", user.id).maybeSingle(),
    searchParams,
  ]);
  const status = (latest?.status ?? null) as ApplicationStatus | null;

  return (
    <div className="flex flex-col gap-6">
      {params.sent === "1" && status === "submitted" && (
        <Alert tone="success">Application sent. We will let you know in your notifications when it has been reviewed.</Alert>
      )}

      {status === "submitted" && latest && (
        <section className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5">
          <h2 className="text-subtitle text-content">Your application is in review</h2>
          <p className="max-w-reading text-content-2">
            {latest.town}, {regionLabel(latest.region)} Region. Sent on {dateFormat.format(new Date(latest.created_at))}. The
            SydCrest team reads every application and will reply in your notifications.
          </p>
          <form action={withdrawChapterApplication.bind(null, latest.id)}>
            <Button type="submit" variant="secondary">
              Withdraw application
            </Button>
          </form>
        </section>
      )}

      {status === "approved" && latest?.chapters && (
        <section className="flex flex-col gap-3 rounded-lg border border-info-fg/30 bg-info-bg p-5">
          <h2 className="text-subtitle text-content">You lead the {latest.chapters.name}</h2>
          <p className="max-w-reading text-content-2">Add a summary and a WhatsApp link to its page, then invite people.</p>
          <Link href={`/chapters/${latest.chapters.slug}`} className={buttonClasses("primary", "self-start")}>
            Open your chapter
          </Link>
        </section>
      )}

      {status === "declined" && latest && (
        <Alert tone="info">
          Your application for {latest.town} was not approved{latest.decision_note ? `: ${latest.decision_note}` : "."} You can
          apply again, or join any chapter.
        </Alert>
      )}

      {canApply(status) && <StartChapterForm defaultRegion={profile?.region ?? null} />}
    </div>
  );
}

export default function StartChapterPage({ searchParams }: PageProps<"/chapters/start">) {
  return (
    <div className="flex max-w-reading flex-col gap-6">
      <header className="flex flex-col gap-3">
        <h1 className="text-title text-content">Start a chapter</h1>
        <p className="text-lead text-content-2">
          SydCrest is community led. If there is no chapter where you live, you can start one: a volunteer lead, a WhatsApp
          group, and meetups and Skillshops for people near you. Tell us about your town and how you would run it.
        </p>
      </header>
      <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <StartChapter searchParams={searchParams} />
      </Suspense>
      <p className="text-sm text-content-3">
        Not ready to lead? <Link href="/chapters">Join one of our chapters</Link> instead.
      </p>
    </div>
  );
}
