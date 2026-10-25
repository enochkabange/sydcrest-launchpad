import { getMyProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { WHATSAPP_CONSENT_KIND, WHATSAPP_CONSENT_VERSION } from "@/lib/messaging/consent";
import { WhatsAppToggle } from "./whatsapp-toggle";

/** WhatsApp updates opt in. Self contained section; reads the session, so render inside <Suspense>. */
export async function WhatsAppConsent() {
  const profile = await getMyProfile();
  const supabase = await createClient();
  const { data } = await supabase
    .from("consents")
    .select("id")
    .eq("kind", WHATSAPP_CONSENT_KIND)
    .eq("version", WHATSAPP_CONSENT_VERSION)
    .is("revoked_at", null)
    .limit(1);

  return (
    <section aria-labelledby="whatsapp-heading" className="flex flex-col gap-3 border-t border-line pt-6">
      <h2 id="whatsapp-heading" className="text-xl text-content">
        WhatsApp updates
      </h2>
      <WhatsAppToggle enabled={(data?.length ?? 0) > 0} hasPhone={Boolean(profile.phone)} />
    </section>
  );
}
