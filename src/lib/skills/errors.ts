/**
 * Turns errors from the skill functions (submit_skill_quiz,
 * submit_skill_portfolio, review_skill_portfolio, claim_path_skills,
 * revoke_verified_skill) into copy for the screen. Error codes follow the
 * schema contract: 42501 not allowed, 22023 bad input or wrong state, P0002
 * not found. Only messages we know are passed through; anything else gets a
 * general line, so database internals never reach the page.
 */

const KNOWN: Record<string, string> = {
  "Try again later": "The wait after your last attempt is not over yet. Try again later.",
  "Your portfolio is waiting for review": "Your portfolio is waiting for review. You can send new work once it is reviewed.",
  "Share a https link to your work": "Use a full link to your work that starts with https://",
  "Say what to improve": "Say what to improve before you send the work back.",
  "Already reviewed": "Someone already reviewed this submission.",
  "You cannot review your own work": "You cannot review your own work.",
  "Mentors and admins only": "Only mentors and admins can review portfolios.",
  "Admins only": "Only admins can do that.",
  "Give a reason": "Give a reason.",
  "Sign in first": "Sign in first.",
  "Verified skill not found": "That verified skill was already revoked or does not exist.",
  "Submission not found": "That submission no longer exists.",
};

export function skillErrorMessage(error: { code?: string | null; message?: string | null } | null | undefined): string {
  const message = error?.message?.trim() ?? "";
  if (KNOWN[message]) return KNOWN[message];
  switch (error?.code) {
    case "P0002":
      return "This assessment is not open right now.";
    case "42501":
      return "You do not have access to do that.";
    case "54000":
      return "Slow down a little and try again.";
    default:
      return "Something went wrong. Try again.";
  }
}
