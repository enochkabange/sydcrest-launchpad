// StatTile: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["On a profile", h('dl', { className: 'grid grid-cols-3 gap-3' }, h(S.StatTile, { label: 'Topics passed', value: 14 }), h(S.StatTile, { label: 'Day streak', value: 4 }), h(S.StatTile, { label: 'Verified skills', value: 2 }))],
  ["Nothing yet", h('dl', { className: 'grid grid-cols-3 gap-3' }, h(S.StatTile, { label: 'Topics passed', value: 0 }))],
];

/** On a profile */
export const OnAProfile = () => <>{states[0][1]}</>;
/** Nothing yet */
export const NothingYet = () => <>{states[1][1]}</>;
