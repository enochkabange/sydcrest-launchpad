import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { DataTable, rowLinkClass } from "@/components/ui/layout";
import { StatusBadge } from "@/components/chapters/chapter-bits";
import { requireAdmin } from "@/lib/admin";
import { plannedWithoutChapter, sortChapters } from "@/lib/chapters/model";
import { regionLabel } from "@/lib/regions";

export const metadata: Metadata = { title: "Chapters" };

async function ChapterList() {
  const { supabase } = await requireAdmin();
  const [{ data, error }, { data: members }] = await Promise.all([
    supabase.from("chapters").select("id, slug, name, region, city, status"),
    supabase.from("chapter_members").select("chapter_id, role"),
  ]);
  if (error) throw new Error(`Could not load chapters: ${error.message}`);
  const chapters = sortChapters(data);
  const counts = (id: string, role: string) => (members ?? []).filter((m) => m.chapter_id === id && m.role === role).length;
  const next = plannedWithoutChapter(chapters)[0];

  return (
    <div className="flex flex-col gap-6">
      {chapters.length === 0 ? (
        <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5">
          <h2 className="text-h3 text-content">No chapters yet</h2>
          <p className="max-w-reading text-content-2">
            Start with Tamale, the first chapter. It is created as a draft that only admins can see; set it to Being set up
            when it is ready for members, then appoint its lead.
          </p>
          <Link href="/admin/chapters/new" className={buttonClasses("primary", "self-start")}>
            Create the Tamale chapter
          </Link>
        </div>
      ) : (
        <DataTable
          caption="Chapters in launch order"
          rows={chapters}
          rowKey={(c) => c.id}
          columns={[
            {
              header: "Chapter",
              className: "min-w-0 flex-1",
              cell: (c) => (
                <span className="flex min-w-0 flex-col gap-1">
                  <Link href={`/admin/chapters/${c.id}`} className={`font-semibold text-content no-underline ${rowLinkClass}`}>
                    {c.name}
                  </Link>
                  <span className="text-sm text-content-3 md:hidden">
                    {c.city} · {counts(c.id, "lead")} leads · {counts(c.id, "member")} members
                  </span>
                </span>
              ),
            },
            { header: "Place", phone: "hide", className: "text-sm text-content-2", cell: (c) => `${c.city}, ${regionLabel(c.region) ?? c.region}` },
            { header: "Leads", phone: "hide", align: "end", className: "tabular-nums text-content-2", cell: (c) => counts(c.id, "lead") },
            { header: "Members", phone: "hide", align: "end", className: "tabular-nums text-content-2", cell: (c) => counts(c.id, "member") },
            { header: "Status", className: "shrink-0", cell: (c) => <StatusBadge status={c.status} /> },
          ]}
        />
      )}
      {chapters.length > 0 && next && (
        <p className="text-sm text-content-2">
          Next planned capital without a chapter: {next.city}, {next.regionLabel} Region. New chapter fills it in for you.
        </p>
      )}
    </div>
  );
}

export default function AdminChaptersPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-title text-content">Chapters</h1>
          <p className="max-w-reading text-content-2">
            Create chapters, set their status and appoint leads. Leads edit their chapter page and remove members; only
            admins appoint leads.
          </p>
        </div>
        <Link href="/admin/chapters/new" className={buttonClasses("primary")}>
          New chapter
        </Link>
      </div>
      <Suspense fallback={<div className="h-48 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <ChapterList />
      </Suspense>
    </div>
  );
}
