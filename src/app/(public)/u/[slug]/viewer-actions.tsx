import Link from "@/components/ui/link";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Button, buttonClasses } from "@/components/ui/button";
import { follow, unfollow } from "./actions";
import { ReportForm } from "./report-form";

/** Follow and report controls; depend on who is looking, so they render inside Suspense. */
export async function ViewerActions({ profileId, slug, name }: { profileId: string; slug: string; name: string }) {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Link href="/login" className={buttonClasses("secondary", "self-start")}>
        Sign in to follow {name.split(" ")[0]}
      </Link>
    );
  }

  if (user.id === profileId) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-content-2">This is your public profile.</p>
        <Link href="/profile" className={buttonClasses("secondary")}>
          Edit profile
        </Link>
      </div>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("follows")
    .select("following_id")
    .eq("follower_id", user.id)
    .eq("following_id", profileId)
    .maybeSingle();
  const following = Boolean(data);

  return (
    <div className="flex flex-col gap-3">
      <form action={(following ? unfollow : follow).bind(null, profileId, slug)}>
        <Button type="submit" variant={following ? "secondary" : "primary"}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      </form>
      <ReportForm profileId={profileId} />
    </div>
  );
}
