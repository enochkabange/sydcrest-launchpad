import { getSharedCredential } from "@/lib/credentials/queries";
import { credentialCard, isCardFormat } from "@/lib/share/card";
import { shareCardImage, withCardCache } from "@/lib/share/image";
import { SITE_URL } from "@/lib/site";

/**
 * Story or square share card for an external credential (issue #253), also
 * the image in the embed snippet. Same gate as the public wallet: the
 * credential is public, not hidden, and the owner's profile is public.
 * Anything else is a 404, never a card. The card says who issued it and how
 * far it was checked; it never calls it a SydCrest certificate.
 */
export async function GET(_request: Request, { params }: RouteContext<"/og/credentials/[id]/[format]">) {
  const { id, format } = await params;
  if (!isCardFormat(format)) return new Response("Not found", { status: 404 });
  const shared = await getSharedCredential(id);
  if (!shared) return new Response("Not found", { status: 404 });
  return withCardCache(shareCardImage(credentialCard(shared.credential, shared.owner.display_name), format, new URL(SITE_URL).host));
}
