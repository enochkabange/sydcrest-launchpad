"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { REPORT_REASONS } from "@/lib/social/public-profile";
import { isRateLimited, RATE_LIMIT_MESSAGE } from "@/lib/rate-limit";

export async function follow(profileId: string, slug: string) {
  const user = await requireUser();
  if (user.id === profileId) return;
  const supabase = await createClient();
  // No .select(): the row is not needed back. A repeat follow is a no op.
  const { error } = await supabase.from("follows").insert({ follower_id: user.id, following_id: profileId });
  if (error && error.code !== "23505") throw new Error("Could not follow");
  revalidatePath(`/u/${slug}`);
}

export async function unfollow(profileId: string, slug: string) {
  const user = await requireUser();
  const supabase = await createClient();
  const { error } = await supabase.from("follows").delete().eq("follower_id", user.id).eq("following_id", profileId);
  if (error) throw new Error("Could not unfollow");
  revalidatePath(`/u/${slug}`);
}

export type ReportState = { done?: boolean; error?: string };

export async function reportProfile(profileId: string, _prev: ReportState, form: FormData): Promise<ReportState> {
  const user = await requireUser();
  if (user.id === profileId) return { error: "You can't report your own profile." };
  const reason = String(form.get("reason") ?? "");
  const details = String(form.get("details") ?? "").trim();
  if (!REPORT_REASONS.includes(reason as (typeof REPORT_REASONS)[number])) return { error: "Choose a reason." };
  if (details.length > 900) return { error: "Keep the details under 900 characters." };

  const supabase = await createClient();
  // Insert only: reporters cannot read reports back, so no .select().
  const { error } = await supabase.from("reports").insert({
    reporter_id: user.id,
    target_type: "profile",
    target_id: profileId,
    reason: details ? `${reason}: ${details}` : reason,
  });
  if (error) return { error: isRateLimited(error) ? RATE_LIMIT_MESSAGE : "We couldn't send your report. Try again." };
  return { done: true };
}
