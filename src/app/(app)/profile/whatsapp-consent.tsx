import { getMyProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { WHATSAPP_CONSENT_KIND, WHATSAPP_CONSENT_VERSION } from "@/lib/messaging/consent";
import { WhatsAppToggle } from "./whatsapp-toggle";

/** WhatsApp updates opt in. Self contained section; reads the session, so render inside <Suspense>. */
export async function WhatsAppConsent() {
  const profile = await getMyProfile();
  const supabase = await createClient();
  // Latest WhatsApp consent: live means on; revoked for a number change
  // means we ask them to opt in again for the new number.
  const { data } = await supabase
    .from("consents")
    .select("version, revoked_at, revoked_reason")
    .eq("kind", WHATSAPP_CONSENT_KIND)
    .order("granted_at", { ascending: false })
    .limit(1);
  const latest = data?.[0];
  const enabled = Boolean(latest && latest.revoked_at === null && latest.version === WHATSAPP_CONSENT_VERSION);
  const numberChanged = latest?.revoked_reason === "phone_changed" && Boolean(profile.phone);
  // Live, but given for older wording: nothing is sent until they confirm the new promise.
  const outdated = Boolean(latest && latest.revoked_at === null && latest.version !== WHATSAPP_CONSENT_VERSION);

  return (
    <section aria-labelledby="whatsapp-heading" className="flex flex-col gap-3 border-t border-line pt-6">
      <h2 id="whatsapp-heading" className="text-subtitle text-content">
        WhatsApp updates
      </h2>
      {/* Keyed on the stored state so a number change elsewhere on the page resets the toggle. */}
      <WhatsAppToggle
        key={`${enabled}-${numberChanged}-${outdated}`}
        enabled={enabled}
        hasPhone={Boolean(profile.phone)}
        numberChanged={numberChanged}
        outdated={outdated}
      />
    </section>
  );
}
