/**
 * Home — public marketing landing page, PLATFORM_SPEC.md §13. Renders at
 * "/" only when the visitor is logged out (see RootRoute in App.jsx);
 * an authed session still lands on their dashboard.
 *
 * Positioning line and proof points are MASTER_PLAN.md §7's own copy —
 * real features already built in this codebase (curriculum, mentor
 * vetting, AI study buddy), not invented marketing claims.
 */
import { Link } from "react-router-dom";
import PublicShell from "../../components/public/PublicShell.jsx";
import { Icon } from "../../components/ui/index.js";

const PROOF_POINTS = [
  { icon: "curriculum", title: "A real 12-week curriculum", body: "Not a video library — a structured path with weekly projects, built for the Ghanaian job market." },
  { icon: "mentor", title: "Vetted mentors, not volunteers", body: "Every mentor goes through reference checks before they're matched with a cohort." },
  { icon: "ai", title: "An AI study buddy that's actually there at 2am", body: "Stuck on a bug between mentor sessions? Study Buddy walks through it with you." },
];

export default function Home() {
  return (
    <PublicShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="overflow-hidden rounded-2xl bg-[image:var(--gradient-launch)] px-6 py-14 sm:px-14 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-widest text-[#5c2e00]/80">Delta Mentoring Program</p>
          <h1 className="mt-2 max-w-2xl text-4xl font-extrabold tracking-tight text-[#211d1d] sm:text-5xl">
            Not another online course.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[#211d1d]/85">
            A 12-week guided cohort with a real mentor, an AI study buddy, and a path to real
            opportunities — built in Ghana, for Ghana.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/programs"
              className="rounded-md bg-[#211d1d] px-5 py-3 text-sm font-bold text-white hover:bg-black transition-colors"
            >
              Browse programs
            </Link>
            <Link
              to="/apply/dmp"
              className="rounded-md border-2 border-[#211d1d] px-5 py-3 text-sm font-bold text-[#211d1d] hover:bg-white/30 transition-colors"
            >
              Apply now
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {PROOF_POINTS.map((p) => (
            <div key={p.title} className="flex flex-col gap-3">
              <span className="flex size-12 items-center justify-center rounded-full bg-[image:var(--gradient-launch)] text-[#211d1d]">
                <Icon name={p.icon} size="lg" />
              </span>
              <h3 className="text-lg font-bold text-content">{p.title}</h3>
              <p className="text-content-2">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-line bg-surface-sunken px-6 py-10 text-center sm:px-14">
          <h2 className="text-2xl font-extrabold text-content">Building or hiring in Ghana tech?</h2>
          <p className="mt-2 text-content-2">Universities, hubs, and companies — let's talk about a partnership.</p>
          <Link to="/partnerships" className="mt-5 inline-block rounded-md bg-orange-800 px-5 py-3 text-sm font-bold text-white hover:bg-orange-900 transition-colors">
            Explore partnerships
          </Link>
        </div>
      </div>
    </PublicShell>
  );
}
