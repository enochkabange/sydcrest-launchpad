import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { capStatus, LIMIT_MESSAGE } from "@/lib/study-buddy/cap";
import { buildRequestParams, createStudyBuddyClient, streamReply } from "@/lib/study-buddy/chat";
import { getMessagesUsedToday, loadNodeContext, recordUsage } from "@/lib/study-buddy/data";
import { buildSystemPrompt } from "@/lib/study-buddy/prompt";
import { parseStudyBuddyRequest } from "@/lib/study-buddy/request";
import { routeMessage } from "@/lib/study-buddy/router";

/**
 * POST {nodeId, messages} and get the tutor's reply streamed back as plain
 * text. Signed in learners only, within DAILY_MESSAGE_LIMIT a day.
 *
 * Headers on success: X-Study-Buddy-Remaining (after this message),
 * X-Study-Buddy-Limit, X-Study-Buddy-Model.
 * Errors are JSON {error, message, remaining?}: 401 signed out, 403 setup not
 * finished, 400 bad body, 404 unknown topic, 429 daily limit, 503 unkeyed.
 */

function fail(status: number, error: string, message: string, extra: Record<string, unknown> = {}) {
  return Response.json({ error, message, ...extra }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return fail(401, "signed_out", "Sign in to chat with Study Buddy.");
  if (!user.hasAgeAndConsent) return fail(403, "setup_incomplete", "Finish setting up your account first.");

  const client = createStudyBuddyClient();
  if (!client) return fail(503, "unavailable", "Study Buddy is resting right now. Please try again later.");

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail(400, "bad_request", "Send a JSON body.");
  }
  const parsed = parseStudyBuddyRequest(body);
  if (!parsed.ok) return fail(400, "bad_request", parsed.error);
  const { nodeId, messages, latestUserMessage } = parsed.data;

  const supabase = await createClient();
  const cap = capStatus(await getMessagesUsedToday(supabase, user.id));
  if (!cap.allowed) return fail(429, "limit_reached", LIMIT_MESSAGE, { remaining: 0, limit: cap.limit });

  const node = await loadNodeContext(supabase, nodeId);
  if (!node) return fail(404, "not_found", "We could not find that topic.");

  const route = routeMessage(latestUserMessage);
  const params = buildRequestParams(route, buildSystemPrompt(node), messages);
  const reply = streamReply(client, params, (usage) => recordUsage(supabase, usage));

  return new Response(reply, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Study-Buddy-Remaining": String(cap.remaining - 1),
      "X-Study-Buddy-Limit": String(cap.limit),
      "X-Study-Buddy-Model": route.model,
    },
  });
}
