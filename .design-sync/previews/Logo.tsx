// Logo: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Ink, on surface", h('div', { className: 'flex flex-wrap items-center gap-8' }, h(S.Logo, { size: 48 }), h(S.Logo, { size: 32 }))],
  ["Inverse, on Sea Blue", h('div', { className: 'rounded-lg bg-sea-blue p-6' }, h(S.Logo, { size: 48, tone: 'inverse' }))],
];

/** Ink, on surface */
export const InkOnSurface = () => <>{states[0][1]}</>;
/** Inverse, on Sea Blue */
export const InverseOnSeaBlue = () => <>{states[1][1]}</>;
