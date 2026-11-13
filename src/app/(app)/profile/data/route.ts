import { connection } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { collectMyData } from "@/lib/data-rights/collect";
import { exportFileName } from "@/lib/data-rights/export";
import { createClient } from "@/lib/supabase/server";

/**
 * "Download my data" (issue #333): the signed in member's own data as a JSON
 * file, read through their own session. Never cached.
 */
export async function GET() {
  await connection();
  const user = await getCurrentUser();
  if (!user) return new Response("Sign in to download your data.", { status: 401 });
  const supabase = await createClient();
  const now = new Date();
  const file = await collectMyData(supabase, { id: user.id, email: user.email }, now);
  return new Response(JSON.stringify(file, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="${exportFileName(now)}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
