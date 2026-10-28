// Container: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var box = function (t, cls) { return h('div', { className: 'rounded-lg border border-line bg-surface-sunken p-4 text-sm text-content-2 ' + (cls || '') }, t); };

const states: Array<[string, React.ReactNode]> = [
  ["page (1280px)", h(S.Container, null, box('Content sits in the page container on every screen.'))],
  ["reading (70ch)", h(S.Container, { width: 'reading' }, box('A lesson explanation reads best near seventy characters a line, so long text never stretches across a laptop screen.'))],
];

/** page (1280px) */
export const Page1280px = () => <>{states[0][1]}</>;
/** reading (70ch) */
export const Reading70ch = () => <>{states[1][1]}</>;
