import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { requireAdmin } from "@/lib/admin";
import { plannedWithoutChapter, slugify } from "@/lib/chapters/model";
import { ChapterForm } from "../chapter-form";

export const metadata: Metadata = { title: "New chapter" };

/** Prefills the next northern capital that has no chapter yet (Tamale first). */
async function NewChapter() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("chapters").select("slug, name, region, city, status");
  const next = plannedWithoutChapter(data ?? [])[0];
  return (
    <>
      {next && (
        <p className="text-content-2">
          Filled in for {next.city}, the next planned capital. Change anything before you create it.
        </p>
      )}
      <ChapterForm
        chapter={{
          name: next ? `${next.city} chapter` : "",
          city: next?.city ?? "",
          region: next?.region ?? "",
          slug: next ? slugify(next.city) : "",
          status: "draft",
          summary: null,
          whatsapp_url: null,
        }}
      />
    </>
  );
}

/** The layout gate checks the admin role; createChapter checks it again on submit. */
export default function NewChapterPage() {
  return (
    <div className="flex max-w-xl flex-col gap-6">
      <Link href="/admin/chapters" className="inline-flex min-h-11 items-center self-start text-sm text-content-link">
        Back to chapters
      </Link>
      <h1 className="text-title text-content">New chapter</h1>
      <p className="text-content-2">New chapters start as drafts. Learners see a chapter once it leaves Draft, and can join while it is Being set up or Active.</p>
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <NewChapter />
      </Suspense>
    </div>
  );
}
