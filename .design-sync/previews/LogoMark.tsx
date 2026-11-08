// LogoMark: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["color, auto, mono", h('div', { className: 'flex flex-wrap items-center gap-8' }, h(S.LogoMark, { size: 56, variant: 'color' }), h(S.LogoMark, { size: 56, variant: 'auto' }), h('span', { className: 'text-content' }, h(S.LogoMark, { size: 56, variant: 'mono' })))],
  ["onDark, on ink", h('div', { className: 'flex gap-8 rounded-lg bg-ink p-6' }, h(S.LogoMark, { size: 56, variant: 'onDark' }))],
];

/** color, auto, mono */
export const ColorAutoMono = () => <>{states[0][1]}</>;
/** onDark, on ink */
export const OnDarkOnInk = () => <>{states[1][1]}</>;
