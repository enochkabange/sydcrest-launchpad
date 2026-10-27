import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { Initials } from "@/components/social/profile-bits";
import { describeAchievement } from "@/lib/social/public-profile";
import { getSharedAchievement } from "@/lib/social/queries";

export async function generateMetadata({ params }: PageProps<"/a/[id]">): Promise<Metadata> {
  const { id } = await params;
  const shared = await getSharedAchievement(id);
  if (!shared) return { title: "Achievement not found", robots: { index: false } };
  const name = shared.owner.display_name ?? "A Launchpad learner";
  const what = describeAchievement(shared.achievement.type, shared.achievement.ref_id, shared.achievement.title);
  return {
    title: `${name}: ${what}`,
    description: `${name} reached a milestone on SydCrest Launchpad, free tech roadmaps for Ghana.`,
  };
}

export default function AchievementPage({ params }: PageProps<"/a/[id]">) {
  return (
    <Suspense fallback={<div className="h-72 animate-skeleton rounded-lg bg-surface-sunken" />}>
      <SharedAchievement params={params} />
    </Suspense>
  );
}

async function SharedAchievement({ params }: Pick<PageProps<"/a/[id]">, "params">) {
  const { id } = await params;
  const shared = await getSharedAchievement(id);
  if (!shared) notFound();
  const { achievement, owner } = shared;
  const name = owner.display_name ?? "Launchpad learner";
  const when = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Accra" }).format(
    new Date(achievement.created_at),
  );

  return (
    <article className="flex max-w-2xl flex-col items-start gap-6">
      <div className="flex w-full flex-col gap-4 rounded-lg border border-line bg-surface-sunken p-6">
        <p className="text-sm font-semibold text-content-accent">Achievement</p>
        <h1 className="text-title text-content">
          {describeAchievement(achievement.type, achievement.ref_id, achievement.title)}
        </h1>
        <div className="flex items-center gap-3">
          <Initials name={name} />
          <p className="text-content-2">
            {owner.public_slug ? (
              <Link href={`/u/${owner.public_slug}`} className="font-semibold text-content-link underline">
                {name}
              </Link>
            ) : (
              name
            )}{" "}
            on <time dateTime={achievement.created_at}>{when}</time>
          </p>
        </div>
      </div>
      <p className="text-content-2">SydCrest Launchpad has free roadmaps for tech careers in Ghana.</p>
      <Link href="/signup" className={buttonClasses("primary")}>
        Start learning free
      </Link>
    </article>
  );
}
