import { Award } from "lucide-react";
import Link from "@/components/ui/link";
import { CredentialForm } from "@/components/credentials/credential-form";
import { ImportBadgeForm } from "@/components/credentials/import-badge-form";
import { ManageCredential } from "@/components/credentials/manage-credential";
import { VerificationLabel } from "@/components/credentials/verification-label";
import { requireUser } from "@/lib/auth";
import { formatIssued } from "@/lib/certificates/format";
import { getMyExternalCredentials } from "@/lib/credentials/queries";
import { embedSnippet, linkedInAddUrl, VERIFICATION_LABEL } from "@/lib/credentials/share";
import { externalVerification } from "@/lib/credentials/model";
import { credentialShareTarget } from "@/lib/share/card";
import { getMyVerifiedSkills } from "@/lib/skills/queries";
import { SITE_URL } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";

const SUMMARY = "inline-flex min-h-11 cursor-pointer items-center font-semibold text-content hover:text-content-link";

/**
 * The credentials wallet on /profile (issue #253, one profile with
 * sections): SydCrest certificates and verified skills, certificates from
 * other issuers, adding and importing, and sharing. Reads the session, so
 * render inside <Suspense>.
 */
export async function CredentialsSection() {
  const user = await requireUser();
  const supabase = await createClient();
  const [credentials, verifiedSkills, { data: profile }, { data: certificates }] = await Promise.all([
    getMyExternalCredentials(),
    getMyVerifiedSkills(),
    supabase.from("profiles").select("is_public, public_slug").eq("id", user.id).single(),
    supabase
      .from("certificates")
      .select("verification_id, program_title, specialization_label, issued_at")
      .eq("profile_id", user.id)
      .is("revoked_at", null)
      .order("issued_at", { ascending: false }),
  ]);
  const profilePublic = !!profile?.is_public && !!profile.public_slug;
  const walletUrl = profilePublic ? `${SITE_URL}/u/${profile!.public_slug}/credentials` : null;

  return (
    <section id="credentials" aria-labelledby="credentials-heading" className="flex scroll-mt-8 flex-col gap-5 border-t border-line pt-6">
      <div className="flex flex-col gap-1">
        <h2 id="credentials-heading" className="text-subtitle text-content">
          Credentials
        </h2>
        <p className="text-content-2">
          Every certificate in one wallet. Ones you earn here read {VERIFICATION_LABEL.sydcrest}. Ones you add from elsewhere read{" "}
          {VERIFICATION_LABEL.learner}, unless an Open Badge checks out with its issuer.
        </p>
        {walletUrl ? (
          <Link href={`/u/${profile!.public_slug}/credentials`} className="inline-flex min-h-11 items-center self-start font-semibold text-content-link underline">
            See your public wallet
          </Link>
        ) : (
          <p className="text-sm text-content-3">
            Your wallet page goes live when your profile is public.{" "}
            <Link href="#public-profile-heading" className="font-semibold text-content-link underline">
              Public profile settings
            </Link>
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-h3 text-content">From SydCrest</h3>
        {(certificates ?? []).length === 0 && verifiedSkills.length === 0 ? (
          <p className="rounded-md bg-surface-sunken p-4 text-sm text-content-2">
            Nothing yet. Certificates come from the mentored programme, and verified skills from a completed path, an assessment or a
            reviewed portfolio.{" "}
            <Link href="/skills" className="font-semibold text-content-link underline">
              See the skills
            </Link>
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-line rounded-lg border border-line">
            {(certificates ?? []).map((c) => {
              const title = c.specialization_label ? `${c.program_title}: ${c.specialization_label}` : c.program_title;
              return (
                <li key={c.verification_id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-start gap-3">
                    <Award aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-content-accent" />
                    <span className="flex flex-col gap-1">
                      <Link href={`/verify/${c.verification_id}`} className="font-semibold text-content underline">
                        {title}
                      </Link>
                      <span className="text-sm text-content-3">Issued {formatIssued(c.issued_at)}</span>
                      <VerificationLabel kind="sydcrest" size="sm" />
                    </span>
                  </span>
                  <a
                    href={linkedInAddUrl({
                      name: title,
                      organizationName: "SydCrest Launchpad",
                      issuedOn: c.issued_at,
                      certUrl: `${SITE_URL}/verify/${c.verification_id}`,
                      certId: c.verification_id,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-content-link underline"
                  >
                    Add to LinkedIn<span className="sr-only">: {title} (opens in a new tab)</span>
                  </a>
                </li>
              );
            })}
            {verifiedSkills.length > 0 && (
              <li className="flex flex-col gap-2 p-4">
                <span className="font-semibold text-content">
                  {verifiedSkills.length} verified {verifiedSkills.length === 1 ? "skill" : "skills"}: {verifiedSkills.map((s) => s.name).join(", ")}
                </span>
                <VerificationLabel kind="sydcrest" size="sm" />
              </li>
            )}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-h3 text-content">From other issuers</h3>
        {credentials.length === 0 ? (
          <p className="rounded-md bg-surface-sunken p-4 text-sm text-content-2">
            None yet. Add a certificate from a course, a university or a vendor, or import an Open Badge. Each one stays private until
            you make it public.
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {credentials.map((c) => {
              const shareable = profilePublic && c.visibility === "public" && !c.hidden_at;
              const share = shareable ? credentialShareTarget(c.id, c, profile!.public_slug!, SITE_URL) : null;
              return (
                <ManageCredential
                  key={c.id}
                  credential={c}
                  profileId={user.id}
                  profilePublic={profilePublic}
                  share={share}
                  linkedInUrl={linkedInAddUrl({
                    name: c.title,
                    organizationName: c.issuer_name,
                    issuedOn: c.issued_on,
                    expiresOn: c.expires_on,
                    certUrl: c.verification_url ?? (shareable ? share!.pageUrl : null),
                    certId: c.credential_id,
                  })}
                  embed={
                    shareable
                      ? embedSnippet({
                          pageUrl: share!.pageUrl,
                          imageUrl: `${SITE_URL}/og/credentials/${c.id}/square`,
                          title: c.title,
                          label: VERIFICATION_LABEL[externalVerification(c)],
                        })
                      : null
                  }
                />
              );
            })}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <details className="rounded-lg border border-line p-4 open:pb-5">
          <summary className={SUMMARY}>Add a certificate</summary>
          <div className="pt-3">
            <CredentialForm profileId={user.id} />
          </div>
        </details>
        <details className="rounded-lg border border-line p-4 open:pb-5">
          <summary className={SUMMARY}>Import an Open Badge</summary>
          <div className="flex flex-col gap-3 pt-3">
            <p className="text-sm text-content-2">
              We fetch the badge from its issuer. It reads {VERIFICATION_LABEL.issuer} only when the issuer&apos;s record checks out and
              names the email address on your account; otherwise it reads {VERIFICATION_LABEL.learner}.
            </p>
            <ImportBadgeForm />
          </div>
        </details>
      </div>
    </section>
  );
}
