// PlannedCard: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Starting first", h('ul', null, h(S.PlannedCard, { city: 'Tamale', regionLabel: 'Northern', first: true }))],
  ["Planned", h('ul', null, h(S.PlannedCard, { city: 'Wa', regionLabel: 'Upper West', first: false }))],
];

/** Starting first */
export const StartingFirst = () => <>{states[0][1]}</>;
/** Planned */
export const Planned = () => <>{states[1][1]}</>;
