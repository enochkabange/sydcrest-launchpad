import "server-only";
import type { createClient } from "@/lib/supabase/server";

type Client = Awaited<ReturnType<typeof createClient>>;

/**
 * What a learner can tick under "skills you use": their live verified skills
 * and their tracks (the roadmap they finished for this check in plus the
 * tracks in About you). Values are slugs; the action accepts nothing else.
 */
export async function checkinSkillOptions(supabase: Client, profileId: string, roadmapId: string | null) {
  const [skills, profile, finished] = await Promise.all([
    supabase.from("verified_skills").select("skills(slug, name)").eq("profile_id", profileId).is("revoked_at", null),
    supabase.from("learner_profiles").select("tracks").eq("profile_id", profileId).maybeSingle(),
    roadmapId
      ? supabase.from("roadmaps").select("slug").eq("id", roadmapId).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);
  const trackSlugs = [...new Set([...(finished.data?.slug ? [finished.data.slug] : []), ...(profile.data?.tracks ?? [])])];
  const roadmaps = trackSlugs.length
    ? ((await supabase.from("roadmaps").select("slug, title").in("slug", trackSlugs)).data ?? [])
    : [];

  const options = new Map<string, string>();
  for (const row of skills.data ?? []) if (row.skills) options.set(row.skills.slug, row.skills.name);
  for (const r of roadmaps) if (!options.has(r.slug)) options.set(r.slug, r.title);
  return [...options].map(([value, label]) => ({ value, label })).sort((a, b) => a.label.localeCompare(b.label));
}
