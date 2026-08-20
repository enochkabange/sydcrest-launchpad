/**
 * Home — public marketing landing page, PLATFORM_SPEC.md §13. Renders at
 * "/" only when the visitor is logged out (see RootRoute in App.jsx);
 * an authed session still lands on their dashboard.
 *
 * Color restraint matters here: ADPList, Brilliant, and Leland (the
 * reference sites this platform is explicitly designed against) all use
 * their accent color sparingly — one button fill, a small badge — against
 * mostly neutral space. `variant="accent"` (the orange gradient Button
 * fill) is reserved for exactly one CTA per page here, not applied to
 * every button; the hero itself no longer fills the viewport with solid
 * gradient.
 *
 * Facts strip below is true-today structural facts, not volume metrics —
 * this is a pre-launch pilot with no real usage numbers yet, and
 * fabricating "10,000+ learners" the way a stat-flush platform can is
 * exactly the kind of invented content this session's no-fake-content
 * discipline rules out.
 */
import { Link } from "react-router-dom";
import PublicShell from "../../components/public/PublicShell.jsx";
import { Icon, Button, Badge } from "../../components/ui/index.js";
import { HeroGraphic, StepGraphic } from "../../components/public/illustrations.jsx";

const FACTS = ["12 weeks", "Free to apply", "1:1 mentor match", "Ghana-built curriculum"];

const HOW_IT_WORKS = [
  { step: "1", title: "Apply", body: "Fill out one application for your program of choice — takes about 10 minutes." },
  { step: "2", title: "Get matched", body: "Accepted applicants are placed in a cohort with a vetted mentor." },
  { step: "3", title: "12 weeks, real projects", body: "Weekly curriculum, mentor sessions, and an AI study buddy in between." },
];

const PROOF_POINTS = [
  { icon: "curriculum", title: "A real 12-week curriculum", body: "Not a video library — a structured path with weekly projects, built for the Ghanaian job market." },
  { icon: "mentor", title: "Vetted mentors, not volunteers", body: "Every mentor goes through reference checks before they're matched with a cohort." },
  { icon: "ai", title: "An AI study buddy that's actually there at 2am", body: "Stuck on a bug between mentor sessions? Study Buddy walks through it with you." },
];

export default function Home() {
  return (
    <PublicShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col items-start gap-6">
            <Badge tone="info">Delta Mentoring Program</Badge>
            <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-content sm:text-5xl">
              Not another online course.
            </h1>
            <p className="max-w-xl text-lg text-content-2">
              A 12-week guided cohort with a real mentor, an AI study buddy, and a path to real
              opportunities — built in Ghana, for Ghana.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/apply/dmp"><Button variant="accent">Apply now</Button></Link>
              <Link to="/programs"><Button variant="secondary">Browse programs</Button></Link>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {FACTS.map((f) => (
                <Badge key={f} tone="neutral">{f}</Badge>
              ))}
            </div>
          </div>
          <HeroGraphic className="hidden w-full max-w-xs justify-self-center md:block" />
        </div>

        <div className="mt-16 border-t border-line pt-16">
          <h2 className="text-2xl font-extrabold text-content">How it works</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {HOW_IT_WORKS.map((s, i) => (
              <div key={s.step} className="flex flex-col gap-3">
                <StepGraphic index={i} />
                <h3 className="font-bold text-content">{s.title}</h3>
                <p className="text-sm text-content-2">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {PROOF_POINTS.map((p) => (
            <div key={p.title} className="flex flex-col gap-3">
              <span className="flex size-12 items-center justify-center rounded-full bg-surface-sunken text-content">
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
          <Link to="/partnerships" className="mt-5 inline-block">
            <Button variant="primary">Explore partnerships</Button>
          </Link>
        </div>
      </div>
    </PublicShell>
  );
}
