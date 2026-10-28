// Button: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var row = function (d) { return h('div', { className: 'flex flex-wrap gap-3' }, h(S.Button, { disabled: d }, 'Start a 5 minute review'), h(S.Button, { variant: 'secondary', disabled: d }, 'Find a topic to pass'), h(S.Button, { variant: 'ghost', disabled: d }, 'Mark read')); };

const states: Array<[string, React.ReactNode]> = [
  ["Variants", row(false)],
  ["Disabled", row(true)],
];

/** Variants */
export const Variants = () => <>{states[0][1]}</>;
/** Disabled */
export const Disabled = () => <>{states[1][1]}</>;
