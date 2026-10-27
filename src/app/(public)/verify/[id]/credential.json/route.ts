import { jsonLd } from "@/lib/certificates/json-response";
import { credentialFor, verifyCertificate } from "@/lib/certificates/server";

/**
 * The OpenBadgeCredential for one certificate (the credential's own id).
 * A revoked certificate answers 410 with when it was revoked, so a verifier
 * following the id never mistakes it for a live one.
 */
export async function GET(_request: Request, { params }: RouteContext<"/verify/[id]/credential.json">) {
  const { id } = await params;
  const cert = await verifyCertificate(id);
  if (!cert) return jsonLd({ error: "No certificate with this id" }, { status: 404, cache: "no-store" });
  if (cert.revoked_at) {
    return jsonLd(
      { error: "This certificate was revoked", verification_id: cert.verification_id, revoked_at: cert.revoked_at },
      { status: 410, cache: "no-store" },
    );
  }
  // Short CDN life: a revocation must show within minutes.
  return jsonLd(await credentialFor(cert), { cache: "public, max-age=60, s-maxage=300" });
}
