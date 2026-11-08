// SectionAccent: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Above a heading", h('div', null, h(S.SectionAccent), h('h2', { className: 'mt-3 text-h2 text-content' }, 'Data analysis'))],
];

/** Above a heading */
export const AboveAHeading = () => <>{states[0][1]}</>;
