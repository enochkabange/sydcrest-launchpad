import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { APPLY_PATH, DMP_SLUG, isOpen, statusCopy } from "@/lib/programme-apply/screening";

const NEXT = `?next=${encodeURIComponent(APPLY_PATH)}`;

/** What signed out visitors see, and the prerendered fallback for everyone. */
export function ApplySignedOut() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 xl:p-8">
      <p className="text-body text-content-2">
        Create a free account, then answer a few short questions about you and your goals. You can see your
        application and its status at any time.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href={`/signup${NEXT}`} className={buttonClasses("primary")}>
          Create an account and apply
        </Link>
        <Link href={`/login${NEXT}`} className={buttonClasses("secondary")}>
          Sign in to apply
        </Link>
      </div>
    </div>
  );
}

/**
 * Request time island on the prerendered /programme page: a signed in
 * learner sees their application's status (or a straight Apply button).
 * Must sit inside <Suspense> with ApplySignedOut as the fallback.
 */
export async function ApplyCta() {
  const user = await getCurrentUser();
  if (!user) return <ApplySignedOut />;

  const supabase = await createClient();
  const { data: programme } = await supabase.from("programs").select("id").eq("slug", DMP_SLUG).maybeSingle();
  const { data: application } = programme
    ? await supabase
        .from("cohort_applications")
        .select("status")
        .eq("program_id", programme.id)
        .eq("profile_id", user.id)
        .in("status", ["submitted", "waitlisted", "accepted"])
        .maybeSingle()
    : { data: null };

  if (!application) {
    return (
      <div className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 xl:p-8">
        <p className="text-body text-content-2">
          You are signed in. Answer three short questions about you and your goals, and the team will review your
          application.
        </p>
        <Link href={APPLY_PATH} className={buttonClasses("primary", "self-start")}>
          Apply now
        </Link>
      </div>
    );
  }

  const { label, detail } = statusCopy(application.status);
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 xl:p-8">
      <p className="text-h3 text-content">Your application: {label}</p>
      <p className="text-body text-content-2">{detail}</p>
      <div className="flex flex-wrap gap-3">
        {application.status === "accepted" && (
          <Link href="/cohort" className={buttonClasses("primary")}>
            Go to your cohort
          </Link>
        )}
        <Link href={APPLY_PATH} className={buttonClasses(isOpen(application.status) ? "primary" : "secondary")}>
          See your application
        </Link>
      </div>
    </div>
  );
}
