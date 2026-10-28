import Link from "@/components/ui/link";

const LEGAL = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
] as const;

/**
 * Privacy, Terms and Accessibility links for every frame outside the marketing site, whose
 * own footer already carries them. Static: no session reads.
 */
export function LegalLinks({ className = "" }: { className?: string }) {
  return (
    <nav aria-label="Legal" className={className}>
      <ul className="flex flex-wrap gap-x-6 text-sm">
        {LEGAL.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="flex min-h-11 items-center text-content-2 no-underline hover:text-content">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
