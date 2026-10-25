import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, PrivacyContact } from "../legal-document";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms for using SydCrest Launchpad.",
};

export default function TermsPage() {
  return (
    <LegalDocument title="Terms">
      <p>
        These terms are the agreement between you and SydCrest, a company limited by guarantee
        registered in Ghana, for using SydCrest Launchpad. By creating an account you agree to them
        and to our <Link href="/privacy">Privacy Policy</Link>. Please read them. If you do not
        agree, do not create an account.
      </p>

      <h2>Who can use SydCrest</h2>
      <ul>
        <li>You must be 18 or over. We check your date of birth when you sign up.</li>
        <li>Each account is for one person. Do not share your account or sign up for someone else.</li>
        <li>The details you give us, including your date of birth, must be true.</li>
      </ul>

      <h2>Your account</h2>
      <p>
        Keep your password safe and tell us if you think someone else has used your account. If you
        sign in with Google, your Google account security protects your SydCrest account too. You
        are responsible for what happens on your account.
      </p>

      <h2>What SydCrest offers</h2>
      <p>
        SydCrest Launchpad offers free learning roadmaps written for the Ghanaian job market, a
        learning community and access to mentors, with features opening over time. We are a young
        platform running a pilot, so things will change, and some features may pause or stop. We
        will tell you about important changes.
      </p>
      <p>
        We work hard to help you learn, but we cannot promise any job, income or other outcome from
        using SydCrest.
      </p>

      <h2>The AI tutor</h2>
      <ul>
        <li>
          The AI tutor can make mistakes. Check important answers and ask a mentor or the community
          when unsure.
        </li>
        <li>
          Do not put private details, such as passwords, ID numbers or financial information, in your
          questions.
        </li>
        <li>There is a daily limit on questions so the tutor stays free for everyone.</li>
      </ul>

      <h2>How to behave</h2>
      <p>SydCrest is a community. When you use it, you agree not to:</p>
      <ul>
        <li>Harass, threaten, bully or discriminate against anyone.</li>
        <li>Post anything illegal, hateful, sexually explicit or misleading.</li>
        <li>Send spam or advertise without our permission.</li>
        <li>Pretend to be someone else.</li>
        <li>Try to break, overload or get around the security of the platform.</li>
        <li>Copy our content or other members&rsquo; data using automated tools.</li>
      </ul>
      <p>We may remove content or suspend accounts that break these rules.</p>

      <h2>Content</h2>
      <p>
        <strong>Yours:</strong> you own what you post. You give SydCrest permission to store and show
        it on the platform so the service can work, for as long as it stays on SydCrest.
      </p>
      <p>
        <strong>Ours:</strong> SydCrest roadmaps and learning materials are written by SydCrest. You
        may use them for your own learning. Please do not republish or sell them without our
        permission. Links to other websites are provided for your convenience and those sites have
        their own terms.
      </p>

      <h2>Cost</h2>
      <p>
        Creating an account and using the roadmaps is free. If we add paid features later, we will
        show the price clearly and you will choose whether to pay before you are charged anything.
      </p>

      <h2>Ending your account</h2>
      <p>
        You can stop using SydCrest at any time and ask us to delete your account. We may suspend or
        close an account that breaks these terms, or that belongs to someone under 18. Where we can,
        we will tell you why.
      </p>

      <h2>Our responsibility to you</h2>
      <p>
        We provide SydCrest as it is and as available, and we do not guarantee it will always work
        without interruption or errors. To the extent the law allows, SydCrest is not responsible for
        indirect losses from using the platform. Nothing in these terms takes away rights you have
        under the laws of Ghana that cannot be removed by agreement.
      </p>

      <h2>Law</h2>
      <p>These terms are governed by the laws of the Republic of Ghana, and the courts of Ghana deal with any dispute.</p>

      <h2>Changes to these terms</h2>
      <p>
        When we change these terms we will update the version and date at the top. If a change is
        important, we will tell you and may ask you to agree again before you continue.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about these terms? Email <PrivacyContact />.
      </p>
    </LegalDocument>
  );
}
