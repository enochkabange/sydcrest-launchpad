/**
 * PublicShell — header + footer for every logged-out page (Home, Programs,
 * Partnerships, About, Apply*, Privacy/Terms, GuardianConsent).
 *
 * Replaces the ad hoc `<div className="min-h-screen ..."><Logo/>` block
 * each of those pages used to hand-roll individually — one real nav
 * (Home/Programs/Partnerships/About, Log in, Apply now) instead of a
 * bare logo with no way to get anywhere else on the site.
 *
 * Defaults to the light theme regardless of OS preference: the brand
 * (white/blue major, orange/yellow strictly as accent) is a deliberate
 * marketing-site choice, not something that should flip to the dark
 * palette just because a visitor's OS is in dark mode. useTheme's
 * "system" default is right for the in-app product (a learner working
 * for hours should get their OS preference without touching a setting)
 * but wrong for a first marketing impression — so a visitor with no
 * explicit stored preference gets nudged to light once, while
 * ThemeToggle still lets them switch to dark if they want it.
 */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Logo, Button, useTheme, ThemeToggle } from "../ui/index.js";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Programs", to: "/programs" },
  { label: "Partnerships", to: "/partnerships" },
  { label: "About", to: "/about" },
];

export default function PublicShell({ children }) {
  const [theme, setTheme] = useTheme();
  useEffect(() => {
    if (theme === "system") setTheme("light");
    // Only ever nudge away from "system" (no stored preference) — never
    // override a theme the visitor (or their earlier authed session)
    // already chose explicitly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="border-b border-line">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/"><Logo size={32} /></Link>
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="text-sm font-semibold text-content-2 hover:text-content">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login" className="text-sm font-semibold text-content-2 hover:text-content">Log in</Link>
            <Link to="/apply/dmp"><Button variant="accent" size="sm">Apply now</Button></Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-content-3 sm:flex-row sm:px-6">
          <p>&copy; {new Date().getFullYear()} SydCrest Launchpad</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-content-2">Privacy</Link>
            <Link to="/terms" className="hover:text-content-2">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
