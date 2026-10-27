import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { Button, buttonClasses } from "@/components/ui/button";
import { SelectField, TextField } from "@/components/ui/field";
import { AutoGrid, MainWithRail } from "@/components/ui/layout";
import { Panel, Skeleton } from "@/components/business/bits";
import { TalentCard } from "@/components/business/talent-card";
import { getMyProfile, requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getMyMemberships } from "@/lib/organisations/queries";
import { REGIONS } from "@/lib/regions";
import { TRACKS } from "@/lib/roadmap-admin";
import { hasFilters, matchesSkill, parseDirectoryFilters, type DirectoryFilters } from "@/lib/talent/forms";

export const metadata: Metadata = { title: "Talent", robots: { index: false } };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/**
 * Who may browse: active members of a verified organisation, and admins.
 * The talent_directory view returns no rows to anyone else, which would look
 * like "no matches"; this check says why instead.
 */
async function audience() {
  await requireUser();
  const [memberships, profile] = await Promise.all([getMyMemberships(), getMyProfile()]);
  const active = memberships.filter((m) => m.status === "active");
  const verified = active.some((m) => m.organisation.verification_status === "verified");
  return { allowed: verified || profile.role === "admin", hasOrg: active.length > 0, firstOrg: active[0]?.organisation ?? null };
}

function Filters({ filters }: { filters: DirectoryFilters }) {
  return (
    <form method="get" action="/talent" role="search" aria-label="Filter talent" className="flex flex-col gap-4 rounded-lg border border-line bg-surface-sunken p-5">
      <h2 className="text-h3 text-content">Filter</h2>
      <TextField id="skill" label="Skill" placeholder="For example Excel" defaultValue={filters.skill} maxLength={40} />
      <SelectField id="track" label="Track" defaultValue={filters.track}>
        <option value="">Any track</option>
        {TRACKS.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </SelectField>
      <SelectField id="region" label="Region" defaultValue={filters.region}>
        <option value="">Any region</option>
        {REGIONS.map((r) => (
          <option key={r.slug} value={r.slug}>
            {r.label}
          </option>
        ))}
      </SelectField>
      <div className="flex flex-wrap gap-2">
        <Button type="submit">Show talent</Button>
        {hasFilters(filters) && (
          <Link href="/talent" className={buttonClasses("ghost")}>
            Clear filters
          </Link>
        )}
      </div>
    </form>
  );
}

async function Results({ filters }: { filters: DirectoryFilters }) {
  const user = await requireUser();
  const supabase = await createClient();
  let query = supabase.from("talent_directory").select("*").neq("profile_id", user.id).order("updated_at", { ascending: false }).limit(300);
  if (filters.track) query = query.contains("tracks", [filters.track]);
  if (filters.region) query = query.eq("region", filters.region);
  const { data, error } = await query;
  if (error) throw new Error(`Could not load the directory: ${error.message}`);
  // Skills are free text, so match them here without caring about case.
  const rows = (data ?? []).filter((r) => r.profile_id && matchesSkill(r.skills, filters.skill));

  if (rows.length === 0) {
    return (
      <Panel tone="sunken">
        <p className="max-w-reading text-content-2">
          {hasFilters(filters)
            ? "No listed learners match these filters. Try fewer filters or a shorter skill."
            : "No learners are listed yet. The directory opens to learners as they earn SydCrest certificates and choose to be found, so it grows with each cohort."}
        </p>
        {hasFilters(filters) && (
          <Link href="/talent" className={buttonClasses("secondary", "self-start")}>
            Clear filters
          </Link>
        )}
      </Panel>
    );
  }

  return (
    <>
      <p className="text-sm text-content-2" aria-live="polite">
        {rows.length === 1 ? "1 learner" : `${rows.length} learners`}
      </p>
      <AutoGrid min="md" as="ul">
        {rows.map((r) => (
          <li key={r.profile_id}>
            <TalentCard row={r} href={`/talent/${r.profile_id}`} />
          </li>
        ))}
      </AutoGrid>
    </>
  );
}

async function Directory({ searchParams }: { searchParams: SearchParams }) {
  const { allowed, hasOrg, firstOrg } = await audience();
  if (!allowed) {
    return (
      <Panel tone="sunken" title="For verified organisations">
        <p className="max-w-reading text-content-2">
          The talent directory lists certified learners who chose to be found. Members of verified organisations browse
          it and ask to talk through SydCrest.
          {hasOrg ? " Your organisation is not verified yet." : ""}
        </p>
        <div className="flex flex-wrap gap-2">
          {hasOrg && firstOrg ? (
            <Link href={`/org/${firstOrg.slug}/manage`} className={buttonClasses("primary")}>
              Ask to be verified
            </Link>
          ) : (
            <Link href="/business/new" className={buttonClasses("primary")}>
              Create a business account
            </Link>
          )}
          <Link href="/talent/me" className={buttonClasses("secondary")}>
            List yourself as a learner
          </Link>
        </div>
      </Panel>
    );
  }
  const filters = parseDirectoryFilters(await searchParams);
  return (
    // Phones: filters above the list. From lg: the list with the filters in a sticky rail on the right.
    <MainWithRail railLabel="Filters" railFirst sticky rail={<Filters filters={filters} />}>
      <div className="flex flex-col gap-4">
        <Suspense key={JSON.stringify(filters)} fallback={<Skeleton className="h-96" />}>
          <Results filters={filters} />
        </Suspense>
      </div>
    </MainWithRail>
  );
}

export default function TalentPage({ searchParams }: PageProps<"/talent">) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-title text-content">Talent</h1>
        <p className="max-w-reading text-lead text-content-2">
          Certified SydCrest learners who chose to be found. Ask to talk through SydCrest; they decide whether to share
          how to reach them.
        </p>
      </div>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <Directory searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
