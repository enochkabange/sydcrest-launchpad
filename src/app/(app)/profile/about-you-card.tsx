import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";
import { PROFILE_FIELDS, answeredCount, fromRow } from "@/lib/learner-profile";
import { createClient } from "@/lib/supabase/server";

/** How much of "About you" (learner profile v2) is answered, with a link to it. */
export async function AboutYouCard({ hideWhenComplete = false }: { hideWhenComplete?: boolean }) {
  const user = await requireUser();
  const supabase = await createClient();
  const { data } = await supabase.from("learner_profiles").select("*").eq("profile_id", user.id).maybeSingle();
  const answered = answeredCount(fromRow(data));
  const total = PROFILE_FIELDS.length;
  if (hideWhenComplete && answered >= total / 2) return null;
  return (
    <div className="flex flex-col items-start gap-3 rounded-lg border border-line p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-h3 text-content">About you</h2>
        <p className="max-w-reading text-sm text-content-2">
          {answered === 0
            ? "Tell us your goal, the time you have and the work you want, so we can tailor your plan and the opportunities we suggest. Every question is optional."
            : `You have answered ${answered} of ${total} questions. Add more to sharpen your plan and suggestions.`}
        </p>
      </div>
      <Link href="/profile/about" className={buttonClasses("secondary")}>
        {answered === 0 ? "Tell us about you" : "Update your answers"}
      </Link>
    </div>
  );
}
