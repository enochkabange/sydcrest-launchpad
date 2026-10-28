import Link from "@/components/ui/link";
import { LogoMark } from "@/components/brand/Logo";
import { CONTACT_EMAIL } from "@/content/marketing";
import { FOOTER_NAV } from "@/lib/nav/config";

const LEGAL = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface-sunken">
      <div className="mx-auto flex w-full max-w-page flex-col gap-8 px-4 py-10 md:flex-row md:justify-between md:px-8">
        <div className="flex max-w-sm flex-col gap-3">
          <LogoMark size={32} variant="auto" />
          <p className="text-sm text-content-2">
            SydCrest Launchpad takes young Ghanaians from &ldquo;where do I start&rdquo; to employable, earning tech
            talent. Built in Northern Ghana, for the whole country.
          </p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm font-semibold">
            {CONTACT_EMAIL}
          </a>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2 text-sm md:max-w-xl md:flex-1">
          {/* Two columns on phones, three from sm: twelve links never make one tall list. */}
          <ul className="grid grid-cols-2 gap-x-8 sm:grid-cols-3">
            {FOOTER_NAV.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="flex min-h-11 items-center text-content-2 no-underline hover:text-content">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-8 border-t border-line pt-2">
            {LEGAL.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="flex min-h-11 items-center text-content-2 no-underline hover:text-content">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
