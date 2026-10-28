import { Suspense } from "react";
import Link from "@/components/ui/link";
import Logo from "@/components/brand/Logo";
import { HeroGraphic } from "@/components/brand/illustrations";
import { LegalLinks } from "@/components/app-shell/legal-links";
import { COMMUNITY_SIZE, MISSION, PILOT } from "@/content/marketing";
import { PageViewTracker } from "@/lib/analytics/page-view-tracker";

/** Facts on record (src/content/marketing.ts), never a promise or a number we cannot source. */
const FACTS = [
  "Free roadmaps written for the Ghanaian job market",
  `${PILOT.seats} free seats in the first cohort, starting ${PILOT.starts}`,
  `A WhatsApp community of ${COMMUNITY_SIZE} members`,
];

/**
 * Phones get a centred form. From lg the screen splits: the form on the left,
 * a brand panel on the right. Fully static; the panel reads no session.
 */
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-1 lg:grid lg:grid-cols-2">
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-8 px-4 py-12 lg:py-16">
        <Link href="/" aria-label="SydCrest Launchpad home" className="self-start">
          <Logo size={36} />
        </Link>
        {children}
        <LegalLinks />
        {/* Shared sign up links skip the marketing pages; count the visit here too. */}
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
      </main>
      <aside
        aria-label="About SydCrest"
        className="hidden flex-col justify-center gap-8 border-l border-line bg-surface-sunken px-12 py-16 lg:flex xl:px-20"
      >
        <HeroGraphic className="w-40 xl:w-56" />
        <div className="flex max-w-lg flex-col gap-4">
          <p className="text-xs font-bold tracking-widest text-content-accent uppercase">Built in Northern Ghana</p>
          <p className="text-h2 font-bold text-content">Find your path into tech.</p>
          <p className="text-lead text-content-2">{MISSION}</p>
        </div>
        <ul className="flex max-w-lg flex-col gap-3 border-t border-line pt-6">
          {FACTS.map((f) => (
            <li key={f} className="flex items-start gap-3 text-content-2">
              <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-brand-mark" />
              {f}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
