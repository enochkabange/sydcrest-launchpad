import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { AutoGrid, MainWithRail } from "@/components/ui/layout";
import { ChapterCard, PlannedCard } from "@/components/chapters/chapter-bits";
import { getCurrentUser } from "@/lib/auth";
import { plannedFor, plannedWithoutChapter, statusCopy, suggestChapter } from "@/lib/chapters/model";
import { getChapterLeads, getPublicChapters } from "@/lib/chapters/public";
import { getMyChapters } from "@/lib/chapters/viewer";
import { regionLabel } from "@/lib/regions";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Chapters",
  description:
    "Launchpad chapters bring learners together in their city, starting with Tamale and the northern regional capitals.",
  alternates: { canonical: "/chapters" },
};

/**
 * Every visible chapter, plus the northern capitals that do not have one yet
 * (honest "planned" cards). The list is cached and prerendered; the "your
 * chapter" card reads the session, so it streams in its own <Suspense>.
 */
export default function ChaptersPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-title text-content">Chapters</h1>
        <p className="max-w-reading text-lead text-content-2">
          A chapter is Launchpad in your city: a volunteer lead, a WhatsApp group, meetups and Skillshops. We are starting
          in the five northern regional capitals, beginning with Tamale.
        </p>
      </header>
      <MainWithRail
        railLabel="Your chapter and how chapters work"
        rail={
          <>
            <Suspense fallback={<div className="h-40 animate-skeleton rounded-lg bg-surface-sunken" />}>
              <YourChapter />
            </Suspense>
            <HowChaptersWork />
          </>
        }
      >
        <ChapterList />
      </MainWithRail>
    </div>
  );
}

async function ChapterList() {
  const chapters = await getPublicChapters();
  const leads = await Promise.all(chapters.map((c) => getChapterLeads(c.id)));
  const planned = plannedWithoutChapter(chapters);
  return (
    <section aria-labelledby="chapters-heading" className="flex flex-col gap-4">
      <h2 id="chapters-heading" className="sr-only">
        All chapters
      </h2>
      <AutoGrid as="ul" min="md">
        {chapters.map((c, i) => (
          <ChapterCard key={c.id} chapter={c} leads={leads[i]} />
        ))}
        {planned.map((p) => (
          <PlannedCard key={p.region} city={p.city} regionLabel={p.regionLabel} first={chapters.length === 0 && p.city === "Tamale"} />
        ))}
      </AutoGrid>
    </section>
  );
}

function RailCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-line p-5">
      <h2 className="text-h3 text-content">{title}</h2>
      {children}
    </section>
  );
}

/** The chapter for the viewer's region, or the ones they are in. */
async function YourChapter() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <RailCard title="Your chapter">
        <p className="text-sm text-content-2">Sign in to join the chapter near you and see who else is in it.</p>
        <Link href="/login?next=/chapters" className={buttonClasses("secondary", "self-start")}>
          Sign in
        </Link>
      </RailCard>
    );
  }
  const supabase = await createClient();
  const [mine, chapters, profile] = await Promise.all([
    getMyChapters(user.id),
    getPublicChapters(),
    supabase.from("profiles").select("region").eq("id", user.id).maybeSingle(),
  ]);
  const region = profile.data?.region ?? null;

  if (mine.length > 0) {
    return (
      <RailCard title={mine.length > 1 ? "Your chapters" : "Your chapter"}>
        <ul className="flex flex-col">
          {mine.map((c) => (
            <li key={c.slug}>
              <Link href={`/chapters/${c.slug}`} className="flex min-h-11 items-center justify-between gap-3 font-semibold">
                {c.name}
                <span className="text-sm font-normal text-content-3">{c.role === "lead" ? "Lead" : "Member"}</span>
              </Link>
            </li>
          ))}
        </ul>
      </RailCard>
    );
  }

  const suggested = suggestChapter(chapters, region);
  if (suggested) {
    return (
      <RailCard title="Your chapter">
        <p className="text-sm text-content-2">
          Your profile says {regionLabel(region)} Region, so {suggested.name} is yours. {statusCopy(suggested.status).summary}
        </p>
        <Link href={`/chapters/${suggested.slug}`} className={buttonClasses("primary", "self-start")}>
          See {suggested.city}
        </Link>
      </RailCard>
    );
  }

  const planned = plannedFor(region);
  return (
    <RailCard title="Your chapter">
      <p className="text-sm text-content-2">
        {planned
          ? `The ${planned.city} chapter for ${planned.regionLabel} Region is being set up. Check back here, and keep an eye on the WhatsApp community for news.`
          : region
            ? `There is no chapter in ${regionLabel(region)} Region yet. You can still join any open chapter.`
            : "Add your region to your profile and we will point you to the chapter near you."}
      </p>
      {!region && (
        <Link href="/profile" className={buttonClasses("secondary", "self-start")}>
          Add your region
        </Link>
      )}
    </RailCard>
  );
}

function HowChaptersWork() {
  return (
    <RailCard title="How chapters work">
      <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-content-2">
        <li>A volunteer chapter lead runs the local community, events and partners.</li>
        <li>Members meet at Skillshops and talk in the chapter WhatsApp group.</li>
        <li>Every chapter shares one platform and one community, with local events.</li>
      </ul>
    </RailCard>
  );
}
