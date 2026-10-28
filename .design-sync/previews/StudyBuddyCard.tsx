// StudyBuddyCard: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Shell with body", h(S.StudyBuddyCard, { aside: h(S.Button, { variant: 'ghost' }, 'New chat') }, h('p', { className: 'text-content-2' }, 'Ask about this topic. Study Buddy helps you think it through one question at a time.'))],
  ["Loading", h(S.StudyBuddyCard, null, h('div', { className: 'h-24 animate-skeleton rounded-md bg-surface-sunken' }))],
];

/** Shell with body */
export const ShellWithBody = () => <>{states[0][1]}</>;
/** Loading */
export const Loading = () => <>{states[1][1]}</>;
