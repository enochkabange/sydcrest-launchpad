import Link from "@/components/ui/link";
import { pageMetadata } from "@/lib/page-metadata";
import { AnalyticsChoice } from "@/lib/analytics/analytics-choice";
import { LegalDocument, PrivacyContact } from "../legal-document";

export const metadata = pageMetadata({
  og: "privacy",
  title: "Privacy Policy",
  description: "How SydCrest Launchpad collects, uses and protects your personal data under Ghana's Data Protection Act, 2012 (Act 843).",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalDocument title="Privacy Policy">
      <p>
        This policy explains what personal data SydCrest Launchpad collects, why we collect it, who
        we share it with, how long we keep it and the rights you have under the Data Protection Act,
        2012 (Act 843) of Ghana. We have tried to write it in plain language. If anything is unclear,
        ask us using the contact details at the end.
      </p>

      <h2>Who we are</h2>
      <p>
        SydCrest Launchpad is run by SydCrest, a company limited by guarantee registered in Ghana. We
        are a social enterprise that helps people in Ghana find a path into tech through free
        roadmaps, a learning community and mentors. In this policy, &ldquo;SydCrest&rdquo;,
        &ldquo;we&rdquo; and &ldquo;us&rdquo; mean SydCrest. For the purposes of Act 843, SydCrest is
        the data controller for the personal data described here.
      </p>
      <p>
        SydCrest is registering with the Data Protection Commission of Ghana as a data controller. We
        will show our registration number on this page once it is issued.
      </p>

      <h2>What we collect</h2>
      <h3>When you create an account</h3>
      <ul>
        <li>Your name and email address.</li>
        <li>
          Your password. Our sign in provider stores it only in a scrambled (hashed) form that no one
          at SydCrest can read.
        </li>
        <li>
          Your date of birth, so we can check that you are 18 or over. We use it only for that check
          and for keeping a record that the check was done.
        </li>
        <li>A record that you agreed to our Terms and this policy, the version you agreed to and when.</li>
        <li>
          If you sign in with Google: the name, email address and profile picture Google shares with
          us. Google does not share your date of birth, so we ask for it separately.
        </li>
      </ul>
      <h3>If you choose to add them</h3>
      <ul>
        <li>Your phone number.</li>
        <li>Your region in Ghana, so we can connect you with your local chapter and events.</li>
      </ul>
      <h3>When you use the platform</h3>
      <ul>
        <li>Your learning progress, such as the roadmap steps you have completed.</li>
        <li>
          How many questions you ask the AI tutor each day, so we can keep it free and fair for
          everyone.
        </li>
        <li>
          Analytics about how the platform is used: which pages are opened, which features are used and
          whether they worked, how fast pages load, and errors. These never include your name, email
          address, phone number or anything you type. The <a href="#analytics">Analytics</a> section
          below explains exactly what we record.
        </li>
      </ul>
      <p>We do not ask for and do not want sensitive data such as your health, religion or finances.</p>

      <h2>Why we use it, and our legal basis</h2>
      <p>Act 843 requires a lawful reason for each use of your data. Ours are:</p>
      <ul>
        <li>
          <strong>To run your account and the service you asked for</strong>, such as saving your
          progress and signing you in. This is necessary to provide the service under our Terms.
        </li>
        <li>
          <strong>To check your age.</strong> SydCrest is only for adults, and keeping a record of the
          check is part of meeting our legal and safeguarding duties.
        </li>
        <li>
          <strong>To send you messages about your account</strong>, such as confirming your email
          address. If you give us your phone number, we may send text message reminders about
          cohorts and events once that feature is switched on. You can ask us to stop at any time.
        </li>
        <li>
          <strong>To improve SydCrest</strong> using analytics: finding what is slow, confusing or
          broken, and reporting how the programme is going in totals. This is in our legitimate
          interest in running a useful service, and you can turn it off (see{" "}
          <a href="#analytics">Analytics</a>).
        </li>
        <li>
          <strong>To keep the community safe</strong> and to comply with the law.
        </li>
      </ul>
      <p>
        When you create an account you give your consent to this policy. You can withdraw that
        consent at any time by asking us to delete your account.
      </p>

      <h2 id="analytics">Analytics</h2>
      <p>
        We run our own analytics. Nothing goes to an advertising network or a third party analytics
        company, and there are no third party trackers on SydCrest.
      </p>
      <h3>What we record</h3>
      <ul>
        <li>
          <strong>What happened:</strong> the name of an event, such as a page being opened, a quiz
          being passed or a booking being requested, with the time, and simple details such as a score,
          a count or whether it worked.
        </li>
        <li>
          <strong>Which kind of page:</strong> for example &ldquo;a roadmap topic&rdquo; or &ldquo;a
          public profile&rdquo;, never which person&rsquo;s profile, and never the rest of the web
          address.
        </li>
        <li>
          <strong>Your device type:</strong> phone, tablet or computer. We do not keep your internet
          address or the details of your browser with your analytics.
        </li>
        <li>
          <strong>If you are signed in:</strong> your account number (a random code, not your name), and
          at the time of the event your role on SydCrest (for example learner, mentor or expert), the
          track you are following, your region, your chapter and your cohort. This lets us count people
          rather than clicks and see which groups a change helps.
        </li>
        <li>
          <strong>If you are not signed in:</strong> a random visitor code kept in a cookie on your
          device, so we can count visits without knowing who you are.
        </li>
        <li>
          <strong>Page speed:</strong> on about a quarter of visits, how quickly pages load and respond.
        </li>
        <li>
          <strong>Forms:</strong> whether a form, such as an application, was started and whether it
          was sent. Never what you typed into it.
        </li>
        <li>
          <strong>Errors:</strong> when something breaks, a short description of the error with emails,
          numbers and links removed.
        </li>
      </ul>
      <h3>Who can see it</h3>
      <p>
        Analytics are stored in our own database. Only SydCrest administrators can read them, mostly as
        daily totals. We never sell them or share them with advertisers.
      </p>
      <h3>Cookies we use for analytics</h3>
      <ul>
        <li>
          <strong>sc_aid</strong>: the random visitor code, kept for up to a year.
        </li>
        <li>
          <strong>sc_sid</strong> and <strong>sc_route</strong>: a code for this visit and the kind of
          page you are on. They are deleted when you close your browser.
        </li>
        <li>
          <strong>sc_analytics</strong>: remembers if you turned analytics off.
        </li>
      </ul>
      <h3>Turning analytics off</h3>
      <p>
        If your browser sends Do Not Track or Global Privacy Control, we record no analytics from it.
        You can also turn analytics off for this browser here. Signing in or out does not change it.
      </p>
      <AnalyticsChoice />

      <h2>Who we share it with</h2>
      <p>
        We never sell your personal data. We share it only with service providers who help us run
        SydCrest, and only what each one needs:
      </p>
      <ul>
        <li>
          <strong>Supabase</strong> hosts our database and handles sign in.
        </li>
        <li>
          <strong>Vercel</strong> hosts the website and app.
        </li>
        <li>
          <strong>Anthropic</strong> provides the AI behind the AI tutor. The questions you type are
          sent to Anthropic to produce an answer, so please do not include private details in them.
        </li>
        <li>
          <strong>Twilio</strong> sends text messages, only once text reminders are switched on and
          only if you have given us your phone number.
        </li>
        <li>
          <strong>Google</strong>, only if you choose to sign in with Google.
        </li>
      </ul>
      <p>
        Some of these providers store data on servers outside Ghana. We choose providers with strong
        security commitments and we share only what is needed. We may also disclose data where the
        law requires it.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>
          <strong>Account details, date of birth, consent record and progress:</strong> for as long
          as your account is open. When you ask us to delete your account, we delete this data within
          30 days, apart from anything the law requires us to keep.
        </li>
        <li>
          <strong>AI tutor usage counts:</strong> up to 12 months.
        </li>
        <li>
          <strong>Analytics events:</strong> 13 months, then deleted automatically. Daily totals made
          from them, which do not identify anyone, are kept so we can see trends over time.
        </li>
        <li>
          <strong>Backups:</strong> our hosting provider keeps backups for a limited time, after which
          deleted data is gone from them too.
        </li>
        <li>
          <strong>Refused sign ups:</strong> if you are under 18 and try to sign up, we do not save
          your date of birth.
        </li>
      </ul>

      <h2>Your rights</h2>
      <p>Under Act 843 you have the right to:</p>
      <ul>
        <li>
          <strong>Access</strong> the personal data we hold about you and get a copy.
        </li>
        <li>
          <strong>Correct</strong> data that is wrong or out of date. You can change your name,
          region and phone number yourself on your profile page.
        </li>
        <li>
          <strong>Delete</strong> your account and personal data.
        </li>
        <li>
          <strong>Object</strong> to how we use your data, or withdraw your consent.
        </li>
        <li>
          <strong>Stop</strong> marketing messages at any time.
        </li>
        <li>
          <strong>Complain</strong> to the Data Protection Commission of Ghana if you are unhappy with
          how we handle your data.
        </li>
      </ul>
      <p>
        To use any of these rights, contact us at <PrivacyContact />. We may ask you to confirm who
        you are before we act. We aim to reply within 21 days.
      </p>

      <h2>Children</h2>
      <p>
        SydCrest accounts are for people aged 18 and over. We ask for your date of birth when you
        sign up and we refuse accounts for anyone under 18. If we learn that someone under 18 has an
        account, we will close it and delete their data. If you think this has happened, please tell
        us.
      </p>

      <h2>How we protect your data</h2>
      <p>
        Data travels between your device and SydCrest over encrypted connections. Access to our
        database is limited by rules that only let each person see their own private data, and only
        a small number of SydCrest staff can reach it, for running the service.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        When we change this policy we will update the version and date at the top. If a change
        affects how we use your data in an important way, we will tell you and, where needed, ask
        for your agreement again.
      </p>

      <h2>Contact us</h2>
      <p>
        For any question about your data or this policy, email <PrivacyContact />. You can also read
        our <Link href="/terms">Terms</Link>.
      </p>
    </LegalDocument>
  );
}
