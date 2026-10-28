// TopicSummary: a topic's title block, on its own page (h1) and in the side panel (h2).
import * as React from "react";
import { TopicSummary } from "sydcrest-launchpad";
import { visitorView } from "./_roadmap";

const foundations = visitorView.sections[0];
const fieldData = visitorView.sections[2];

/** Topic page (h1) */
export const PageH1 = () => (
  <TopicSummary node={foundations.topics[0]} section={foundations} sectionCount={visitorView.sections.length} headingLevel={1} />
);
/** Side panel (h2) */
export const PanelH2 = () => (
  <TopicSummary node={fieldData.topics[1]} section={fieldData} sectionCount={visitorView.sections.length} headingLevel={2} />
);
