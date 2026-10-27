import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Request time reads for /briefs, all as the signed in viewer so RLS decides
 * what they see: `brief_board` shows open briefs to approved experts and a
 * brief's own side (poster and organisation members) at any status.
 * Callers sit inside <Suspense> and have already checked the session.
 */

export type BoardRow = Database["public"]["Views"]["brief_board"]["Row"];

/** A brief_board row with the columns the UI relies on made non null. */
export type Brief = Omit<BoardRow, "id" | "kind" | "status" | "title" | "description" | "skills" | "categories" | "created_at"> & {
  id: string;
  kind: string;
  status: string;
  title: string;
  description: string;
  skills: string[];
  categories: string[];
  created_at: string;
};

function toBrief(row: BoardRow): Brief | null {
  if (!row.id || !row.kind || !row.status || !row.title || !row.created_at) return null;
  return {
    ...row,
    id: row.id,
    kind: row.kind,
    status: row.status,
    title: row.title,
    description: row.description ?? "",
    skills: row.skills ?? [],
    categories: row.categories ?? [],
    created_at: row.created_at,
  };
}

function fail(what: string, error: { message: string }): never {
  throw new Error(`Could not load ${what}: ${error.message}`);
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID.test(value);
}

/** What the viewer can do in the market: pitch (approved expert) and post jobs (verified organisations). */
export const getViewer = cache(async (userId: string) => {
  const supabase = await createClient();
  const [expert, orgs] = await Promise.all([
    supabase.from("expert_profiles").select("status").eq("profile_id", userId).maybeSingle(),
    supabase
      .from("organisation_members")
      .select("role, organisations!inner(id, name, verification_status)")
      .eq("profile_id", userId)
      .eq("status", "active")
      .in("role", ["owner", "admin", "recruiter"]),
  ]);
  if (expert.error) fail("your expert profile", expert.error);
  if (orgs.error) fail("your organisations", orgs.error);
  const memberships = (orgs.data ?? []).map((m) => m.organisations);
  return {
    id: userId,
    isApprovedExpert: expert.data?.status === "approved",
    expertStatus: expert.data?.status ?? null,
    /** Verified organisations the viewer may post a job brief for. */
    postableOrgs: memberships.filter((o) => o.verification_status === "verified").map((o) => ({ id: o.id, name: o.name })),
    /** Organisations still waiting for (or without) verification, to explain why jobs are unavailable. */
    unverifiedOrgs: memberships.filter((o) => o.verification_status !== "verified").map((o) => o.name),
  };
});

export type Viewer = Awaited<ReturnType<typeof getViewer>>;

/** Open briefs the viewer can read, newest first. */
export const getOpenBriefs = cache(async (): Promise<Brief[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("brief_board")
    .select("*")
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) fail("briefs", error);
  return (data ?? []).map(toBrief).filter((b): b is Brief => b !== null);
});

/** Briefs the viewer manages (posted, or posted by their organisation), any status. */
export const getMyBriefs = cache(async (): Promise<Brief[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("brief_board")
    .select("*")
    .eq("can_manage", true)
    .order("created_at", { ascending: false });
  if (error) fail("your briefs", error);
  return (data ?? []).map(toBrief).filter((b): b is Brief => b !== null);
});

export const getBrief = cache(async (id: string): Promise<Brief | null> => {
  if (!isUuid(id)) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.from("brief_board").select("*").eq("id", id).maybeSingle();
  if (error) fail("the brief", error);
  return data ? toBrief(data) : null;
});

export type PitchView = {
  id: string;
  briefId: string;
  expertId: string;
  message: string;
  proposedTimeline: string | null;
  indicativePriceGhs: number | null;
  status: string;
  createdAt: string;
  decidedAt: string | null;
  offer: { id: string; kind: string; title: string; scope: string | null; delivery_days: number | null } | null;
  expert: { name: string; slug: string | null; headline: string | null; avatarUrl: string | null; isVerified: boolean };
  bookingId: string | null;
};

const PITCH_COLUMNS =
  "id, brief_id, expert_id, message, proposed_timeline, indicative_price_ghs, status, created_at, decided_at, offers(id, kind, title, scope, delivery_days)";

type PitchRow = {
  id: string;
  brief_id: string;
  expert_id: string;
  message: string;
  proposed_timeline: string | null;
  indicative_price_ghs: number | null;
  status: string;
  created_at: string;
  decided_at: string | null;
  offers: PitchView["offer"];
};

/** Adds expert names (from the public directory view) and booking ids for accepted pitches. */
async function decorate(rows: PitchRow[]): Promise<PitchView[]> {
  if (rows.length === 0) return [];
  const supabase = await createClient();
  const expertIds = [...new Set(rows.map((r) => r.expert_id))];
  const accepted = rows.filter((r) => r.status === "accepted").map((r) => r.id);
  const [experts, bookings] = await Promise.all([
    supabase.from("public_experts").select("profile_id, display_name, slug, headline, avatar_url, is_verified").in("profile_id", expertIds),
    accepted.length
      ? supabase.from("booking_requests").select("id, pitch_id").in("pitch_id", accepted)
      : Promise.resolve({ data: [] as { id: string; pitch_id: string | null }[], error: null }),
  ]);
  if (experts.error) fail("experts", experts.error);
  if (bookings.error) fail("bookings", bookings.error);
  const byId = new Map((experts.data ?? []).map((e) => [e.profile_id, e]));
  const bookingByPitch = new Map((bookings.data ?? []).map((b) => [b.pitch_id, b.id]));
  return rows.map((r) => {
    const e = byId.get(r.expert_id);
    return {
      id: r.id,
      briefId: r.brief_id,
      expertId: r.expert_id,
      message: r.message,
      proposedTimeline: r.proposed_timeline,
      indicativePriceGhs: r.indicative_price_ghs,
      status: r.status,
      createdAt: r.created_at,
      decidedAt: r.decided_at,
      offer: r.offers,
      expert: {
        name: e?.display_name ?? "An expert",
        slug: e?.slug ?? null,
        headline: e?.headline ?? null,
        avatarUrl: e?.avatar_url ?? null,
        isVerified: e?.is_verified ?? false,
      },
      bookingId: bookingByPitch.get(r.id) ?? null,
    };
  });
}

/** Pitches on a brief the viewer can read: all of them for its managers, only their own for an expert. */
export const getPitchesForBrief = cache(async (briefId: string): Promise<PitchView[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pitches")
    .select(PITCH_COLUMNS)
    .eq("brief_id", briefId)
    .neq("status", "withdrawn")
    .order("created_at", { ascending: true });
  if (error) fail("pitches", error);
  return decorate((data ?? []) as PitchRow[]);
});

export type MyPitch = PitchView & { brief: { title: string; status: string; kind: string } | null };

/** The viewer's own pitches with their brief's title and status. */
export const getMyPitches = cache(async (userId: string): Promise<MyPitch[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pitches")
    .select(`${PITCH_COLUMNS}, briefs(title, status, kind)`)
    .eq("expert_id", userId)
    .order("created_at", { ascending: false });
  if (error) fail("your pitches", error);
  const rows = (data ?? []) as (PitchRow & { briefs: MyPitch["brief"] })[];
  const decorated = await decorate(rows);
  return decorated.map((p, i) => ({ ...p, brief: rows[i].briefs }));
});

/** The viewer's own active offers, to attach one (a gig, say) to a pitch. */
export const getMyActiveOffers = cache(async (userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("offers")
    .select("id, kind, title")
    .eq("expert_id", userId)
    .eq("is_active", true)
    .order("position");
  if (error) fail("your offers", error);
  return data ?? [];
});
