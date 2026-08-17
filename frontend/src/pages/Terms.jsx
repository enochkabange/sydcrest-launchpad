/**
 * Terms of Service — static content, public route (no auth required).
 * Same founder-review-required draft status as Privacy.jsx — see its header.
 */
import { Link } from "react-router-dom";
import { Logo, Page, Prose, Alert } from "../components/ui/index.js";

export default function Terms() {
  return (
    <div className="min-h-screen bg-surface-sunken">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <Logo size={36} className="mb-6" />
        <Page title="Terms of Service" description="Last updated: August 2026" width="wide" className="!px-0 !py-0">
          <Alert tone="warning" title="Draft — pending founder and legal review" className="mb-6">
            These terms have not yet been reviewed by counsel. Treat them as a starting point, not a
            finished legal document.
          </Alert>

          <Prose>
            <h2>Who can join</h2>
            <p>
              SydCrest Launchpad's Delta Mentoring Program is designed for learners aged 18 and above.
              If a learner under 18 is admitted to a cohort, enrollment requires verifiable consent
              from a parent or guardian.
            </p>

            <h2>Your account</h2>
            <p>
              You're responsible for keeping your login credentials secure and for anything that
              happens under your account. Tell us immediately if you think your account has been
              compromised.
            </p>

            <h2>The pilot cohort is free</h2>
            <p>
              The January 2027 pilot cohort is free for admitted learners. Future cohorts may include
              sponsored and paid seats — we'll always tell you the terms before you enroll in a paid
              seat.
            </p>

            <h2>Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Share your account with someone else, or register multiple accounts to get around a selective-admission or scarcity limit.</li>
              <li>Use Study Buddy or any AI feature to generate content for purposes unrelated to your own learning.</li>
              <li>Scrape, resell, or redistribute curriculum content, other learners' project submissions, or community posts.</li>
              <li>Harass, discriminate against, or misrepresent yourself to mentors or other learners.</li>
            </ul>

            <h2>Your work</h2>
            <p>
              Projects and submissions you create remain yours. By submitting a project for review,
              you give SydCrest permission to use it (with attribution) in program reporting,
              certification materials, and — with your separate consent — marketing.
            </p>

            <h2>Mentors</h2>
            <p>
              Mentors volunteer their time (or, once the paid marketplace launches, are compensated
              per session). Mentors are expected to give timely, constructive feedback and treat
              learners professionally. SydCrest can remove a mentor from the platform for conduct that
              violates these terms.
            </p>

            <h2>Certification</h2>
            <p>
              A Delta Mentoring Program certificate is issued to learners who complete at least 80% of
              lessons and quizzes, submit all major projects, and pass the final assessment.
              Certification criteria may be adjusted between cohorts as the program evolves.
            </p>

            <h2>Payments (once configured)</h2>
            <p>
              Mentor-session payments are processed through Hubtel Mobile Money. SydCrest takes a
              platform commission on paid sessions, disclosed at checkout before you confirm a
              booking.
            </p>

            <h2>Termination</h2>
            <p>
              We can suspend or remove an account that violates these terms. You can stop using the
              platform and request account deletion at any time — see our Privacy Policy for how.
            </p>

            <h2>No warranty</h2>
            <p>
              The platform, its AI features, and its content are provided "as is." We do our best to
              keep things accurate and available, but we don't guarantee a specific outcome (job,
              placement, or otherwise) from completing the program.
            </p>

            <h2>Governing law</h2>
            <p>These terms are governed by the laws of Ghana.</p>

            <h2>Changes to these terms</h2>
            <p>
              We'll update the "last updated" date above whenever these terms change, and post
              material changes to the community feed.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms: reach out via the contact details on our WhatsApp community
              channel or LinkedIn page.
            </p>
          </Prose>
        </Page>

        <p className="mt-8 text-center text-sm text-content-2">
          <Link to="/login" className="text-content-link font-medium">Back to log in</Link>
        </p>
      </div>
    </div>
  );
}
