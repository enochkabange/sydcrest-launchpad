// Stat: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Counts from the database (illustrative here)", h('div', { className: 'grid grid-cols-2 gap-4' }, h(S.Stat, { value: '26', label: 'Tracks with a roadmap' }), h(S.Stat, { value: '5', label: 'Northern capitals planned for chapters' }))],
];

/** Counts from the database (illustrative here) */
export const CountsFromTheDatabaseIllustrativeHere = () => <>{states[0][1]}</>;
