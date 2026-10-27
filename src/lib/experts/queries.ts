import "server-only";
import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import { toDirectoryExpert, type DirectoryExpert } from "./directory";

/**
 * Public reads for /experts. Every read uses the cookie free anon client, so
 * a page shows a signed in viewer exactly what a stranger sees: approved
 * experts (`public_experts`), active offers of approved experts (RLS on
 * `offers`) and visible reviews (`public_expert_reviews`). Trust signals come
 * from the view, which counts real rows only.
 *
 * Request time reads (not `use cache`): approvals, bookings and reviews are
 * written by other features with no revalidation hook, and trust signals must
 * not lag behind them. Pages call these inside <Suspense>.
 */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SLUG = /^[a-z0-9][a-z0-9-]{1,38}[a-z0-9]$/;

const OFFER_COLUMNS =
  "id, expert_id, kind, title, description, scope, duration_minutes, delivery_days, max_participants, cadence, revisions_included, skills, position, updated_at";

export type PublicOffer = {
  id: string;
  expert_id: string;
  kind: string;
  title: string;
  description: string;
  scope: string | null;
  duration_minutes: number | null;
  delivery_days: number | null;
  max_participants: number | null;
  cadence: string | null;
  revisions_included: number | null;
  skills: string[];
  position: number;
  updated_at: string;
};

export type PublicReview = {
  id: string;
  rating: number;
  body: string | null;
  offerKind: string | null;
  reviewerName: string | null;
  createdAt: string;
};

function fail(what: string, error: { message: string }): never {
  throw new Error(`Could not load ${what}: ${error.message}`);
}

/** Every approved expert with the kinds and titles of their active offers. */
export const getDirectory = cache(async (): Promise<DirectoryExpert[]> => {
  const supabase = await createPublicClient();
  const [experts, offers] = await Promise.all([
    supabase.from("public_experts").select("*"),
    supabase.from("offers").select("expert_id, kind, title").eq("is_active", true),
  ]);
  if (experts.error) fail("experts", experts.error);
  if (offers.error) fail("offers", offers.error);
  return (experts.data ?? []).flatMap((row) => toDirectoryExpert(row, offers.data ?? []) ?? []);
});

/** One approved expert by slug, or null. */
export const getExpert = cache(async (slug: string): Promise<DirectoryExpert | null> => {
  const clean = slug.toLowerCase();
  if (!SLUG.test(clean)) return null;
  const supabase = await createPublicClient();
  const { data, error } = await supabase.from("public_experts").select("*").eq("slug", clean).maybeSingle();
  if (error) fail("expert", error);
  if (!data?.profile_id) return null;
  const offers = await getOffers(data.profile_id);
  return toDirectoryExpert(data, offers);
});

/** An expert's active offers in their chosen order. */
export const getOffers = cache(async (expertId: string): Promise<PublicOffer[]> => {
  const supabase = await createPublicClient();
  const { data, error } = await supabase
    .from("offers")
    .select(OFFER_COLUMNS)
    .eq("expert_id", expertId)
    .eq("is_active", true)
    .order("position")
    .order("created_at");
  if (error) fail("offers", error);
  return data ?? [];
});

/** One active offer, only if it belongs to the expert at this slug. */
export const getOffer = cache(async (slug: string, offerId: string) => {
  if (!UUID.test(offerId)) return null;
  const expert = await getExpert(slug);
  if (!expert) return null;
  const offers = await getOffers(expert.profileId);
  const offer = offers.find((o) => o.id === offerId.toLowerCase());
  return offer ? { expert, offer, others: offers.filter((o) => o.id !== offer.id) } : null;
});

/** Visible reviews of an expert, newest first. */
export const getReviews = cache(async (expertId: string, limit = 20): Promise<PublicReview[]> => {
  const supabase = await createPublicClient();
  const { data, error } = await supabase
    .from("public_expert_reviews")
    .select("id, rating, body, offer_kind, reviewer_name, created_at")
    .eq("expert_id", expertId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) fail("reviews", error);
  return (data ?? []).flatMap((r) =>
    r.id && r.rating && r.created_at
      ? [
          {
            id: r.id,
            rating: r.rating,
            body: r.body,
            offerKind: r.offer_kind,
            reviewerName: r.reviewer_name,
            createdAt: r.created_at,
          },
        ]
      : [],
  );
});
