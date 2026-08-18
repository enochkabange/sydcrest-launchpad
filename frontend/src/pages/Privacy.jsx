/**
 * Privacy Policy — static content, public route (no auth required).
 *
 * Drafted from MASTER_PLAN.md §6's requirements: what's collected, the AI
 * disclosure (Study Buddy/quiz/path-generation data goes to Anthropic),
 * guardian consent for under-18 learners, and a Ghana Data Protection Act
 * 2012 (Act 843) reference. This is a founder-review-required draft, not
 * legal advice — flagged at the top, same caveat MASTER_PLAN §8 gives the
 * company-registration step.
 */
import { Page, Prose, Alert } from "../components/ui/index.js";
import PublicShell from "../components/public/PublicShell.jsx";

export default function Privacy() {
  return (
    <PublicShell>
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <Page title="Privacy Policy" description="Last updated: August 2026" width="wide" className="!px-0 !py-0">
          <Alert tone="warning" title="Draft — pending founder and legal review" className="mb-6">
            This policy has not yet been reviewed by counsel or filed with Ghana's Data Protection
            Commission. Treat it as a starting point, not a finished legal document.
          </Alert>

          <Prose>
            <h2>What we collect</h2>
            <p>
              When you register, we collect your full name, email, password, role (mentee or mentor),
              and optionally your phone number and region. As you use the platform we store your
              learning progress, project submissions, community posts, session bookings, and — if you
              use Study Buddy or other AI features — the messages you send.
            </p>

            <h2>AI features</h2>
            <p>
              Study Buddy, curriculum generation, quiz generation, and project feedback are powered by
              Anthropic's Claude API. When you use these features, your message content and learning
              context are sent to Anthropic to generate a response. We deliberately limit what's sent:
              your first name only, never your full name, email, phone, or other account details.
              Anthropic's own data-handling terms govern how they process that content.
            </p>

            <h2>Other services we use</h2>
            <ul>
              <li><strong>Supabase</strong> — hosts our database and handles authentication.</li>
              <li><strong>Railway</strong> and <strong>Vercel</strong> — host our backend and frontend.</li>
              <li><strong>Anthropic</strong> — powers Study Buddy and other AI features (see above).</li>
              <li><strong>Twilio</strong> — sends WhatsApp notifications, if you've provided a phone number and this is configured.</li>
              <li><strong>Hubtel</strong> — processes mentor-session payments, once payments are configured on the platform.</li>
            </ul>

            <h2>Why we collect it</h2>
            <p>
              To run the Delta Mentoring Program: matching you with a cohort and mentor, tracking your
              progress through the curriculum, reviewing your project submissions, and — if you opt in
              — sending you WhatsApp updates about your cohort.
            </p>

            <h2>Learners under 18</h2>
            <p>
              The Delta Mentoring Program is designed for learners aged 18 and above. If a learner
              under 18 is admitted to a cohort, we require verifiable consent from a parent or
              guardian before collecting any personal data, in line with Ghana's Data Protection Act
              2012 (Act 843).
            </p>

            <h2>Your rights</h2>
            <p>
              Under the Data Protection Act 2012, you have the right to access, correct, or request
              deletion of your personal data. You can update most of your profile directly from your
              account settings. To request a full export or deletion of your data, contact us using
              the details below.
            </p>

            <h2>Data retention</h2>
            <p>
              We keep your account data for as long as your account is active, and for a reasonable
              period after to support cohort reporting and grant/impact evidence — never longer than
              needed for those purposes. You can request deletion at any time.
            </p>

            <h2>Security</h2>
            <p>
              Passwords are never stored in plain text. Access to learner data is restricted by role
              (mentee, mentor, cohort admin, platform admin), and every administrative action is
              logged.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We'll update the "last updated" date above whenever this policy changes, and post
              material changes to the community feed.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy or your data: reach out via the contact details on our
              WhatsApp community channel or LinkedIn page.
            </p>
          </Prose>
        </Page>
      </div>
    </PublicShell>
  );
}
