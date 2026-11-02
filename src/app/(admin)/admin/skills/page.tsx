import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { DataTable, MainWithRail, rowLinkClass } from "@/components/ui/layout";
import { requireAdmin } from "@/lib/admin";
import { Badge } from "../roadmaps/fields";
import { SkillForm } from "./skill-form";

export const metadata: Metadata = { title: "Skills" };

export default function AdminSkillsPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex max-w-reading flex-col gap-2">
        <h1 className="text-title text-content">Skills</h1>
        <p className="text-content-2">
          The verified skill catalogue. People earn a skill by completing a mapped roadmap, passing its quiz or having their
          portfolio approved. Nobody can be given one by hand.
        </p>
        <p className="text-content-2">
          Portfolios are reviewed by admins and by the{" "}
          <Link href="/admin/skills/reviewers" className="font-semibold text-content-link underline">
            portfolio reviewers
          </Link>{" "}
          you appoint.
        </p>
      </header>
      <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Catalogue />
      </Suspense>
    </div>
  );
}

type Row = {
  id: string;
  slug: string;
  name: string;
  is_published: boolean;
  paths: number;
  assessments: { kind: string; is_published: boolean }[];
  holders: number;
};

async function Catalogue() {
  const { supabase } = await requireAdmin();
  const [{ data, error }, holders] = await Promise.all([
    supabase
      .from("skills")
      .select("id, slug, name, is_published, skill_roadmaps(count), skill_assessments(kind, is_published)")
      .order("name"),
    supabase.from("verified_skills").select("skill_id").is("revoked_at", null),
  ]);
  if (error) throw new Error(`Could not load skills: ${error.message}`);
  const counts = new Map<string, number>();
  for (const h of holders.data ?? []) counts.set(h.skill_id, (counts.get(h.skill_id) ?? 0) + 1);
  const rows: Row[] = (data ?? []).map((s) => ({
    id: s.id,
    slug: s.slug,
    name: s.name,
    is_published: s.is_published,
    paths: s.skill_roadmaps[0]?.count ?? 0,
    assessments: s.skill_assessments,
    holders: counts.get(s.id) ?? 0,
  }));

  return (
    <MainWithRail
      railLabel="Add a skill"
      rail={
        <div className="flex flex-col gap-4 rounded-lg border border-line p-5">
          <h2 className="text-subtitle text-content">Add a skill</h2>
          <SkillForm />
        </div>
      }
    >
      {rows.length === 0 ? <FirstSteps /> : (
        <DataTable
          caption="Skills in the catalogue"
          rows={rows}
          rowKey={(r) => r.id}
          columns={[
            {
              header: "Skill",
              cell: (r) => (
                <Link href={`/admin/skills/${r.id}`} className={`font-semibold text-content-link underline ${rowLinkClass}`}>
                  {r.name}
                </Link>
              ),
            },
            {
              header: "Status",
              cell: (r) => <Badge tone={r.is_published ? "success" : "neutral"}>{r.is_published ? "Published" : "Draft"}</Badge>,
            },
            { header: "Paths", cell: (r) => r.paths, align: "end", phone: "hide" },
            {
              header: "Ways to earn",
              cell: (r) => waysLabel(r),
              phone: "hide",
              className: "text-sm text-content-2",
            },
            { header: "Holders", cell: (r) => r.holders, align: "end", phone: "hide" },
          ]}
        />
      )}
    </MainWithRail>
  );
}

function waysLabel(r: Row) {
  const live = (kind: string) => r.assessments.some((a) => a.kind === kind && a.is_published);
  const draft = (kind: string) => r.assessments.some((a) => a.kind === kind && !a.is_published);
  const parts = [
    r.paths > 0 && "path",
    live("quiz") ? "quiz" : draft("quiz") && "quiz (draft)",
    live("portfolio") ? "portfolio" : draft("portfolio") && "portfolio (draft)",
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : "None yet";
}

/** The founder's first step: the catalogue is admin data, so it starts empty. */
function FirstSteps() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5 xl:p-6">
      <h2 className="text-subtitle text-content">Start the catalogue</h2>
      <p className="text-content-2">
        There are no skills yet, so /skills shows a coming soon note and nobody can earn a badge. To open the first skill:
      </p>
      <ol className="flex list-decimal flex-col gap-2 pl-5 text-content-2">
        <li>
          <span className="font-semibold text-content">Add a skill</span> with the form beside this list, for example a
          skill a published roadmap teaches. Write a one or two sentence summary of what holding it means.
        </li>
        <li>
          <span className="font-semibold text-content">Map it to roadmaps</span> on the skill&apos;s page. Learners who
          finish a mapped roadmap get the badge at once; learners who finished it earlier can claim it from their profile.
        </li>
        <li>
          <span className="font-semibold text-content">Add a quiz, a portfolio review or both</span> for people who already
          have the skill. Write the questions and choose the right answers; learners never see the key.
        </li>
        <li>
          <span className="font-semibold text-content">Publish</span> the assessments, then the skill. Nothing is public
          until the skill is published.
        </li>
      </ol>
    </div>
  );
}
