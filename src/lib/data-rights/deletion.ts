import "server-only";
import type { AdminClient } from "@/lib/messaging/admin";

export type DeletionRunResult =
  | { ok: true; due: number; deleted: number; failed: number }
  | { ok: false; error: string };

type Step = { error: { message: string } | null };

/**
 * Daily step of /api/cron/reengage (issue #333): deletes the accounts whose
 * seven day grace period has passed. For each: remove their uploaded files
 * (submissions and credentials buckets; a failure here does not block the
 * deletion), delete the Auth user (the profile and everything personal
 * cascades; certificates stay verifiable with no holder), then stamp the
 * request completed. A failed deletion keeps the request pending, with the
 * error, for tomorrow. Never throws: it shares the cron with other steps.
 */
export async function runAccountDeletions(admin: AdminClient): Promise<DeletionRunResult> {
  try {
    const { data: due, error } = await admin.rpc("due_deletion_requests", { p_limit: 50 });
    if (error) {
      console.error("[data-rights] could not list due deletions", { code: error.code, message: error.message });
      return { ok: false, error: error.code ?? "failed" };
    }
    let deleted = 0;
    let failed = 0;
    for (const request of due ?? []) {
      await removeFiles(admin, request.profile_id);
      const { error: authError } = await admin.auth.admin.deleteUser(request.profile_id);
      // Already gone (deleted some other way): the request is done all the same.
      const gone = !authError || authError.status === 404;
      const done: Step = await admin.rpc("complete_deletion_request", {
        p_id: request.id,
        p_error: gone ? undefined : (authError?.message ?? "delete failed").slice(0, 200),
      });
      if (done.error) console.error("[data-rights] could not stamp a deletion", { message: done.error.message });
      if (gone) deleted += 1;
      else {
        failed += 1;
        console.error("[data-rights] account deletion failed", { request: request.id, message: authError?.message });
      }
    }
    return { ok: true, due: due?.length ?? 0, deleted, failed };
  } catch (cause) {
    console.error("[data-rights] deletions failed", { message: cause instanceof Error ? cause.message : String(cause) });
    return { ok: false, error: "failed" };
  }
}

async function removeFiles(admin: AdminClient, profileId: string) {
  const [subs, creds] = await Promise.all([
    admin.from("submissions").select("file_path").eq("profile_id", profileId).not("file_path", "is", null),
    admin.from("external_credentials").select("file_path").eq("profile_id", profileId).not("file_path", "is", null),
  ]);
  const buckets: [string, { file_path: string | null }[] | null][] = [
    ["submissions", subs.data],
    ["credentials", creds.data],
  ];
  for (const [bucket, rows] of buckets) {
    const paths = (rows ?? []).map((r) => r.file_path).filter((p): p is string => !!p);
    if (paths.length === 0) continue;
    const { error } = await admin.storage.from(bucket).remove(paths);
    if (error) console.error("[data-rights] could not remove files", { bucket, message: error.message });
  }
}
