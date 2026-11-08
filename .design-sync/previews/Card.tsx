// Card: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Title and body", h(S.Card, { title: 'Learn with people beside you' }, 'Chapters meet in person and the community feed keeps you going between sessions.')],
  ["With eyebrow", h(S.Card, { title: 'Pass the assessment', eyebrow: h('p', { className: 'text-xs font-bold tracking-widest text-content-3 uppercase' }, 'Way 2') }, 'Already have the skill? Take the assessment.')],
];

/** Title and body */
export const TitleAndBody = () => <>{states[0][1]}</>;
/** With eyebrow */
export const WithEyebrow = () => <>{states[1][1]}</>;
