import { ArrowLeft } from "lucide-react";
import { CurriculumWeeks } from "@/components/marketing/curriculum-weeks";
import { PageHeader } from "@/components/marketing/section";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import Link from "@/components/ui/link";
import { PILOT } from "@/content/marketing";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  og: "programme",
  title: "The full curriculum",
  description: `Every week of the ${PILOT.weeks} week Delta Mentoring Program: what you learn, the SydCrest lessons, the assignment and free official resources for extra practice.`,
  path: "/programme/curriculum",
});

/** The full week by week outline (issue #239), moved off /programme so that page stays short. Static. */
export default function CurriculumPage() {
  return (
    <>
      <PageHeader
        eyebrow="Delta Mentoring Program"
        title="The full curriculum"
        lead={
          <>
            <p>
              Week by week: what you will be able to do, the SydCrest lessons that teach it, the assignment your
              mentor reviews, and free resources from the official providers for extra practice.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/programme#apply" className={buttonClasses("primary")}>
                Apply for a seat
              </Link>
              <Link href="/programme" className={buttonClasses("secondary")}>
                <ArrowLeft aria-hidden="true" className="size-4" />
                Programme overview
              </Link>
            </div>
          </>
        }
      />
      <Container className="pb-16 xl:pb-24">
        <CurriculumWeeks />
      </Container>
    </>
  );
}
