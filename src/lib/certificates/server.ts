import "server-only";
import { cache } from "react";
import { createServiceClient } from "@/lib/path/service-client";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/lib/supabase/database.types";
import { SITE_URL } from "@/lib/site";
import {
  buildCredential,
  normalizeVerificationId,
  type CertificateForBadge,
  type ProgramForBadge,
} from "./open-badges";
import { parseCertificationStatus, type CertificationStatus } from "./status";

/**
 * Reads and the one privileged write for certificates (issue #147).
 * Public reads use the anon client (verify_certificate, public_certificates),
 * so a signed in viewer never sees more than a stranger. Learner and staff
 * reads use the session client; RLS and the security definer functions
 * decide what they see.
 */

export type VerifiedCertificate = {
  verification_id: string;
  recipient_name: string;
  program_slug: string;
  program_title: string;
  specialization_label: string | null;
  cohort_name: string | null;
  issued_at: string;
  revoked_at: string | null;
  badge_json: Json | null;
};

/** One certificate by its verification id (any case), or null. Revoked ones still answer. */
export const verifyCertificate = cache(async (rawId: string): Promise<VerifiedCertificate | null> => {
  const id = normalizeVerificationId(rawId);
  if (!id) return null;
  const supabase = await createPublicClient();
  const { data, error } = await supabase.rpc("verify_certificate", { p_verification_id: id });
  if (error) throw new Error(`Could not check the certificate: ${error.message}`);
  const row = data?.[0];
  return row ? (row as VerifiedCertificate) : null;
});

/** A published programme's badge fields, or null. */
export const getProgramForBadge = cache(async (slug: string): Promise<ProgramForBadge | null> => {
  if (!/^[a-z0-9-]{1,80}$/.test(slug)) return null;
  const supabase = await createPublicClient();
  const { data } = await supabase
    .from("programs")
    .select("slug, title, summary, certification_summary")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  return data ?? null;
});

/**
 * The credential for a certificate: the stored badge_json when server code
 * saved one at issue time, else the same document built now from the
 * certificate's snapshot (badge storage no-ops without the secret key).
 */
export async function credentialFor(cert: VerifiedCertificate) {
  const stored = cert.badge_json;
  if (stored && typeof stored === "object" && !Array.isArray(stored)) return stored;
  const program = (await getProgramForBadge(cert.program_slug)) ?? {
    slug: cert.program_slug,
    title: cert.program_title,
    summary: null,
    certification_summary: null,
  };
  return buildCredential(SITE_URL, cert, program);
}

export type PublicCertificate = {
  verification_id: string;
  program_title: string;
  specialization_label: string | null;
  issued_at: string;
};

/** Live certificates on an opted in public profile. Empty for private profiles. */
export async function getPublicCertificates(profileId: string): Promise<PublicCertificate[]> {
  const supabase = await createPublicClient();
  const { data } = await supabase
    .from("public_certificates")
    .select("verification_id, program_title, specialization_label, issued_at")
    .eq("profile_id", profileId)
    .order("issued_at", { ascending: false });
  return (data ?? []).filter((c): c is PublicCertificate => !!c.verification_id && !!c.program_title && !!c.issued_at);
}

/**
 * Builds the Open Badges credential for a freshly issued certificate and
 * stores it with set_certificate_badge (service role only). Returns false,
 * without throwing, when the secret key is not configured: the credential
 * route then builds the same document on request.
 */
export async function storeBadge(certificateId: string, cert: CertificateForBadge, programId: string) {
  const service = createServiceClient();
  if (!service) return false;
  const { data: program } = await service
    .from("programs")
    .select("slug, title, summary, certification_summary")
    .eq("id", programId)
    .single();
  if (!program) return false;
  const credential = buildCredential(SITE_URL, cert, program);
  const { error } = await service.rpc("set_certificate_badge", {
    p_certificate_id: certificateId,
    p_badge_json: credential as unknown as Json,
  });
  if (error) {
    console.error(`set_certificate_badge failed for ${certificateId}: ${error.message}`);
    return false;
  }
  return true;
}

// Signed in reads ------------------------------------------------------------------

export type OwnCertificate = {
  id: string;
  verification_id: string;
  program_id: string;
  program_title: string;
  specialization_label: string | null;
  issued_at: string;
  revoked_at: string | null;
};

export async function getStatus(programId: string, profileId?: string): Promise<CertificationStatus | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc(
    "certification_status",
    profileId ? { p_program_id: programId, p_profile_id: profileId } : { p_program_id: programId },
  );
  if (error) return null;
  return parseCertificationStatus(data);
}

export type LearnerProgramme = {
  programId: string;
  programSlug: string;
  programTitle: string;
  cohortName: string;
  memberStatus: string;
  status: CertificationStatus | null;
  certificate: OwnCertificate | null;
};

/**
 * The signed in learner's programmes (one per programme, their current or
 * latest membership) with the criteria check and any live certificate,
 * plus every certificate they hold, cohort or not (issue #238).
 */
export type MyCertificate = OwnCertificate & {
  /** Null when the programme is no longer published (the badge image is then left out). */
  program_slug: string | null;
};

