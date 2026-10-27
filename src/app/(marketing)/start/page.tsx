import { pageMetadata } from "@/lib/page-metadata";
import { Container } from "@/components/ui/layout";
import { StartQuiz } from "./start-quiz";

export const metadata = pageMetadata({
  og: "start",
  title: "Where do I start?",
  description:
    "Answer five quick questions about your interests, level, goal, time and data. Get a starting point, a skill gap readout and a weekly plan that fits your week.",
  path: "/start",
});

export default function StartPage() {
  return (
    <Container className="flex flex-col gap-6 py-10 md:py-16 lg:gap-10 xl:py-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">Where do I start?</h1>
        <p className="max-w-reading text-content-2 lg:text-lead">
          Five quick questions. We match you to a track, a starting point and a weekly plan that fits
          your time, your device and your data.
        </p>
      </div>
      <StartQuiz />
    </Container>
  );
}
