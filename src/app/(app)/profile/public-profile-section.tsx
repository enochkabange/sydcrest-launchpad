import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { siteOrigin } from "@/lib/site-url";
import { inviteLink } from "@/lib/social/public-profile";
import { PublicProfileForm } from "./public-profile-form";
import { CopyLink } from "./copy-link";

/**
 * Public profile settings and the invite link. Kept apart from the main
 * profile form so other settings can be added to the page independently.
 * Reads the session, so it renders inside a <Suspense> boundary.
 */
export async function PublicProfileSection() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("public_slug, is_public, headline, skills, goals")
    .eq("id", user.id)
    .single();
  if (error) throw new Error(`Could not load public profile settings: ${error.message}`);
  const origin = await siteOrigin();

  return (
    <>
      <section aria-labelledby="public-profile-heading" className="flex flex-col gap-4 border-t border-line pt-6">
        <div className="flex flex-col gap-1">
          <h2 id="public-profile-heading" className="text-subtitle text-content">
            Public profile
          </h2>
          <p className="text-sm text-content-2">
            Private until you choose otherwise. A public profile shows your name, headline, region, skills, goals,
            progress and achievements. Your phone number and email are never shown.
          </p>
        </div>
        <PublicProfileForm initial={data} origin={origin} />
      </section>
      <section aria-labelledby="invite-heading" className="flex flex-col gap-3 border-t border-line pt-6">
        <h2 id="invite-heading" className="text-subtitle text-content">
          Invite a friend
        </h2>
        <p className="text-sm text-content-2">
          Share this link with someone who wants to learn tech skills too. Launchpad is free.
        </p>
        <CopyLink url={inviteLink(origin, data.public_slug)} label="Invite link" trackInvite />
      </section>
    </>
  );
}
