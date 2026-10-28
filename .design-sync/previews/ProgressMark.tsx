// ProgressMark: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var row = h('div', { className: 'flex flex-col gap-2' }, ['done', 'in_progress', 'not_started'].map(function (s) { return h('div', { key: s, className: 'flex items-center gap-2 text-sm text-content-2' }, h(S.ProgressMark, { status: s }), s.replace('_', ' ')); }));

const states: Array<[string, React.ReactNode]> = [
  ["All three", row],
];

/** All three */
export const AllThree = () => <>{states[0][1]}</>;
