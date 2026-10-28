import Link from "@/components/ui/link";
import { Card, PageHeader, Section } from "@/components/marketing/section";
import { SectionGrid } from "@/components/ui/layout";
import { CONTACT_EMAIL } from "@/content/marketing";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  og: "about",
  title: "Accessibility",
  description:
    "What SydCrest Launchpad does to be usable by everyone, what is not right yet, and how to tell us about a problem.",
  path: "/accessibility",
});

/** Written for this page (issue #204). Update it whenever support changes; never claim more than we test. */
const ACCESSIBILITY_UPDATED = "28 October 2026";

const REPORT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Accessibility problem")}`;

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Accessibility"
        title="Built to be usable by everyone"
        lead={
          <p>
            SydCrest should work for you whatever your eyesight, your hands, your screen or your data bundle. This
            page says what we do today, what is not right yet, and how to tell us when something gets in your way.
          </p>
        }
      />

      <Section tone="sunken" title="Settings you can change" intro={<p>Open <Link href="/settings">Settings</Link> from the You menu, or from this link if you are not signed in. Every choice applies straight away.</p>}>
        <SectionGrid cols={3}>
          <Card title="Light or dark">
            <p>Follow your device, or pick light or dark. The moon and sun button at the top of every page switches in one tap.</p>
          </Card>
          <Card title="Bigger text">
            <p>Text at 100, 112, 125 or 150 percent. Spacing grows with it and pages rearrange to fit a small screen.</p>
          </Card>
          <Card title="Higher contrast">
            <p>Darker text and stronger borders in light theme, brighter text and borders in dark.</p>
          </Card>
          <Card title="Underlined links">
            <p>Underline every link, so you never have to rely on colour to find one.</p>
          </Card>
          <Card title="Easier reading">
            <p>More space between lines, letters and words, and a plainer font that uses your device&apos;s own letters.</p>
          </Card>
          <Card title="Less motion">
            <p>We follow your device&apos;s reduce motion setting, and you can also turn animations off here.</p>
          </Card>
        </SectionGrid>
        <p className="mt-6 max-w-reading text-body text-content-2">
          Your choices are saved on the device you use. When you are signed in they are also saved on your account and
          follow you to other devices.
        </p>
      </Section>

      <Section layout="split" title="What we do on every page">
        <ul className="flex max-w-reading list-disc flex-col gap-3 pl-5 text-body text-content-2">
          <li>Aim for the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.</li>
          <li>Check that text colours meet the WCAG contrast ratio in both themes; we measure them, we do not guess.</li>
          <li>Show a clear focus outline, so you can use the site with a keyboard.</li>
          <li>Make buttons and menu items at least 44 pixels tall, so they are easy to tap.</li>
          <li>Use real headings, labels and form errors that screen readers announce.</li>
          <li>Keep pages light, and use less data when your browser asks to save data.</li>
          <li>Run automated accessibility checks on key pages, in light and dark, before each change goes live.</li>
          <li>Offer every roadmap as a list as well as a map, so the same topics can be read as plain text.</li>
        </ul>
      </Section>

      <Section tone="sunken" layout="split" title="What is not right yet">
        <ul className="flex max-w-reading list-disc flex-col gap-3 pl-5 text-body text-content-2">
          <li>No independent accessibility audit has been done yet. Our checks are our own, and automated checks miss things.</li>
          <li>We have not tested every screen with every screen reader. Tell us when one does not make sense.</li>
          <li>Some lessons link to videos and pages on other websites. We cannot promise those have captions or work well with a screen reader.</li>
          <li>Share cards (the pictures that show when you share a link) keep one fixed design and do not follow your settings.</li>
          <li>Choosing your device&apos;s font stops us using ours, but the browser may still fetch our font file once in the background.</li>
        </ul>
      </Section>

      <Section layout="split" title="Tell us about a problem">
        <div className="flex max-w-reading flex-col gap-4 text-body text-content-2">
          <p>
            If something is hard to use, email <a href={REPORT_MAILTO}>{CONTACT_EMAIL}</a> with the subject
            &ldquo;Accessibility problem&rdquo;. Tell us the page, what you were trying to do and what got in the way.
            If you use a screen reader, magnifier or other tool, say which one.
          </p>
          <p>
            A person reads every message and replies. Where we can, we will help you finish what you were doing
            while we fix the problem.
          </p>
          <p className="text-sm text-content-3">This statement was last reviewed on {ACCESSIBILITY_UPDATED}.</p>
        </div>
      </Section>
    </>
  );
}
