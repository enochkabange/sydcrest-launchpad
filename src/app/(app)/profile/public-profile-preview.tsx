import { getMyProfile, requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { regionLabel } from "@/lib/regions";
import { Initials } from "@/components/social/profile-bits";

/**
 * How the saved profile reads to others, shown beside the forms on wide
 * screens. Saved values only, in the same order as the public page; progress
 * and achievements are left to that page rather than repeated here. Reads the
 * session, so it renders inside a <Suspense> boundary.
 */
export async function PublicProfilePreview() {
  const user = await requireUser();
  const supabase = await createClient();
  const [profile, { data, error }] = await Promise.all([
    getMyProfile(),
    supabase.from("profiles").select("is_public, headline, skills, goals").eq("id", user.id).single(),
  ]);
  if (error) throw new Error(`Could not load public profile settings: ${error.message}`);

  const name = profile.display_name ?? "Launchpad learner";
  const region = regionLabel(profile.region);
  const skills = data.skills ?? [];

  return (
    <section aria-labelledby="preview-heading" className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <h2 id="preview-heading" className="text-sm font-semibold text-content-2">
          Public profile preview
        </h2>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            data.is_public ? "bg-success-bg text-success-fg" : "bg-surface-sunken text-content-2"
          }`}
        >
          {data.is_public ? "Public" : "Private"}
        </span>
      </div>
      <div className="flex flex-col gap-5 rounded-lg border border-line p-5">
        <div className="flex items-center gap-4">
          <Initials name={name} size="lg" />
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-xl font-bold text-content">{name}</p>
            {data.headline && <p className="text-content-2">{data.headline}</p>}
            {region && <p className="text-sm text-content-3">{region} Region</p>}
          </div>
        </div>
        {data.goals && (
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold text-content">Goals</h3>
            <p className="whitespace-pre-line text-sm text-content-2">{data.goals}</p>
          </div>
        )}
        {skills.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-content">Skills</h3>
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li key={skill} className="rounded-full border border-line bg-surface-sunken px-3 py-1 text-sm text-content">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <p className="text-sm text-content-3">
        {data.is_public
          ? "Your public page also shows your progress and achievements."
          : "Only you can see this until you make your profile public."}
      </p>
    </section>
  );
}
