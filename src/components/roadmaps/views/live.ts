import "server-only";
import { cache } from "react";
import { getMyProgress } from "@/lib/roadmaps/progress";
import { withProgress, type RoadmapView } from "@/lib/roadmaps/view-model";

/**
 * The view with the signed in learner's progress, or the same view for a
 * visitor. Request time (reads cookies): call it only from a component inside
 * <Suspense>, so the page shell stays prerendered and only the islands wait.
 *
 * Memoised per request on the view object, so every island on a page shares
 * one progress query and one `withProgress` pass.
 */
export const liveView = cache(async (view: RoadmapView): Promise<RoadmapView> => {
  const progress = await getMyProgress();
  return progress ? withProgress(view, progress) : view;
});
