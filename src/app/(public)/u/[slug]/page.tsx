import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { regionLabel } from "@/lib/regions";
import { describeAchievement } from "@/lib/social/public-profile";
import { getPublicAchievements, getPublicProfileBySlug, getPublicStats } from "@/lib/social/queries";
import { Initials, StatTile } from "@/components/social/profile-bits";
import { ViewerActions } from "./viewer-actions";

export async function generateMetadata({ params }: PageProps<"/u/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getPublicProfileBySlug(slug);
  if (!profile) return { title: "Profile not found", robots: { index: false } };
  const name = profile.display_name ?? "A Launchpad learner";
  return {
    title: name,
    description: profile.headline ?? `${name} is learning tech skills on SydCrest Launchpad.`,
    alternates: { canonical: `/u/${profile.public_slug}` },
  };
}

export default function PublicProfilePage({ params }: PageProps<"/u/[slug]">) {
  return (
    <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
      <PublicProfile params={params} />
    </Suspense>
  );
}

async function PublicProfile({ params }: Pick<PageProps<"/u/[slug]">, "params">) {
  const { slug } = await params;
  const profile = await getPublicProfileBySlug(slug);
  if (!profile?.id || !profile.public_slug) notFound();
  const [stats, achievements] = await Promise.all([getPublicStats(profile.id), getPublicAchievements(profile.id)]);
  const name = profile.display_name ?? "Launchpad learner";
  const region = regionLabel(profile.region);
  const skills = profile.skills ?? [];

  return (
    <article className="flex flex-col gap-8">
      <header className="flex max-w-3xl flex-col gap-4">
        <div className="flex items-center gap-4">
          <Initials name={name} size="lg" />
          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="text-title text-content">{name}</h1>
            {profile.headline && <p className="text-content-2">{profile.headline}</p>}
            {region && <p className="text-sm text-content-3">{region} Region</p>}
          </div>
        </div>
        {stats.has_datacamp_license && (
          <p className="self-start rounded-md border border-info-fg/30 bg-info-bg px-3 py-1.5 text-sm text-info-fg">
            DataCamp Donates licence holder
          </p>
        )}
        <Suspense fallback={<div className="h-11" />}>
          <ViewerActions profileId={profile.id} slug={profile.public_slug} name={name} />
        </Suspense>
      </header>

      {/* One column on phones; from lg the achievements list sits beside progress, goals and skills. */}
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start lg:gap-12">
        <div className="flex flex-col gap-8">
          <section aria-labelledby="progress-heading" className="flex flex-col gap-3">
            <h2 id="progress-heading" className="text-subtitle text-content">
              Progress
            </h2>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatTile label="Topics passed" value={stats.nodes_completed} />
              <StatTile label="Day streak" value={stats.current_streak} />
              <StatTile label="Followers" value={stats.followers_count} />
              <StatTile label="Following" value={stats.following_count} />
            </dl>
          </section>

          {profile.goals && (
            <section aria-labelledby="goals-heading" className="flex flex-col gap-2">
              <h2 id="goals-heading" className="text-subtitle text-content">
                Goals
              </h2>
              <p className="whitespace-pre-line text-content-2">{profile.goals}</p>
            </section>
          )}

          {skills.length > 0 && (
            <section aria-labelledby="skills-heading" className="flex flex-col gap-3">
              <h2 id="skills-heading" className="text-subtitle text-content">
                Skills
              </h2>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li key={skill} className="rounded-full border border-line bg-surface-sunken px-3 py-1 text-sm text-content">
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <section aria-labelledby="achievements-heading" className="flex flex-col gap-3">
          <h2 id="achievements-heading" className="text-subtitle text-content">
            Achievements
          </h2>
          {achievements.length === 0 ? (
            <p className="text-content-2">No achievements yet. They appear here as {name.split(" ")[0]} passes topic quizzes.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-line rounded-lg border border-line">
              {achievements.map((a) => (
                <li key={a.id}>
                  <Link href={`/a/${a.id}`} className="flex min-h-11 items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-surface-sunken">
                    <span className="text-content">{describeAchievement(a.type, a.ref_id, a.title)}</span>
                    <time dateTime={a.created_at} className="shrink-0 text-sm text-content-3">
                      {formatDate(a.created_at)}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </article>
  );
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Accra" }).format(
    new Date(iso),
  );
}
