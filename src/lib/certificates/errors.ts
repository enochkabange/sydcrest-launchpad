/** Friendly copy for the error codes issue_certificate and revoke_certificate raise. No dashes. */

export function issueErrorMessage(code?: string, message?: string) {
  switch (code) {
    case "42501":
      return "Only this cohort's mentor, a coordinator or an admin can issue this certificate.";
    case "23505":
      return "This learner already holds this certificate.";
    case "P0002":
      return "That learner could not be found.";
    case "22023":
      if (message?.includes("display name")) return "The learner needs to add their name to their profile first.";
      if (message?.includes("deferred")) return "This learner was deferred. Issue from their current cohort.";
      return "The certification criteria are not met yet.";
    default:
      return "Could not issue the certificate. Try again.";
  }
}

export function revokeErrorMessage(code?: string) {
  switch (code) {
    case "42501":
      return "Only admins revoke certificates.";
    case "22023":
      return "Give a reason for revoking.";
    case "P0002":
      return "This certificate is already revoked or does not exist.";
    default:
      return "Could not revoke the certificate. Try again.";
  }
}
