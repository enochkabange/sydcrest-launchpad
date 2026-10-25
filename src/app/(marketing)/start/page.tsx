import type { Metadata } from "next";
import { StartQuiz } from "./start-quiz";

export const metadata: Metadata = {
  title: "Where do I start?",
  description:
    "Answer five quick questions about your interests, level, goal, time and data. Get a starting point, a skill gap readout and a weekly plan that fits your week.",
};

export default function StartPage() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-10 md:py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl text-content md:text-4xl">Where do I start?</h1>
        <p className="text-content-2">
          Five quick questions. We match you to a track, a starting point and a weekly plan that fits
          your time, your device and your data.
        </p>
      </div>
      <StartQuiz />
    </div>
  );
}