export async function getMyCertification(profileId: string): Promise<{ programmes: LearnerProgramme[]; certificates: MyCertificate[] }> {
  const supabase = await createClient();
  const [members, certs] = await Promise.all([
    supabase
      .from("cohort_members")
      .select("status, cohorts!cohort_members_cohort_id_fkey(name, starts_on, program_id, programs(id, slug, title))")
      .eq("profile_id", profileId)
      .eq("role", "learner"),
    supabase
      .from("certificates")
      .select(
        "id, verification_id, program_id, program_title, specialization_label, issued_at, revoked_at, programs!certificates_program_id_fkey(slug)",
      )
      .eq("profile_id", profileId)
      .order("issued_at", { ascending: false }),
  ]);
  // Fail loudly: an error must not read as "no programmes yet".
  if (members.error) throw new Error(`Could not load your programmes: ${members.error.message}`);
  if (certs.error) throw new Error(`Could not load your certificates: ${certs.error.message}`);
  const certificates: MyCertificate[] = (certs.data ?? []).map(({ programs, ...c }) => ({
    ...c,
    program_slug: programs?.slug ?? null,
  }));
  const byProgram = new Map<string, { row: NonNullable<typeof members.data>[number]; rank: number }>();
  for (const row of members.data ?? []) {
    const program = row.cohorts?.programs;
    if (!program) continue;
    // Prefer the active membership, then the latest start.
    const rank = (row.status === "active" ? 1e13 : 0) + Date.parse(row.cohorts!.starts_on);
    const seen = byProgram.get(program.id);
    if (!seen || rank > seen.rank) byProgram.set(program.id, { row, rank });
  }
  const programmes = await Promise.all(
    [...byProgram.values()].map(async ({ row }) => {
      const program = row.cohorts!.programs!;
      return {
        programId: program.id,
        programSlug: program.slug,
        programTitle: program.title,
        cohortName: row.cohorts!.name,
        memberStatus: row.status,
        status: await getStatus(program.id),
        certificate: certificates.find((c) => c.program_id === program.id && !c.revoked_at) ?? null,
      };
    }),
  );
  return { programmes, certificates };
}

export type StaffCohort = { id: string; name: string; programId: string; programTitle: string; role: string };

/** Cohorts the caller mentors or coordinates; admins get every cohort (role "admin"). */
export async function getStaffCohorts(profileId: string, isAdmin: boolean): Promise<StaffCohort[]> {
  const supabase = await createClient();
  if (isAdmin) {
    const { data, error } = await supabase
      .from("cohorts")
      .select("id, name, program_id, starts_on, programs(title)")
      .order("starts_on", { ascending: false });
    if (error) throw new Error(`Could not load cohorts: ${error.message}`);
    return (data ?? []).map((c) => ({ id: c.id, name: c.name, programId: c.program_id, programTitle: c.programs?.title ?? "", role: "admin" }));
  }
  const { data, error } = await supabase
    .from("cohort_members")
    .select("role, cohorts!cohort_members_cohort_id_fkey(id, name, program_id, starts_on, programs(title))")
    .eq("profile_id", profileId)
    .in("role", ["mentor", "coordinator"]);
  if (error) throw new Error(`Could not load cohorts: ${error.message}`);
  return (data ?? [])
    .filter((m) => m.cohorts)
    .sort((a, b) => b.cohorts!.starts_on.localeCompare(a.cohorts!.starts_on))
    .map((m) => ({
      id: m.cohorts!.id,
      name: m.cohorts!.name,
      programId: m.cohorts!.program_id,
      programTitle: m.cohorts!.programs?.title ?? "",
      role: m.role,
    }));
}

export type RosterLearner = {
  memberId: string;
  profileId: string;
  name: string;
  memberStatus: string;
  status: CertificationStatus | null;
  certificate: OwnCertificate | null;
};

/** Learners of one cohort with their criteria check and live certificate. Staff and admins only (RLS). */
export async function getCohortCertificationRoster(cohort: StaffCohort): Promise<RosterLearner[]> {
  const supabase = await createClient();
  const { data: roster, error } = await supabase
    .from("cohort_roster")
    .select("member_id, profile_id, display_name, status")
    .eq("cohort_id", cohort.id)
    .eq("role", "learner")
    .order("display_name");
  if (error) throw new Error(`Could not load the cohort: ${error.message}`);
  const learners = (roster ?? []).filter((r) => r.member_id && r.profile_id);
  if (learners.length === 0) return [];
  const { data: certs, error: certsError } = await supabase
    .from("certificates")
    .select("id, verification_id, profile_id, program_id, program_title, specialization_label, issued_at, revoked_at")
    .eq("program_id", cohort.programId)
    .in("profile_id", learners.map((l) => l.profile_id!))
    .is("revoked_at", null);
  if (certsError) throw new Error(`Could not load certificates: ${certsError.message}`);
  return Promise.all(
    learners.map(async (l) => ({
      memberId: l.member_id!,
      profileId: l.profile_id!,
      name: l.display_name?.trim() || "Name not set",
      memberStatus: l.status ?? "active",
      status: await getStatus(cohort.programId, l.profile_id!),
      certificate: certs?.find((c) => c.profile_id === l.profile_id) ?? null,
    })),
  );
}
