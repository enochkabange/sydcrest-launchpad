import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/field";
import { Initials } from "@/components/social/profile-bits";
import { getMyProfile, requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import { REGIONS, regionLabel } from "@/lib/regions";
import { BOARDS, parseBoardParams, rank, type Board } from "@/lib/social/leaderboard";

export const metadata: Metadata = { title: "Leaderboards" };

const LIMIT = 50;

export default function LeaderboardsPage({ searchParams }: PageProps<"/leaderboards">) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl text-content">Leaderboards</h1>
        <p className="max-w-3xl text-content-2">
          Ranked from real progress on Launchpad roadmaps. Only learners with a public profile appear, and only once
          they have completed a topic.
        </p>
      </div>
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Boards searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Boards({ searchParams }: Pick<PageProps<"/leaderboards">, "searchParams">) {
  const user = await requireUser();
  const [params, me] = await Promise.all([searchParams, getMyProfile()]);
  const { board, region } = parseBoardParams(params, me.region);

  const supabase = await createClient();
  const { data: mine } = await supabase.from("profiles").select("is_public").eq("id", user.id).single();

  return (
    // Phones stack the board picker above the list. From lg the list takes the main column and the
    // picker, privacy note and region filter move to a side panel on the right.
    <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start lg:gap-8">
      <div className="flex flex-col gap-5 lg:sticky lg:top-8 lg:col-start-2 lg:row-start-1">
        <nav
          aria-label="Leaderboards"
          className="flex gap-1 overflow-x-auto rounded-lg border border-line p-1 lg:flex-col lg:overflow-visible"
        >
          {BOARDS.map((b) => (
            <Link
              key={b.slug}
              href={b.slug === "region" && region ? `/leaderboards?board=region&region=${region}` : `/leaderboards?board=${b.slug}`}
              aria-current={b.slug === board ? "page" : undefined}
              className={`inline-flex min-h-11 flex-1 items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-semibold transition-colors lg:flex-none lg:justify-start ${
                b.slug === board ? "bg-surface-sunken text-content" : "text-content-2 hover:bg-surface-sunken hover:text-content"
              }`}
            >
              {b.label}
            </Link>
          ))}
        </nav>

        {!mine?.is_public && (
          <p className="rounded-lg border border-line bg-surface-sunken p-4 text-sm text-content-2">
            Your profile is private, so you are not on the boards.{" "}
            <Link href="/profile" className="font-semibold text-content-link underline">
              Make it public on your profile page
            </Link>{" "}
            to join in.
          </p>
        )}

        {board === "region" && (
          <form method="get" action="/leaderboards" className="flex items-end gap-2">
            <input type="hidden" name="board" value="region" />
            <div className="flex-1">
              <SelectField id="region" label="Region" defaultValue={region ?? ""}>
                <option value="" disabled>
                  Choose a region
                </option>
                {REGIONS.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.label}
                  </option>
                ))}
              </SelectField>
            </div>
            <Button type="submit" variant="secondary">
              Show
            </Button>
          </form>
        )}
      </div>

      <div className="lg:col-start-1 lg:row-start-1">
        {board === "region" && !region ? (
          <p className="text-content-2">Choose a region to see its board.</p>
        ) : (
          <BoardTable board={board} region={region} viewerId={user.id} />
        )}
      </div>
    </div>
  );
}

async function BoardTable({ board, region, viewerId }: { board: Board; region: string | null; viewerId: string }) {
  const supabase = await createPublicClient();
  const scoreColumn = board === "streak" ? "current_streak" : "nodes_completed";
  let query = supabase
    .from("public_profile_stats")
    .select("id, public_slug, display_name, region, nodes_completed, current_streak")
    .gt(scoreColumn, 0)
    .order(scoreColumn, { ascending: false })
    .order("display_name", { ascending: true })
    .limit(LIMIT);
  if (board === "region" && region) query = query.eq("region", region);
  const { data, error } = await query;
  if (error) throw new Error(`Could not load the leaderboard: ${error.message}`);

  const rows = rank(data ?? [], (r) => (board === "streak" ? r.current_streak : r.nodes_completed) ?? 0);
  const unit = board === "streak" ? "day streak" : "topics";

  if (rows.length === 0) {
    return (
      <p className="rounded-lg border border-line p-5 text-content-2">
        {board === "region"
          ? `No public learners from ${regionLabel(region)} have completed a topic yet. Be the first.`
          : board === "streak"
            ? "Nobody has a live streak right now. Complete a topic today to start one."
            : "Nobody is on the board yet. Complete a topic and make your profile public to be the first."}
      </p>
    );
  }

  return (
    <ol className="flex flex-col divide-y divide-line rounded-lg border border-line">
      {rows.map((r) => {
        const name = r.display_name ?? "Launchpad learner";
        const isMe = r.id === viewerId;
        return (
          <li key={r.id} className={isMe ? "bg-surface-sunken" : undefined}>
            <Link href={`/u/${r.public_slug}`} className="flex min-h-14 items-center gap-3 px-4 py-2 transition-colors hover:bg-surface-sunken">
              <span className="w-8 shrink-0 text-right font-semibold text-content-2">{r.rank}</span>
              <Initials name={name} />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-semibold text-content">
                  {name}
                  {isMe && <span className="font-normal text-content-3"> (you)</span>}
                </span>
                {r.region && <span className="text-sm text-content-3">{regionLabel(r.region)}</span>}
              </span>
              <span className="shrink-0 text-right text-content">
                <span className="font-semibold">{board === "streak" ? r.current_streak : r.nodes_completed}</span>{" "}
                <span className="text-sm text-content-3">{unit}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
