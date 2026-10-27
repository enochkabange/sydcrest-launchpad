import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/field";
import { Initials } from "@/components/social/profile-bits";
import { DataTable, MainWithRail, rowLinkClass } from "@/components/ui/layout";
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
        <h1 className="text-title text-content">Leaderboards</h1>
        <p className="max-w-reading text-content-2">
          Ranked from topics passed with a checkpoint quiz on Launchpad roadmaps. Topics marked done without a quiz are
          personal tracking and are not counted. Only learners with a public profile appear, and only once they have
          passed a topic.
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

  const picker = (
    <>
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
    </>
  );

  // Phones stack the board picker above the list. From lg the table takes the main column and the
  // picker, privacy note and region filter sit in a sticky rail on the right.
  return (
    <MainWithRail railFirst sticky railLabel="Choose a board" className="gap-5" spaced={false} rail={<div className="flex flex-col gap-5">{picker}</div>}>
      {board === "region" && !region ? (
        <p className="rounded-lg border border-line p-5 text-content-2">Choose a region to see its board.</p>
      ) : (
        <BoardTable board={board} region={region} viewerId={user.id} />
      )}
    </MainWithRail>
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
          ? `No public learners from ${regionLabel(region)} have passed a topic yet. Be the first.`
          : board === "streak"
            ? "Nobody has a live streak right now. Pass a checkpoint quiz today to start one."
            : "Nobody is on the board yet. Pass a checkpoint quiz and make your profile public to be the first."}
      </p>
    );
  }

  type Row = (typeof rows)[number];
  const score = (r: Row) => (board === "streak" ? r.current_streak : r.nodes_completed);
  return (
    <DataTable<Row>
      caption={`${BOARDS.find((b) => b.slug === board)?.label} leaderboard${board === "region" ? `, ${regionLabel(region)}` : ""}`}
      rows={rows}
      rowKey={(r) => r.id ?? r.public_slug ?? String(r.rank)}
      rowClassName={(r) => (r.id === viewerId ? "bg-surface-sunken" : undefined)}
      columns={[
        {
          header: "Rank",
          align: "end",
          className: "w-8 shrink-0 font-semibold text-content-2 md:w-16",
          cell: (r) => r.rank,
        },
        {
          header: "Learner",
          className: "min-w-0 flex-1",
          cell: (r) => {
            const name = r.display_name ?? "Launchpad learner";
            return (
              <span className="flex min-w-0 items-center gap-3">
                <Initials name={name} />
                <span className="flex min-w-0 flex-col">
                  <Link href={`/u/${r.public_slug}`} className={`truncate font-semibold text-content no-underline ${rowLinkClass}`}>
                    {name}
                    {r.id === viewerId && <span className="font-normal text-content-3"> (you)</span>}
                  </Link>
                  {r.region && <span className="text-sm text-content-3 md:hidden">{regionLabel(r.region)}</span>}
                </span>
              </span>
            );
          },
        },
        { header: "Region", phone: "hide", className: "text-content-2", cell: (r) => regionLabel(r.region) ?? "" },
        {
          header: "Topics passed",
          phone: "hide",
          align: "end",
          className: `tabular-nums ${board === "streak" ? "text-content-2" : "font-semibold text-content"}`,
          cell: (r) => r.nodes_completed ?? 0,
        },
        {
          header: "Day streak",
          phone: "hide",
          align: "end",
          className: `tabular-nums ${board === "streak" ? "font-semibold text-content" : "text-content-2"}`,
          cell: (r) => r.current_streak ?? 0,
        },
        {
          header: "Score",
          phone: "only",
          align: "end",
          className: "shrink-0 text-content",
          cell: (r) => (
            <>
              <span className="font-semibold">{score(r)}</span> <span className="text-sm text-content-3">{unit}</span>
            </>
          ),
        },
      ]}
    />
  );
}
