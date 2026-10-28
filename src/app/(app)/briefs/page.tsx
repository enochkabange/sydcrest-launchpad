import type { Metadata } from "next";
import Form from "next/form";
import { Suspense } from "react";
import { BriefCard, PageHeading, Skeleton } from "@/components/briefs/brief-bits";
import { buttonClasses } from "@/components/ui/button";
import { SelectField } from "@/components/ui/field";
import { AutoGrid, MainWithRail } from "@/components/ui/layout";
import Link from "@/components/ui/link";
import { requireUser } from "@/lib/auth";
import {
  BRIEF_KINDS,
  boardHref,
  matchesBoard,
  parseBoardFilters,
  skillFacets,
  type BoardFilters,
} from "@/lib/briefs/briefs";
import { getOpenBriefs, getViewer, type Viewer } from "@/lib/briefs/queries";
import { SOFT_LAUNCH_PRICE } from "@/lib/experts/offers";

export const metadata: Metadata = { title: "Briefs", robots: { index: false } };

/**
 * The brief board. The heading is static; the board reads the session, the
 * URL and the database inside <Suspense>. Open briefs are shown to approved
 * experts (RLS on brief_board); everyone else sees their own briefs here
 * and an honest note about who sees the rest.
 */
export default function BriefsPage({ searchParams }: PageProps<"/briefs">) {
  return (
    <div className="flex flex-col gap-8">
      <PageHeading
        eyebrow="Expert market"
        title="Briefs"
        lead={<p>Post what you need and approved experts pitch to help. {SOFT_LAUNCH_PRICE}.</p>}
        actions={
          <>
            <Link href="/briefs/new" className={buttonClasses("primary")}>
              Post a brief
            </Link>
            <Link href="/briefs/mine" className={buttonClasses("secondary")}>
              Your briefs and pitches
            </Link>
          </>
        }
      />
      <Suspense fallback={<BoardSkeleton />}>
        <Board searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

function BoardSkeleton() {
  return (
    <MainWithRail railFirst railLabel="Filters" rail={<Skeleton className="h-64" />}>
      <AutoGrid min="lg">
        <Skeleton className="h-60" />
        <Skeleton className="h-60" />
      </AutoGrid>
    </MainWithRail>
  );
}

async function Board({ searchParams }: Pick<PageProps<"/briefs">, "searchParams">) {
  const user = await requireUser();
  const [params, viewer, briefs] = await Promise.all([searchParams, getViewer(user.id), getOpenBriefs()]);
  const filters = parseBoardFilters(params);
  const results = briefs.filter((b) => matchesBoard(b, filters));
  const filtered = !!(filters.kind || filters.skill);

  return (
    <MainWithRail
      railFirst
      sticky
      railLabel="Filters and how briefs work"
      rail={
        <>
          <BoardFilterForm filters={filters} skills={skillFacets(briefs)} />
          <HowItWorks viewer={viewer} />
        </>
      }
    >
      {!viewer.isApprovedExpert && <NotAnExpertNote viewer={viewer} />}
      <section aria-labelledby="board-heading" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="board-heading" className="text-subtitle text-content">
            {viewer.isApprovedExpert ? (filtered ? "Matching briefs" : "Open briefs") : "Your open briefs"}
          </h2>
          <p className="text-sm text-content-2" aria-live="polite">
            {filtered ? `${results.length} of ${briefs.length}` : briefs.length} {briefs.length === 1 && !filtered ? "brief" : "briefs"}
          </p>
        </div>
        {results.length === 0 ? (
          <EmptyBoard filtered={filtered} viewer={viewer} />
        ) : (
          <AutoGrid as="ul" min="lg">
            {results.map((b) => (
              <li key={b.id}>
                <BriefCard brief={b} />
              </li>
            ))}
          </AutoGrid>
        )}
      </section>
    </MainWithRail>
  );
}

/** A GET form, so a filtered board is a shareable URL and works before scripts load. Budget is shown, never filtered. */
function BoardFilterForm({ filters, skills }: { filters: BoardFilters; skills: string[] }) {
  const options = filters.skill && !skills.some((s) => s.toLowerCase() === filters.skill.toLowerCase()) ? [filters.skill, ...skills] : skills;
  return (
    <Form
      key={boardHref(filters)}
      action="/briefs"
      role="search"
      aria-label="Filter briefs"
      className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-4 xl:p-5"
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
        <SelectField id="kind" label="Kind" defaultValue={filters.kind}>
          <option value="">Advice and jobs</option>
          {BRIEF_KINDS.map((k) => (
            <option key={k.kind} value={k.kind}>
              {k.label}
            </option>
          ))}
        </SelectField>
        <SelectField id="skill" label="Skill" defaultValue={filters.skill}>
          <option value="">Any skill</option>
          {options.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </SelectField>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="submit" className={buttonClasses("primary", "flex-1")}>
          Show briefs
        </button>
        {(filters.kind || filters.skill) && (
          <Link href="/briefs" className={buttonClasses("ghost")}>
            Clear
          </Link>
        )}
      </div>
    </Form>
  );
}

function HowItWorks({ viewer }: { viewer: Viewer }) {
  return (
    <section aria-labelledby="how-heading" className="hidden flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5 lg:flex">
      <h2 id="how-heading" className="text-h3 text-content">
        How briefs work
      </h2>
      <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm text-content-2">
        <li>Anyone can post an advice brief. Verified organisations also post job briefs.</li>
        <li>Approved experts with matching skills hear about it and pitch.</li>
        <li>You accept the pitch that fits. That opens a booking with the expert.</li>
      </ol>
      <p className="text-sm text-content-2">
        Budgets and prices are indicative only. {SOFT_LAUNCH_PRICE}, so nobody pays through SydCrest.
      </p>
      {viewer.isApprovedExpert && (
        <p className="text-sm text-content-2">You see open briefs because you are an approved expert.</p>
      )}
    </section>
  );
}

function NotAnExpertNote({ viewer }: { viewer: Viewer }) {
  return (
    <section className="flex flex-col gap-2 rounded-lg border border-line bg-info-bg p-5 text-info-fg lg:p-6">
      <h2 className="font-semibold">Open briefs are shared with approved experts</h2>
      <p className="max-w-reading text-sm">
        Post a brief and the experts whose skills match are told about it. Briefs you post
        {viewer.postableOrgs.length > 0 ? " and your organisation's job briefs" : ""} show here while they are open.
      </p>
    </section>
  );
}

function EmptyBoard({ filtered, viewer }: { filtered: boolean; viewer: Viewer }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-lg border border-dashed border-line-strong p-6 xl:p-10">
      <p className="font-semibold text-content">
        {filtered ? "No briefs match these filters." : viewer.isApprovedExpert ? "No open briefs right now." : "You have no open briefs."}
      </p>
      <p className="max-w-reading text-content-2">
        {filtered
          ? "Try another skill or kind."
          : viewer.isApprovedExpert
            ? "When someone posts a brief that matches your skills, we will let you know in your notifications."
            : "Describe what you need, the skills it takes and an indicative budget if you have one. Experts reply with a pitch."}
      </p>
      {filtered ? (
        <Link href="/briefs" className={buttonClasses("secondary")}>
          Clear filters
        </Link>
      ) : (
        !viewer.isApprovedExpert && (
          <Link href="/briefs/new" className={buttonClasses("primary")}>
            Post a brief
          </Link>
        )
      )}
    </div>
  );
}

