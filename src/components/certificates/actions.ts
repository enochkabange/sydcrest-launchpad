"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getMyProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { storeBadge } from "@/lib/certificates/server";
import { issueErrorMessage, revokeErrorMessage } from "@/lib/certificates/errors";

export type CertificateActionState = { ok?: string; error?: string; verificationId?: string } | null;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * The cohort's mentor (or a coordinator, or an admin) issues a certificate.
 * issue_certificate re-checks the criteria and the caller's role in the
 * database; this only re-checks the session. The Open Badges JSON is then
 * stored with the secret key (a no-op without it).
 */
export async function issueCertificate(_prev: CertificateActionState, form: FormData): Promise<CertificateActionState> {
  await getMyProfile();
  const memberId = form.get("cohort_member_id");
  if (typeof memberId !== "string" || !UUID.test(memberId)) return { error: "That learner could not be found." };

  const supabase = await createClient();
  const { data: cert, error } = await supabase.rpc("issue_certificate", { p_cohort_member_id: memberId });
  if (error || !cert) return { error: issueErrorMessage(error?.code, error?.message) };

  await storeBadge(cert.id, cert, cert.program_id);
  revalidatePath("/certificates", "layout");
  return { ok: `Certificate issued to ${cert.recipient_name}.`, verificationId: cert.verification_id };
}

/** Admins revoke with a reason. revoke_certificate checks the role again. */
export async function revokeCertificate(_prev: CertificateActionState, form: FormData): Promise<CertificateActionState> {
  const profile = await getMyProfile();
  if (profile.role !== "admin") return { error: "Only admins revoke certificates." };
  const id = form.get("certificate_id");
  const reason = form.get("reason");
  if (typeof id !== "string" || !UUID.test(id)) return { error: "That certificate could not be found." };
  if (typeof reason !== "string" || !reason.trim()) return { error: "Give a reason for revoking." };
  if (reason.trim().length > 1000) return { error: "Keep the reason under 1000 characters." };

  const supabase = await createClient();
  const { error } = await supabase.rpc("revoke_certificate", { p_certificate_id: id, p_reason: reason.trim() });
  if (error) return { error: revokeErrorMessage(error.code) };
  revalidatePath("/admin/certificates");
  revalidatePath("/certificates", "layout");
  // The live list no longer holds it; show it among the revoked ones.
  redirect(`/admin/certificates?status=revoked&revoked=${id}`);
}
