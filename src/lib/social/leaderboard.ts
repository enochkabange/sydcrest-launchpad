import { isRegionSlug, type RegionSlug } from "@/lib/regions";

export const BOARDS = [
  { slug: "nodes", label: "Topics completed" },
  { slug: "streak", label: "Streaks" },
  { slug: "region", label: "By region" },
] as const;

export type Board = (typeof BOARDS)[number]["slug"];

/** Reads ?board= and ?region= safely, falling back to the viewer's own region. */
export function parseBoardParams(
  params: Record<string, string | string[] | undefined>,
  viewerRegion: string | null,
): { board: Board; region: RegionSlug | null } {
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const rawBoard = first(params.board);
  const board: Board = BOARDS.some((b) => b.slug === rawBoard) ? (rawBoard as Board) : "nodes";
  const rawRegion = first(params.region);
  const region = isRegionSlug(rawRegion) ? rawRegion : viewerRegion && isRegionSlug(viewerRegion) ? viewerRegion : null;
  return { board, region };
}

/** Standard competition ranking: equal scores share a rank (1, 2, 2, 4). */
export function rank<T>(rows: T[], score: (row: T) => number): (T & { rank: number })[] {
  let lastScore: number | null = null;
  let lastRank = 0;
  return rows.map((row, i) => {
    const s = score(row);
    if (s !== lastScore) {
      lastRank = i + 1;
      lastScore = s;
    }
    return { ...row, rank: lastRank };
  });
}
