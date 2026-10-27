import "server-only";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getViewerEvent } from "./viewer";

/**
 * For the signed in event pages (check in, feedback, host tools): a visitor
 * signs in and comes back to the same page; someone who has not finished the
 * age and terms step goes to /welcome; an event they cannot see is a 404.
 * Reads cookies, so callers sit inside <Suspense>.
 */
export async function requireEventPage(slug: string, subpath: "check-in" | "feedback" | "host") {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`/events/${slug}/${subpath}`)}`);
  if (!user.hasAgeAndConsent) redirect("/welcome");
  const event = await getViewerEvent(slug);
  if (!event) notFound();
  return { user, event };
}
