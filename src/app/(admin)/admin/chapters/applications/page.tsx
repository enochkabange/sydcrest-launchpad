import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { Alert } from "@/components/ui/alert";
import { requireAdmin } from "@/lib/admin";
import { suggestedChapterSlug } from "@/lib/chapters/applications";
import { regionLabel } from "@/lib/regions";
import { ChapterDecisionForm } from "./decision-form";

export const metadata: Metadata = { title: "Chapter applications", robots: { index: false } };

const dateFormat = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "Africa/Accra" });

/** Open applications to start a chapter, oldest first (#301). */
async function Queue() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("chapter_application_queue")
    .select("application_id, display_name, town, region, motivation, plan, created_at")
    .eq("status", "submitted")
    .order("created_at");
  if (error) throw new Error(`Could not load chapter applications: ${error.message}`);
  if (!data.length) {
    return (
      <p className="rounded-lg border border-line bg-surface-sunken p-5 text-content-2">
        No applications waiting. People can apply from <Link href="/chapters/start">Start a chapter</Link>.
      </p>
    );
  }
  return (
    <ul className="flex flex-col gap-6">
      {data.map((a) => (
        <li key={a.application_id} className="flex flex-col gap-4 rounded-lg border border-line p-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-h3 text-content">
              {a.town}, {regionLabel(a.region!)} Region
            </h2>
            <p className="text-sm text-content-3">
              {a.display_name ?? "A member"} · sent {dateFormat.format(new Date(a.created_at!))}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold text-content">Why there</h3>
            <p className="max-w-reading whitespace-pre-line text-content-2">{a.motivation}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold text-content">How they would run it</h3>
            <p className="max-w-reading whitespace-pre-line text-content-2">{a.plan}</p>
          </div>
          <ChapterDecisionForm applicationId={a.application_id!} town={a.town!} slug={suggestedChapterSlug(a.town!)} />
        </li>
      ))}
    </ul>
  );
}

async function Decided({ searchParams }: { searchParams: PageProps<"/admin/chapters/applications">["searchParams"] }) {
  const params = await searchParams;
  const town = typeof params.town === "string" ? params.town.slice(0, 80) : "";
  if (params.decided === "approved") return <Alert tone="success">The {town} chapter is open and the applicant leads it. They have been told.</Alert>;
  if (params.decided === "declined") return <Alert tone="success">Declined the {town} application. The applicant has been told.</Alert>;
  return null;
}

export default function ChapterApplicationsPage({ searchParams }: PageProps<"/admin/chapters/applications">) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">Chapter applications</h1>
        <p className="max-w-reading text-content-2">
          People who want to start a chapter where they live. Approving opens the chapter (Being set up) with them as its
          lead; either way they are told in their notifications.
        </p>
      </div>
      <Suspense fallback={null}>
        <Decided searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Queue />
      </Suspense>
    </div>
  );
}
