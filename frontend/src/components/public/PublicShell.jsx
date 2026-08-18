/**
 * PublicShell — header + footer for every logged-out page (Home, Programs,
 * Partnerships, About, Apply*, Privacy/Terms, GuardianConsent).
 *
 * Replaces the ad hoc `<div className="min-h-screen ..."><Logo/>` block
 * each of those pages used to hand-roll individually — one real nav
 * (Home/Programs/Partnerships/About, Log in, Apply now) instead of a
 * bare logo with no way to get anywhere else on the site.
 */
import { Link } from "react-router-dom";
import { Logo } from "../ui/index.js";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Programs", to: "/programs" },
  { label: "Partnerships", to: "/partnerships" },
  { label: "About", to: "/about" },
];

export default function PublicShell({ children }) {
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
            <Link to="/login" className="text-sm font-semibold text-content-2 hover:text-content">Log in</Link>
            <Link
              to="/apply/dmp"
              className="rounded-md bg-orange-800 px-4 py-2 text-sm font-bold text-white hover:bg-orange-900 transition-colors"
            >
              Apply now
            </Link>
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
