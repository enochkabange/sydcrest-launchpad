import { buildIssuerProfile } from "@/lib/certificates/open-badges";
import { jsonLd } from "@/lib/certificates/json-response";
import { loadSigningKey, verificationMethods } from "@/lib/certificates/signing";
import { SITE_URL } from "@/lib/site";

/**
 * The Open Badges 3.0 issuer Profile at its stable URL (the credential's
 * issuer.id). Lists the public signing key only when OPEN_BADGES_SIGNING_KEY
 * is configured.
 */
export function GET() {
  const profile = buildIssuerProfile(SITE_URL);
  const methods = verificationMethods(profile.id, loadSigningKey(profile.id));
  return jsonLd(methods.length ? { ...profile, verificationMethod: methods } : profile);
}
