import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { PersonRow } from "@/components/chapters/chapter-bits";
import { requireAdmin } from "@/lib/admin";
import { toPeople } from "@/lib/chapters/public";
import { removeFromChapter, setMemberRole } from "../actions";
import { AppointLeadForm, ChapterForm } from "../chapter-form";

export const metadata: Metadata = { title: "Edit chapter" };

/** The form in one column and the people in the other from lg. */
async function EditChapter({ params }: Pick<PageProps<"/admin/chapters/[id]">, "params">) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const [{ data: chapter }, { data: rows }] = await Promise.all([
    supabase.from("chapters").select("id, slug, name, region, city, status, summary, whatsapp_url").eq("id", id).maybeSingle(),
    supabase
      .from("chapter_roster")
      .select("chapter_id, profile_id, display_name, avatar_url, public_slug, role, joined_at")
      .eq("chapter_id", id)
      .order("joined_at"),
  ]);
  if (!chapter) notFound();
  const people = toPeople(rows);
  const leads = people.filter((p) => p.role === "lead");
  const members = people.filter((p) => p.role === "member");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-title text-content">{chapter.name}</h1>
        {chapter.status !== "draft" && (
          <Link href={`/chapters/${chapter.slug}`} className="inline-flex min-h-11 items-center text-sm font-semibold text-content-link">
            View the chapter page
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
        <section aria-labelledby="details-heading" className="flex flex-col gap-4">
          <h2 id="details-heading" className="text-subtitle text-content">
            Details
          </h2>
          <ChapterForm chapter={chapter} />
        </section>

        <div className="flex flex-col gap-8">
          <section aria-labelledby="leads-heading" className="flex flex-col gap-3">
            <h2 id="leads-heading" className="text-subtitle text-content">
              Leads
            </h2>
            {leads.length === 0 ? (
              <p className="rounded-lg border border-line bg-surface-sunken p-4 text-sm text-content-2">
                No lead yet. Make a member a lead below, or appoint someone by their public profile.
              </p>
            ) : (
              <ul className="flex flex-col divide-y divide-line rounded-lg border border-line px-4">
                {leads.map((p) => (
                  <li key={p.profile_id} className="flex items-center gap-2 py-1">
                    <PersonRow person={p} note="Lead" />
                    <form action={setMemberRole.bind(null, chapter.id, p.profile_id, "member")}>
                      <Button type="submit" variant="ghost" aria-label={`Make ${p.display_name} a member`}>
                        Make member
                      </Button>
                    </form>
                  </li>
                ))}
              </ul>
            )}
            <div className="rounded-lg border border-line p-4">
              <AppointLeadForm chapterId={chapter.id} />
            </div>
          </section>

          <section aria-labelledby="members-heading" className="flex flex-col gap-3">
            <h2 id="members-heading" className="text-subtitle text-content">
              Members <span className="text-content-3">({members.length})</span>
            </h2>
            {members.length === 0 ? (
              <p className="rounded-lg border border-line bg-surface-sunken p-4 text-sm text-content-2">
                Nobody has joined yet. Learners join from the chapter page while it is Being set up or Active.
              </p>
            ) : (
              <ul className="flex flex-col divide-y divide-line rounded-lg border border-line px-4">
                {members.map((p) => (
                  <li key={p.profile_id} className="flex flex-wrap items-center gap-2 py-1">
                    <PersonRow person={p} />
                    <div className="flex gap-1">
                      <form action={setMemberRole.bind(null, chapter.id, p.profile_id, "lead")}>
                        <Button type="submit" variant="secondary" aria-label={`Make ${p.display_name} a lead`}>
                          Make lead
                        </Button>
                      </form>
                      <form action={removeFromChapter.bind(null, chapter.id, p.profile_id)}>
                        <Button type="submit" variant="ghost" aria-label={`Remove ${p.display_name}`}>
                          Remove
                        </Button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default function EditChapterPage({ params }: PageProps<"/admin/chapters/[id]">) {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/chapters" className="inline-flex min-h-11 items-center self-start text-sm text-content-link">
        Back to chapters
      </Link>
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <EditChapter params={params} />
      </Suspense>
    </div>
  );
}
