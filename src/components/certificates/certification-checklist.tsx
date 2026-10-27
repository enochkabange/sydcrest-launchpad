import { getCurrentUser } from "@/lib/auth";
import { getMyCertification } from "@/lib/certificates/server";
import { CertificationCard } from "./certification-card";

/**
 * Drop in certificate panel for the signed in learner (for /cohort and the
 * dashboard). Reads the session, so mount it inside <Suspense>:
 *
 *   <Suspense fallback={<CertificationChecklistSkeleton />}>
 *     <CertificationChecklist programId={program.id} />
 *   </Suspense>
 *
 * Without `programId` it shows every programme the learner is in. Renders
 * nothing for someone who is not a learner in any programme.
 */
export async function CertificationChecklist({ programId, headingLevel = 2 }: { programId?: string; headingLevel?: 2 | 3 }) {
  const user = await getCurrentUser();
  if (!user) return null;
  const { programmes } = await getMyCertification(user.id);
  const shown = programId ? programmes.filter((p) => p.programId === programId) : programmes;
  if (shown.length === 0) return null;
  return (
    <div className="flex flex-col gap-4">
      {shown.map((p) => (
        <CertificationCard
          key={p.programId}
          programTitle={p.programTitle}
          programSlug={p.programSlug}
          status={p.status}
          certificate={p.certificate}
          headingLevel={headingLevel}
        />
      ))}
    </div>
  );
}

export function CertificationChecklistSkeleton() {
  return <div aria-busy="true" className="h-72 animate-skeleton rounded-lg bg-surface-sunken" />;
}
