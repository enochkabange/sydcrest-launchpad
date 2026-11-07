// BriefKindPill: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Both kinds", h('div', { className: 'flex gap-2' }, h(S.BriefKindPill, { kind: 'advice' }), h(S.BriefKindPill, { kind: 'job' }))],
];

/** Both kinds */
export const BothKinds = () => <>{states[0][1]}</>;
