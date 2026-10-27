import { ogImage } from "@/components/marketing/og-card";
import { formatIssued } from "@/lib/certificates/format";
import { certificateOgImage } from "@/lib/certificates/og";
import { verifyCertificate } from "@/lib/certificates/server";

export const alt = "A verified certificate on SydCrest Launchpad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share card for a valid certificate. Revoked or unknown ids get the generic card, never a name. */
export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cert = await verifyCertificate(id);
  if (!cert || cert.revoked_at) return ogImage("Find your path into tech.", "Free roadmaps for Ghana on SydCrest Launchpad.");
  return certificateOgImage({
    recipientName: cert.recipient_name,
    title: cert.specialization_label ? `${cert.program_title}: ${cert.specialization_label}` : cert.program_title,
    issued: formatIssued(cert.issued_at),
  });
}
