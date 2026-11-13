import type { Metadata } from "next";
import { Suspense } from "react";
import { Panel, Skeleton } from "@/components/business/bits";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { ImpactReport } from "@/components/outcomes/impact-report";
import { CHECKIN_MONTHS, parseCheckinMonths } from "@/lib/outcomes/checkins";
import { sponsorReport } from "@/lib/outcomes/reports";
import { getOrgForMember } from "@/lib/organisations/queries";
import { CONTACT_EMAIL } from "@/content/marketing";
import { impactCount, tierLabel } from "@/lib/sponsorships";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Impact", robots: { index: false } };

const dateFormat = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "Africa/Accra" });

/**
 * The sponsor portal (#307): for each sponsorship, totals for the learners it
 * covers (any count under five is hidden so nobody can be picked out) and the
 * stories learners chose to share. Owners and admins of the organisation only;
 * the database returns nothing to anyone else.
 */
async function Impact({ params, searchParams }: Pick<PageProps<"/org/[slug]/impact">, "params" | "searchParams">) {
  const { slug } = await params;
  const months = parseCheckinMonths((await searchParams).months);
  const { org } = await getOrgForMember(slug);
  const supabase = await createClient();
  const { data: sponsorships, error } = await supabase
    .from("sponsorships")
    .select("id, scope, tier, seats, starts_on, ends_on, programs(title), cohorts(name, programs(title)), chapters(name)")
    .eq("organisation_id", org.id)
    .order("starts_on", { ascending: false });
  if (error) throw new Error(`Could not load sponsorships: ${error.message}`);

  if (!sponsorships.length) {
    return (
      <Panel tone="sunken">
        <p className="max-w-reading text-content-2">
          {org.name} is not sponsoring anything yet. When you fund seats, a cohort or a chapter, the SydCrest team records it
          here and you can follow its impact: learners, certificates, jobs and the stories learners choose to share. Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> to sponsor.
        </p>
      </Panel>
    );
  }

  const details = await Promise.all(
    sponsorships.map(async (s) => {
      const [impact, stories, outcomes] = await Promise.all([
        supabase.rpc("sponsorship_impact", { p_sponsorship_id: s.id }),
        supabase.rpc("sponsorship_stories", { p_sponsorship_id: s.id }),
        sponsorReport(supabase, s.id, months),
      ]);
      return { s, impact: impact.data?.[0] ?? null, stories: stories.data ?? [], outcomes };
    }),
  );

  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-reading text-content-2">
        Totals only. Any number under five shows as fewer than five, so no learner can be identified. Names appear only with
        stories learners chose to share by name.
      </p>
      {details.map(({ s, impact, stories, outcomes }) => {
        const what =
          s.scope === "cohort"
            ? `${s.cohorts?.programs?.title ?? "Programme"}, ${s.cohorts?.name ?? "cohort"}`
            : s.scope === "chapter"
              ? (s.chapters?.name ?? "Chapter")
              : (s.programs?.title ?? "Programme");
        return (
          <section key={s.id} aria-labelledby={`s-${s.id}`} className="flex flex-col gap-4 rounded-lg border border-line p-5 xl:p-6">
            <div className="flex flex-col gap-1">
              <h2 id={`s-${s.id}`} className="text-subtitle text-content">
                {what}
              </h2>
              <p className="text-sm text-content-3">
                {tierLabel(s.tier)} sponsor since {dateFormat.format(new Date(s.starts_on))}
                {s.ends_on ? `, until ${dateFormat.format(new Date(s.ends_on))}` : ""}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {[
                ["Seats funded", s.seats === null ? "Not set" : String(s.seats)],
                ["Learners", impactCount(impact?.learners ?? null)],
                ["Still learning", impactCount(impact?.active ?? null)],
                ["Finished", impactCount(impact?.finished ?? null)],
                ["Certificates", impactCount(impact?.certificates ?? null)],
                ["Verified jobs and awards", impactCount(impact?.verified_outcomes ?? null)],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1 rounded-md bg-surface-sunken p-3">
                  <dt className="text-sm text-content-2">{label}</dt>
                  <dd className="text-h3 font-bold text-content tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
            {outcomes && (
              <section aria-labelledby={`o-${s.id}`} className="flex flex-col gap-4 border-t border-line pt-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 id={`o-${s.id}`} className="text-h3 text-content">
                    After they finish
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {CHECKIN_MONTHS.map((m) => (
                      <Link
                        key={m}
                        href={`/org/${org.slug}/impact?months=${m}`}
                        aria-current={m === months ? "page" : undefined}
                        className={buttonClasses(m === months ? "primary" : "ghost")}
                      >
                        {m} months
                      </Link>
                    ))}
                    <Link href={`/print/outcomes?sponsorship=${s.id}&months=${months}`} className={buttonClasses("secondary")}>
                      Printable report
                    </Link>
                  </div>
                </div>
                <ImpactReport report={outcomes.report} months={months} stories={[]} showStories={false} idPrefix={`o-${s.id}`} />
              </section>
            )}
            <div className="flex flex-col gap-3">
              <h3 className="text-h3 text-content">Stories</h3>
              {stories.length === 0 ? (
                <p className="text-content-2">No learner has shared a story yet.</p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {stories.map((st, i) => (
                    <li key={i} className="flex flex-col gap-1 rounded-md border border-line p-4">
                      <p className="whitespace-pre-line text-content">{st.story}</p>
                      <p className="text-sm text-content-3">{st.display_name ?? "A learner"}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default function OrgImpactPage({ params, searchParams }: PageProps<"/org/[slug]/impact">) {
  return (
    <Suspense fallback={<Skeleton className="h-80" />}>
      <Impact params={params} searchParams={searchParams} />
    </Suspense>
  );
}
