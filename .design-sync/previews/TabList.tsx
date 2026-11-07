// TabList: the bottom tab bar under md. It is position fixed, so the frame below
// (transformed, so it contains fixed children) pins it to the bottom of a phone sized box.
import * as React from "react";
import { TabList } from "sydcrest-launchpad";

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-40 w-full max-w-[390px] overflow-hidden border border-line bg-surface-sunken" style={{ transform: "translateZ(0)" }}>
      <div className="p-4">
        <p className="text-h3 text-content">Data Analyst</p>
        <p className="text-body text-content-2">Section 2 of 8: Spreadsheets for analysis</p>
      </div>
      {children}
    </div>
  );
}

/** On Learn (a roadmap page) */
export const OnLearnARoadmapPage = () => (
  <PhoneFrame>
    <TabList pathname="/roadmaps/data-analyst" />
  </PhoneFrame>
);

/** On Community */
export const OnCommunity = () => (
  <PhoneFrame>
    <TabList pathname="/community" />
  </PhoneFrame>
);
