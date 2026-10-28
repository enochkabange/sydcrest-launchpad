// HeroGraphic: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Default", h('div', { className: 'max-w-md' }, h(S.HeroGraphic, { className: 'w-full' }))],
];

/** Default */
export const Default = () => <>{states[0][1]}</>;
