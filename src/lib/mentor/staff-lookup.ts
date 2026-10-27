import "server-only";
import { createAdminClient } from "@/lib/messaging/admin";

/**
 * Finds a person's profile id by their sign in email, for an admin adding a
 * mentor or coordinator. Profiles carry no email and are readable only by
 * their owner, so this needs the service role key; callers must have checked
 * requireAdmin first. Returns "unavailable" when the key is not set.
 */
export async function findUserIdByEmail(email: string): Promise<string | null | "unavailable"> {
  const admin = createAdminClient();
  if (!admin) return "unavailable";
  const wanted = email.trim().toLowerCase();
  const perPage = 1000;
  // The Auth admin API has no exact email filter; page through (pilot scale).
  for (let page = 1; page <= 50; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) throw new Error(`Could not look up users: ${error.message}`);
    const hit = data.users.find((u) => u.email?.toLowerCase() === wanted);
    if (hit) return hit.id;
    if (data.users.length < perPage) return null;
  }
  return null;
}
