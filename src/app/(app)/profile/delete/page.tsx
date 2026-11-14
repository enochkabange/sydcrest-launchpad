import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "@/components/ui/link";
import { Alert } from "@/components/ui/alert";
import { Button, buttonClasses } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";
import { DELETION_GRACE_DAYS } from "@/lib/data-rights/constants";
import { createClient } from "@/lib/supabase/server";
import { requestAccountDeletion } from "../data-rights-actions";

export const metadata: Metadata = { title: "Delete my account", robots: { index: false } };

const ERRORS: Record<string, string> = {
  "last-admin": "You are the only admin. Make someone else an admin before you delete your account.",
  failed: "We could not start the deletion just now. Please try again.",
};

async function Confirm({ searchParams }: Pick<PageProps<"/profile/delete">, "searchParams">) {
  const user = await requireUser();
  const supabase = await createClient();
  const { data } = await supabase.from("deletion_requests").select("id").eq("profile_id", user.id).eq("status", "pending").maybeSingle();
  // Already asked: the profile page shows the date and the way back.
  if (data) redirect("/profile#your-data");
  const { error } = await searchParams;
  const message = typeof error === "string" ? ERRORS[error] : undefined;
  return (
    <div className="flex flex-col gap-4">
      {message && <Alert tone="danger">{message}</Alert>}
      <form action={requestAccountDeletion} className="flex flex-wrap gap-2">
        <Button type="submit">Delete my account in {DELETION_GRACE_DAYS} days</Button>
        <Link href="/profile" className={buttonClasses("secondary")}>
          Keep my account
        </Link>
      </form>
    </div>
  );
}

/** "Delete my account" (issue #333): what goes, what stays, and the 30 day grace period. */
export default function DeleteAccountPage({ searchParams }: PageProps<"/profile/delete">) {
  return (
    <div className="flex max-w-reading flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Link href="/profile" className="text-sm text-content-2">
          Back to profile
        </Link>
        <h1 className="text-title text-content">Delete my account</h1>
        <p className="text-lead text-content-2">
          We wait {DELETION_GRACE_DAYS} days before deleting anything, in case you change your mind. Until then you can
          sign in and use SydCrest as normal, and cancel from your profile.
        </p>
      </div>

      <section aria-labelledby="goes-heading" className="flex flex-col gap-2">
        <h2 id="goes-heading" className="text-h3 text-content">
          What we delete
        </h2>
        <ul className="list-disc space-y-1 ps-5 text-content-2">
          <li>Your account, sign in details, name, phone number and profile, including your public profile page.</li>
          <li>Your About you answers, progress, quiz results, submissions and the files you uploaded.</li>
          <li>Your programme and opportunity applications, outcomes, credentials, posts, bookings and messages.</li>
          <li>Your consent records and WhatsApp settings.</li>
        </ul>
      </section>

      <section aria-labelledby="stays-heading" className="flex flex-col gap-2">
        <h2 id="stays-heading" className="text-h3 text-content">
          What we keep
        </h2>
        <ul className="list-disc space-y-1 ps-5 text-content-2">
          <li>
            Certificates we issued to you, so anyone you shared one with can still check it is real. They show the name
            and programme on the certificate and are no longer linked to an account.
          </li>
          <li>Daily totals, such as how many people finished a topic, which never identify anyone.</li>
          <li>A record that an account was deleted on that date, without your name or details.</li>
        </ul>
        <p className="text-content-2">
          Want a copy first?{" "}
          <a href="/profile/data" download>
            Download my data
          </a>
          .
        </p>
      </section>

      <Suspense fallback={<div className="h-11 w-64 animate-skeleton rounded-md bg-surface-sunken" />}>
        <Confirm searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
