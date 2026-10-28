import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { requireAdmin } from "@/lib/admin";
import { fromVerifiedSkillRows, sourceLabel, formatIssued } from "@/lib/skills/verified";
import { Badge } from "../../roadmaps/fields";
import { removeRoadmapMapping, setSkillPublished } from "../actions";
import { SkillForm } from "../skill-form";
import { AssessmentCreateForm, MappingForm, RevokeForm } from "./forms";

export const metadata: Metadata = { title: "Edit skill" };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function AdminSkillPage({ params }: PageProps<"/admin/skills/[id]">) {
  return (
    <div className="flex flex-col gap-8">
      <Link href="/admin/skills" className="inline-flex min-h-11 items-center self-start text-sm text-content-link">
        Back to skills
      </Link>
      <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <SkillEditor params={params} />
      </Suspense>
    </div>
  );
}

async function SkillEditor({ params }: Pick<PageProps<"/admin/skills/[id]">, "params">) {
  const { id } = await params;
  if (!UUID.test(id)) notFound();
  const { supabase } = await requireAdmin();
  const [{ data: skill }, { data: roadmaps }, { data: holders }] = await Promise.all([
    supabase
      .from("skills")
      .select("id, slug, name, summary, is_published, skill_roadmaps(roadmap_slug), skill_assessments(id, kind, title, is_published, questions)")
      .eq("id", id)
      .maybeSingle(),
    supabase.from("roadmaps").select("slug, title, is_published").order("title"),
    supabase
      .from("verified_skills")
      .select("id, profile_id, source, issued_at, revoked_at, skill:skills(slug, name)")
      .eq("skill_id", id)
      .is("revoked_at", null)
      .order("issued_at", { ascending: false })
      .limit(100),
  ]);
  if (!skill) notFound();

  // Admins cannot read other people's profiles; names come from the public view where the profile is public.
  const holderIds = [...new Set((holders ?? []).map((h) => h.profile_id))];
  const { data: names } = holderIds.length
    ? await supabase.from("public_profiles").select("id, display_name, public_slug").in("id", holderIds)
    : { data: [] };
  const nameOf = new Map((names ?? []).map((n) => [n.id, n]));
  const badges = fromVerifiedSkillRows(holders ?? []);
  const holderOf = new Map((holders ?? []).map((h) => [h.id, h.profile_id]));

  const roadmapBySlug = new Map((roadmaps ?? []).map((r) => [r.slug, r]));
  const mapped = skill.skill_roadmaps.map((m) => m.roadmap_slug).sort();
  const unmapped = (roadmaps ?? []).filter((r) => !mapped.includes(r.slug));
  const has = (kind: string) => skill.skill_assessments.some((a) => a.kind === kind);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-title text-content">{skill.name}</h1>
          <Badge tone={skill.is_published ? "success" : "neutral"}>{skill.is_published ? "Published" : "Draft"}</Badge>
        </div>
        <p className="text-content-2">
          {skill.is_published
            ? "Anyone can see this skill, and people can earn it in the ways set up below."
            : "Only admins can see this skill. Nobody can earn it until you publish it."}
        </p>
        <div className="flex flex-wrap gap-2">
          <form action={setSkillPublished}>
            <input type="hidden" name="id" value={skill.id} />
            <input type="hidden" name="publish" value={skill.is_published ? "false" : "true"} />
            <Button type="submit" variant={skill.is_published ? "secondary" : "primary"}>
              {skill.is_published ? "Unpublish" : "Publish"}
            </Button>
          </form>
          {skill.is_published && (
            <Link href={`/skills/${skill.slug}`} className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-content-link underline">
              View the public page
            </Link>
          )}
        </div>
      </div>

      {/* One column on phones. From lg the ways to earn sit beside the skill's details. */}
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start lg:gap-10 xl:gap-12">
        <div className="flex flex-col gap-8">
          <section aria-labelledby="paths-heading" className="flex flex-col gap-4 border-t border-line pt-6">
            <div className="flex flex-col gap-1">
              <h2 id="paths-heading" className="text-subtitle text-content">
                Matching roadmaps
              </h2>
              <p className="text-sm text-content-2">
                Finishing any of these roadmaps (every required topic quiz passed) issues the skill. Mapped by slug, so the
                mapping survives content imports.
              </p>
            </div>
            {mapped.length === 0 ? (
              <p className="rounded-lg border border-line p-4 text-content-2">No roadmaps mapped yet.</p>
            ) : (
              <ul className="flex flex-col divide-y divide-line rounded-lg border border-line">
                {mapped.map((slug) => {
                  const roadmap = roadmapBySlug.get(slug);
                  return (
                    <li key={slug} className="flex items-center justify-between gap-3 px-4 py-1">
                      <span className="flex min-w-0 flex-wrap items-center gap-2">
                        <span className="font-semibold text-content">{roadmap?.title ?? slug}</span>
                        {!roadmap && <Badge tone="danger">No roadmap with this slug</Badge>}
                        {roadmap && !roadmap.is_published && <Badge tone="neutral">Roadmap is a draft</Badge>}
                      </span>
                      <form action={removeRoadmapMapping}>
                        <input type="hidden" name="skill_id" value={skill.id} />
                        <input type="hidden" name="roadmap_slug" value={slug} />
                        <Button type="submit" variant="ghost" className="min-w-11 px-0" aria-label={`Remove ${roadmap?.title ?? slug}`}>
                          <X aria-hidden className="size-5" />
                        </Button>
                      </form>
                    </li>
                  );
                })}
              </ul>
            )}
            <MappingForm skillId={skill.id} roadmaps={unmapped.map((r) => ({ slug: r.slug, title: r.title, isPublished: r.is_published }))} />
          </section>

          <section aria-labelledby="assessments-heading" className="flex flex-col gap-4 border-t border-line pt-6">
            <div className="flex flex-col gap-1">
              <h2 id="assessments-heading" className="text-subtitle text-content">
                Assessments
              </h2>
              <p className="text-sm text-content-2">
                For people who already have the skill: a quiz graded against a hidden key, or a portfolio a mentor or admin
                reviews. One of each per skill.
              </p>
            </div>
            {skill.skill_assessments.length > 0 && (
              <ul className="flex flex-col divide-y divide-line rounded-lg border border-line">
                {skill.skill_assessments.map((a) => (
                  <li key={a.id}>
                    <Link
                      href={`/admin/skills/${skill.id}/assessments/${a.id}`}
                      className="flex min-h-14 flex-wrap items-center justify-between gap-2 px-4 py-2 hover:bg-surface-sunken"
                    >
                      <span className="flex flex-col">
                        <span className="font-semibold text-content">{a.title}</span>
                        <span className="text-sm text-content-2">
                          {a.kind === "quiz"
                            ? `Quiz, ${Array.isArray(a.questions) ? a.questions.length : 0} questions`
                            : "Portfolio review"}
                        </span>
                      </span>
                      <Badge tone={a.is_published ? "success" : "neutral"}>{a.is_published ? "Published" : "Draft"}</Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {(!has("quiz") || !has("portfolio")) && (
              <AssessmentCreateForm skillId={skill.id} kinds={(["quiz", "portfolio"] as const).filter((k) => !has(k))} />
            )}
          </section>

          <section aria-labelledby="holders-heading" className="flex flex-col gap-4 border-t border-line pt-6">
            <div className="flex flex-col gap-1">
              <h2 id="holders-heading" className="text-subtitle text-content">
                People who hold it
              </h2>
              <p className="text-sm text-content-2">
                Revoke a badge given in error or after misconduct. It leaves their profile, expert page and the talent
                directory at once, and they can earn it again.
              </p>
            </div>
            {badges.length === 0 ? (
              <p className="rounded-lg border border-line p-4 text-content-2">Nobody holds this skill yet.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {badges.map((b) => {
                  const person = nameOf.get(holderOf.get(b.id) ?? "");
                  return (
                    <li key={b.id} className="flex flex-col gap-2 rounded-lg border border-line p-4">
                      <p className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-semibold text-content">
                          {person?.public_slug ? (
                            <Link href={`/u/${person.public_slug}`} className="text-content-link underline">
                              {person.display_name ?? person.public_slug}
                            </Link>
                          ) : (
                            "Private profile"
                          )}
                        </span>
                        <span className="text-sm text-content-2">
                          {sourceLabel(b.source)}, {formatIssued(b.issuedAt)}
                        </span>
                      </p>
                      <RevokeForm verifiedSkillId={b.id} />
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>

        <section aria-labelledby="details-heading" className="flex flex-col gap-4 border-t border-line pt-6">
          <h2 id="details-heading" className="text-subtitle text-content">
            Details
          </h2>
          <SkillForm skill={skill} />
        </section>
      </div>
    </>
  );
}
