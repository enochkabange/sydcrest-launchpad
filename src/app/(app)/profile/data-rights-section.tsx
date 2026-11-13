import Link from "@/components/ui/link";
import { Alert } from "@/components/ui/alert";
import { Button, buttonClasses } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";
import { formatDeletionDate } from "@/lib/data-rights/dates";
import { createClient } from "@/lib/supabase/server";
import { cancelAccountDeletion } from "./data-rights-actions";

/**
 * Your data (issue #333): download a copy, or delete the account with a
 * seven day grace period. Reads the session, so render inside <Suspense>.
 */
export async function DataRightsSection() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data } = await supabase
    .from("deletion_requests")
    .select("delete_after")
    .eq("profile_id", user.id)
    .eq("status", "pending")
    .maybeSingle();

  return (
    <section id="your-data" aria-labelledby="your-data-heading" className="flex scroll-mt-8 flex-col gap-3 border-t border-line pt-6">
      <h2 id="your-data-heading" className="text-subtitle text-content">
        Your data
      </h2>
      <p className="text-content-2">
        Download a copy of everything we hold about you, as a file you can keep. Read more in our{" "}
        <Link href="/privacy#your-rights">privacy policy</Link>.
      </p>
      <div className="flex flex-wrap gap-2">
        {/* A plain link: the file downloads, the page stays. */}
        <a href="/profile/data" download className={buttonClasses("secondary")}>
          Download my data
        </a>
        {!data && (
          <Link href="/profile/delete" className={buttonClasses("ghost")}>
            Delete my account
          </Link>
        )}
      </div>
      {data && (
        <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-4">
          <p className="text-content">
            Your account will be deleted on <strong>{formatDeletionDate(data.delete_after)}</strong>. Until then you can
            use it as normal and change your mind.
          </p>
          <form action={cancelAccountDeletion}>
            <Button type="submit">Keep my account</Button>
          </form>
        </div>
      )}
    </section>
  );
}

/** One line after a delete or keep action, from ?deletion= on /profile. */
export function DeletionNotice({ status }: { status: string | undefined }) {
  if (status === "requested") return <Alert tone="info">We will delete your account in 7 days. You can cancel any time before then.</Alert>;
  if (status === "cancelled") return <Alert tone="success">Your account is staying. Nothing will be deleted.</Alert>;
  if (status === "cancel-failed") return <Alert tone="danger">We could not cancel just now. Please try again.</Alert>;
  return null;
}
