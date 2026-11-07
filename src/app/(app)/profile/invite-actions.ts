"use server";

import { track } from "@/lib/analytics/track";
import { getCurrentUser } from "@/lib/auth";

const METHODS = ["copy", "share"] as const;
export type InviteMethod = (typeof METHODS)[number];

/**
 * Records invite_sent after a learner copies or shares their invite link.
 * Only how it was sent is stored: never the link, the slug or anything personal.
 */
export async function recordInviteSent(method: unknown): Promise<void> {
  if (typeof method !== "string" || !(METHODS as readonly string[]).includes(method)) return;
  const user = await getCurrentUser();
  if (!user) return;
  await track("invite_sent", { method: method as InviteMethod });
}
