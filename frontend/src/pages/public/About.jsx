/**
 * About — mission/story + contact, PLATFORM_SPEC.md §13. Framed honestly
 * as a solo-founder pilot (MASTER_PLAN.md §7: "zero budget, solo") — no
 * fabricated team bios. Contact is a direct mailto, not a form: a form
 * needs an inbox/ticketing system behind it that doesn't exist yet, and
 * WhatsApp/email are the real channels per MASTER_PLAN, not a new one.
 */
import PublicShell from "../../components/public/PublicShell.jsx";
import { Prose } from "../../components/ui/index.js";

export default function About() {
  return (
    <PublicShell>
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-content-3">About</p>
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
          <p>
            SydCrest is currently a solo-founder project running its first pilot cohort in Ghana — not
            a large team with a polished "About us" page. What exists today is real: a working
            curriculum, a mentor-vetting process, and a platform built to support it, all built openly.
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
