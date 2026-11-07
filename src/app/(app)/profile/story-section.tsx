import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { deleteStory } from "./story-actions";
import { StoryForm } from "./story-form";

/**
 * The learner's own story for sponsors (#307), opt in. Sponsors of a cohort,
 * programme or chapter the learner belongs to can read it; by name only if
 * they tick the box. Reads the session, so render inside <Suspense>.
 */
export async function StorySection() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data } = await supabase.from("learner_stories").select("story, show_name, hidden_at").eq("profile_id", user.id).maybeSingle();
  return (
    <section aria-labelledby="story-heading" id="sponsor-story" className="flex scroll-mt-8 flex-col gap-4 border-t border-line pt-6">
      <div className="flex flex-col gap-1">
        <h2 id="story-heading" className="text-subtitle text-content">
          Your story for sponsors
        </h2>
        <p className="text-content-2">
          Sponsors fund free seats and chapters. They see totals, never names, unless you choose to share your story here.
          Optional; you can change or remove it at any time.
        </p>
      </div>
      {data?.hidden_at && (
        <p className="rounded-md border border-line bg-surface-sunken px-3 py-2.5 text-sm text-content-2">
          The SydCrest team has hidden this story from sponsors. Edit it or ask us why.
        </p>
      )}
      <StoryForm story={data?.story ?? ""} showName={data?.show_name ?? false} />
      {data && (
        <form action={deleteStory}>
          <Button type="submit" variant="ghost" className="px-0">
            Remove my story
          </Button>
        </form>
      )}
    </section>
  );
}
