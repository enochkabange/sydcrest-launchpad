/**
 * About — mission/story/vision + contact, PLATFORM_SPEC.md §13. Content
 * is drawn from ../../../../MASTER_PLAN.md §1 (mission, north-star
 * metric, 2-year picture) — the real internal strategy document, not
 * invented marketing copy. Forward-looking numbers (cohort count, alumni
 * count, completion/placement rates) are stated as goals for end-of-2028,
 * never phrased as current facts — this is a pre-launch pilot with zero
 * cohorts run yet, and presenting a target as an achievement would be
 * exactly the kind of fabricated content this session's standing
 * no-fake-content rule exists to rule out.
 *
 * Framed honestly as a solo-founder pilot (MASTER_PLAN §7: "zero budget,
 * solo") — no fabricated team bios.
 */
import PublicShell from "../../components/public/PublicShell.jsx";
import { Prose, Badge, Icon } from "../../components/ui/index.js";
import { SectionAccent } from "../../components/public/illustrations.jsx";

const VISION_GOALS = [
  { icon: "cohort", label: "6–8 completed cohorts, 300–500 alumni" },
  { icon: "progress", label: "60%+ completion rate" },
  { icon: "opportunity", label: "30%+ landing a job, internship, or contract within 6 months" },
  { icon: "mentor", label: "A real, ongoing grant and sponsor network funding free seats" },
];

export default function About() {
  return (
    <PublicShell>
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <SectionAccent />
        <p className="mt-3 text-xs font-bold uppercase tracking-widest text-content-3">About</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-content sm:text-4xl">
          Why SydCrest exists
        </h1>

        <Prose className="mt-8">
          <p>
            Too many learners in Ghana start an online course and never finish it — not for lack of
            ability, but for lack of structure, accountability, and someone to ask when they're stuck.
            SydCrest Launchpad is a 12-week guided cohort built to fix that: a real curriculum, a real
            mentor, and an AI study buddy that's there between sessions.
          </p>

          <h2>Our mission</h2>
          <p>
            Take motivated Ghanaians from beginner to employable tech talent — through structured
            12-week cohorts, AI-personalized learning, human mentorship, and direct pathways to real
            opportunities.
          </p>
          <p>
            We measure ourselves against one number, not vanity metrics: <strong>learners who complete
            a cohort and land a verifiable opportunity</strong> — a job, internship, freelance contract,
            or scholarship — <strong>within six months.</strong> A completion certificate that doesn't
            lead anywhere isn't success by our own definition.
          </p>

          <h2>Where we are today</h2>
          <p>
            SydCrest is currently a solo-founder project building toward its first live cohort. What
            exists today is real: a working 12-week curriculum (the Delta Mentoring Program), a
            mentor-vetting process, and the platform itself — built openly, not a polished "About us"
            page standing in for a large team that doesn't exist yet.
          </p>

          <h2>Where we're headed</h2>
          <p>
            These are goals we're building toward, not results we've already delivered — SydCrest
            hasn't run a cohort yet. By the end of 2028, we want to reach:
          </p>
        </Prose>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {VISION_GOALS.map((g) => (
            <div key={g.label} className="flex items-start gap-3 rounded-lg border border-line px-4 py-3">
              <Icon name={g.icon} size="md" className="mt-0.5 shrink-0 text-content-2" />
              <span className="text-sm text-content">{g.label}</span>
            </div>
          ))}
        </div>

        <Prose className="mt-8">
          <p>
            None of that happens by treating this as a course library. It happens by keeping cohorts
            small, mentors real, and every feature we build pointed at that one north-star number above
            — not at looking more finished than we are.
          </p>

          <h2>Get in touch</h2>
          <p>
            Questions, press, or just want to say hello — email{" "}
            <a href="mailto:enochkabange@gmail.com" className="text-content-link font-medium">enochkabange@gmail.com</a>.
          </p>
        </Prose>
      </div>
    </PublicShell>
  );
}
