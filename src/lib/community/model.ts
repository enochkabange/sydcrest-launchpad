/**
 * Pure helpers for the community feed (#162): scope parsing, row shaping,
 * cursor pagination, input checks and error copy. No server imports, so the
 * client feed list can use them too.
 */

export const SCOPES = ["everyone", "chapter", "cohort"] as const;
export type Scope = (typeof SCOPES)[number];

/** Which feed: everyone, or one chapter or cohort by id. */
export type FeedRef = { scope: "everyone"; scopeId: null } | { scope: "chapter" | "cohort"; scopeId: string };

export const EVERYONE: FeedRef = { scope: "everyone", scopeId: null };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID.test(value);
}

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

/** Reads `?scope=chapter&id=<uuid>`. Anything unknown or malformed falls back to everyone. */
export function parseFeedRef(scope: string | string[] | undefined, id: string | string[] | undefined): FeedRef {
  const s = first(scope);
  const i = first(id);
  if ((s === "chapter" || s === "cohort") && isUuid(i)) return { scope: s, scopeId: i.toLowerCase() };
  return EVERYONE;
}

export function feedHref(ref: FeedRef) {
  return ref.scope === "everyone" ? "/community" : `/community?scope=${ref.scope}&id=${ref.scopeId}`;
}

export function sameFeed(a: FeedRef, b: FeedRef) {
  return a.scope === b.scope && a.scopeId === b.scopeId;
}

export const REACTIONS = [
  { kind: "like", label: "Like" },
  { kind: "celebrate", label: "Celebrate" },
  { kind: "helpful", label: "Helpful" },
  { kind: "support", label: "Support" },
] as const;
export type ReactionKind = (typeof REACTIONS)[number]["kind"];
export type ReactionCounts = Record<ReactionKind, number>;

export function isReactionKind(value: unknown): value is ReactionKind {
  return REACTIONS.some((r) => r.kind === value);
}

/** The `reaction_counts` jsonb from the feed and thread functions, with every kind present. */
export function parseReactionCounts(json: unknown): ReactionCounts {
  const out: ReactionCounts = { like: 0, celebrate: 0, helpful: 0, support: 0 };
  if (json && typeof json === "object" && !Array.isArray(json)) {
    for (const [kind, n] of Object.entries(json as Record<string, unknown>)) {
      if (isReactionKind(kind) && typeof n === "number" && Number.isFinite(n) && n > 0) out[kind] = Math.floor(n);
    }
  }
  return out;
}

export type Author = {
  id: string;
  name: string;
  /** Public profile slug, only when the profile is public. */
  slug: string | null;
  isLead: boolean;
};

export type PostView = {
  id: string;
  scope: Scope;
  chapterId: string | null;
  cohortId: string | null;
  author: Author;
  body: string;
  linkUrl: string | null;
  pinned: boolean;
  hidden: boolean;
  edited: boolean;
  createdAt: string;
  replyCount: number;
  reactions: ReactionCounts;
  mine: ReactionKind[];
};

export type ReplyView = {
  id: string;
  postId: string;
  author: Author;
  body: string;
  hidden: boolean;
  edited: boolean;
  createdAt: string;
  reactions: ReactionCounts;
  mine: ReactionKind[];
};

type FeedRow = {
  id: string;
  scope: string;
  chapter_id: string | null;
  cohort_id: string | null;
  author_id: string;
  author_name: string | null;
  author_public_slug: string | null;
  author_is_lead: boolean | null;
  body: string;
  link_url: string | null;
  pinned_at: string | null;
  hidden_at: string | null;
  edited_at: string | null;
  created_at: string;
  reply_count: number | null;
  reaction_counts: unknown;
  my_reactions: string[] | null;
};

type ThreadRow = {
  id: string;
  post_id: string;
  author_id: string;
  author_name: string | null;
  author_public_slug: string | null;
  body: string;
  hidden_at: string | null;
  edited_at: string | null;
  created_at: string;
  reaction_counts: unknown;
  my_reactions: string[] | null;
};

const asScope = (s: string): Scope => (SCOPES as readonly string[]).includes(s) ? (s as Scope) : "everyone";
const mine = (kinds: string[] | null) => (kinds ?? []).filter(isReactionKind);

