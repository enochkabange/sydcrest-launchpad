// Celebration: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Topic passed, next topic", h(S.Celebration, { heading: 'You passed with 100%', roadmapTitle: 'Data analysis', unlocked: { node: true, roadmap: false }, next: { href: '#', title: 'Pivot tables' } })],
  ["Roadmap complete", h(S.Celebration, { heading: 'You passed with 80%', roadmapTitle: 'Data analysis', unlocked: { node: true, roadmap: true }, next: null })],
  ["Marked done by hand", h(S.Celebration, { heading: 'Marked as done', roadmapTitle: 'Data analysis', note: 'This topic has no quiz yet, so it counts once you mark it done.', next: { href: '#', title: 'Charts that answer a question' } })],
];

/** Topic passed, next topic */
export const TopicPassedNextTopic = () => <>{states[0][1]}</>;
/** Roadmap complete */
export const RoadmapComplete = () => <>{states[1][1]}</>;
/** Marked done by hand */
export const MarkedDoneByHand = () => <>{states[2][1]}</>;
