import type { ReactNode } from "react";
import Link from "@/components/ui/link";
import { LEGAL_IS_DRAFT, LEGAL_UPDATED, LEGAL_VERSION, PRIVACY_CONTACT_EMAIL } from "@/lib/legal";

/** Headings, paragraphs and lists styled for long reading, without a typography plugin. */
const PROSE = [
  "flex flex-col gap-4 text-base leading-relaxed text-content-2",
  "[&_h2]:mt-6 [&_h2]:text-subtitle [&_h2]:text-content",
  "[&_h3]:mt-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-content",
  "[&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-6",
  "[&_strong]:font-semibold [&_strong]:text-content",
  "[&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2",
].join(" ");

export function LegalDocument({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">{title}</h1>
        <p className="text-sm text-content-3">
          Version {LEGAL_VERSION}. Last updated {LEGAL_UPDATED}.
        </p>
      </div>
      {LEGAL_IS_DRAFT && (
        <div role="note" className="rounded-md border border-warning-fg/40 bg-warning-bg px-4 py-3 text-sm text-content">
          <strong className="font-semibold">Draft for review.</strong> This text has not yet been
          approved by SydCrest or reviewed by a lawyer. It will change before we open to the public.
        </div>
      )}
      <div className={PROSE}>{children}</div>
      <p className="border-t border-line pt-6 text-sm text-content-3">
        See also our <Link href="/privacy" className="font-semibold">Privacy Policy</Link> and{" "}
        <Link href="/terms" className="font-semibold">Terms</Link>.
      </p>
    </article>
  );
}

/** The privacy contact, or an honest placeholder until a real address is confirmed. */
export function PrivacyContact() {
  if (PRIVACY_CONTACT_EMAIL) return <a href={`mailto:${PRIVACY_CONTACT_EMAIL}`}>{PRIVACY_CONTACT_EMAIL}</a>;
  return (
    <mark className="rounded-sm bg-warning-bg px-1 text-content">
      [contact email to be confirmed before publication]
    </mark>
  );
}