export function toPostView(row: FeedRow): PostView {
  return {
    id: row.id,
    scope: asScope(row.scope),
    chapterId: row.chapter_id,
    cohortId: row.cohort_id,
    author: {
      id: row.author_id,
      name: row.author_name?.trim() || "A member",
      slug: row.author_public_slug,
      isLead: Boolean(row.author_is_lead),
    },
    body: row.body,
    linkUrl: row.link_url,
    pinned: row.pinned_at !== null,
    hidden: row.hidden_at !== null,
    edited: row.edited_at !== null,
    createdAt: row.created_at,
    replyCount: row.reply_count ?? 0,
    reactions: parseReactionCounts(row.reaction_counts),
    mine: mine(row.my_reactions),
  };
}

export function toReplyView(row: ThreadRow): ReplyView {
  return {
    id: row.id,
    postId: row.post_id,
    author: { id: row.author_id, name: row.author_name?.trim() || "A member", slug: row.author_public_slug, isLead: false },
    body: row.body,
    hidden: row.hidden_at !== null,
    edited: row.edited_at !== null,
    createdAt: row.created_at,
    reactions: parseReactionCounts(row.reaction_counts),
    mine: mine(row.my_reactions),
  };
}

export const PAGE_SIZE = 20;

export type FeedPage = { posts: PostView[]; cursor: string | null };

/**
 * The cursor for the next page: the created_at of the last row. The first
 * page lists pinned posts first, so its last row is the oldest unpinned one;
 * later pages are plain newest first. A short page means the end. The
 * timestamp is passed through as the database wrote it (microseconds intact).
 */
export function nextCursor(posts: { createdAt: string }[], limit = PAGE_SIZE): string | null {
  if (posts.length < limit) return null;
  return posts[posts.length - 1].createdAt;
}

/** Appends a page, dropping posts already shown (an old pinned post comes back on a later page). */
export function appendPage<T extends { id: string }>(shown: T[], page: T[]): T[] {
  const seen = new Set(shown.map((p) => p.id));
  return [...shown, ...page.filter((p) => !seen.has(p.id))];
}

/** Applies a reaction toggle to counts and the viewer's own list, for optimistic updates. */
export function toggleReaction(
  state: { reactions: ReactionCounts; mine: ReactionKind[] },
  kind: ReactionKind,
): { reactions: ReactionCounts; mine: ReactionKind[] } {
  const had = state.mine.includes(kind);
  return {
    reactions: { ...state.reactions, [kind]: Math.max(0, state.reactions[kind] + (had ? -1 : 1)) },
    mine: had ? state.mine.filter((k) => k !== kind) : [...state.mine, kind],
  };
}

export const POST_MAX = 4000;
export const REPLY_MAX = 2000;
export const LINK_MAX = 500;
export const HIDE_REASON_MAX = 500;
export const REPORT_DETAILS_MAX = 900;

/** Trimmed body, or the message to show. */
export function checkBody(raw: unknown, max: number): { body: string } | { error: string } {
  const body = typeof raw === "string" ? raw.trim() : "";
  if (!body) return { error: "Write something first." };
  if (body.length > max) return { error: `Keep it under ${max} characters.` };
  return { body };
}

/** An optional http or https link. Empty means none. */
export function checkLink(raw: unknown): { link: string | null } | { error: string } {
  const link = typeof raw === "string" ? raw.trim() : "";
  if (!link) return { link: null };
  if (link.length > LINK_MAX) return { error: "That link is too long." };
  let url: URL;
  try {
    url = new URL(link);
  } catch {
    return { error: "Add a full link that starts with https://" };
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return { error: "Add a full link that starts with https://" };
  return { link };
}

/** Postgres error codes from the schema contract, as words for the person. */
export function communityErrorMessage(code: string | undefined | null): string {
  switch (code) {
    case "54000":
      return "Slow down. You have posted a lot in the last hour, so try again a little later.";
    case "42501":
      return "Only members of this group can do that.";
    case "P0002":
      return "That post is no longer here.";
    case "23505":
      return "You already did that.";
    case "23514":
    case "22001":
      return "That is too long. Shorten it and try again.";
    case "22023":
      return "Something in that was not right. Check it and try again.";
    default:
      return "That did not work. Try again.";
  }
}

/** "5 minutes ago" style time for a post, falling back to a date after a week. */
export function timeAgo(iso: string, now: number = Date.now()): string {
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "";
  const s = Math.max(0, Math.round((now - then) / 1000));
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} ${m === 1 ? "minute" : "minutes"} ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} ${h === 1 ? "hour" : "hours"} ago`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d} ${d === 1 ? "day" : "days"} ago`;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Accra" }).format(
    new Date(then),
  );
}
