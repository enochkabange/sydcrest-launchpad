import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";
import { tierLabel } from "@/lib/sponsorships";
import { deleteSponsorship, setStoryHidden } from "./actions";
import { SponsorshipForm } from "./sponsorship-form";

export const metadata: Metadata = { title: "Sponsorships", robots: { index: false } };

/** Record who sponsors what (#307), and look after the stories sponsors can read. */
async function Sponsorships() {
  const { supabase } = await requireAdmin();
  const [sponsorships, organisations, programmes, cohorts, chapters, stories] = await Promise.all([
    supabase
      .from("sponsorships")
      .select("id, scope, tier, seats, starts_on, organisations(name, slug), programs(title), cohorts(name), chapters(name)")
      .order("starts_on", { ascending: false }),
    supabase.from("organisations").select("id, name").eq("verification_status", "verified").order("name"),
    supabase.from("programs").select("id, title").order("title"),
    supabase.from("cohorts").select("id, name, programs(title)").order("starts_on", { ascending: false }),
    supabase.from("chapters").select("id, name").order("name"),
    supabase.from("learner_stories").select("profile_id, story, show_name, hidden_at, updated_at").order("updated_at", { ascending: false }).limit(100),
  ]);
  if (sponsorships.error) throw new Error(`Could not load sponsorships: ${sponsorships.error.message}`);

  return (
    <div className="flex flex-col gap-10">
      <section aria-labelledby="record-heading" className="flex max-w-2xl flex-col gap-4">
        <h2 id="record-heading" className="text-subtitle text-content">
          Record a sponsorship
        </h2>
        <p className="text-content-2">
          Sponsors must have a verified organisation on SydCrest. Their owners and admins then see totals and opted in
          stories under Impact on their organisation page.
        </p>
        <SponsorshipForm
          organisations={(organisations.data ?? []).map((o) => ({ id: o.id, label: o.name }))}
          programmes={(programmes.data ?? []).map((p) => ({ id: p.id, label: p.title }))}
          cohorts={(cohorts.data ?? []).map((c) => ({ id: c.id, label: `${c.programs?.title ?? "Programme"}: ${c.name}` }))}
          chapters={(chapters.data ?? []).map((c) => ({ id: c.id, label: c.name }))}
        />
      </section>

      <section aria-labelledby="list-heading" className="flex flex-col gap-4">
        <h2 id="list-heading" className="text-subtitle text-content">
          Sponsorships
        </h2>
        {sponsorships.data.length === 0 ? (
          <p className="text-content-2">None yet.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-line rounded-lg border border-line">
            {sponsorships.data.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <span className="flex flex-col gap-1">
                  <span className="font-semibold text-content">
                    {s.organisations?.slug ? <Link href={`/org/${s.organisations.slug}/impact`}>{s.organisations.name}</Link> : s.organisations?.name}
                  </span>
                  <span className="text-sm text-content-2">
                    {tierLabel(s.tier)} · {s.scope === "cohort" ? s.cohorts?.name : s.scope === "chapter" ? s.chapters?.name : s.programs?.title}
                    {s.seats !== null ? ` · ${s.seats} seats` : ""} · from {s.starts_on}
                  </span>
                </span>
                <form action={deleteSponsorship.bind(null, s.id)}>
                  <Button type="submit" variant="ghost" aria-label={`Delete the ${s.organisations?.name ?? ""} sponsorship`}>
                    Delete
                  </Button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="stories-heading" className="flex flex-col gap-4">
        <h2 id="stories-heading" className="text-subtitle text-content">
          Learner stories
        </h2>
        <p className="max-w-reading text-content-2">
          Learners write these on their profile for sponsors. Hide any that should not be shown; the learner can edit it.
        </p>
        {(stories.data ?? []).length === 0 ? (
          <p className="text-content-2">No stories yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {(stories.data ?? []).map((st) => (
              <li key={st.profile_id} className="flex flex-col gap-2 rounded-md border border-line p-4">
                <p className="whitespace-pre-line text-content">{st.story}</p>
                <p className="text-sm text-content-3">
                  {st.show_name ? "Shown with their name" : "Shown without a name"}
                  {st.hidden_at ? " · Hidden from sponsors" : ""}
                </p>
                <form action={setStoryHidden.bind(null, st.profile_id, !st.hidden_at)}>
                  <Button type="submit" variant="secondary">
                    {st.hidden_at ? "Show to sponsors" : "Hide from sponsors"}
                  </Button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default function AdminSponsorshipsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-title text-content">Sponsorships</h1>
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Sponsorships />
      </Suspense>
    </div>
  );
}
