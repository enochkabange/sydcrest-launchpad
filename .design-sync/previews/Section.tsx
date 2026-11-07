// Section: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var grid = h(S.SectionGrid, { cols: 3 }, h(S.Card, { title: 'Learn' }, 'Topic by topic.'), h(S.Card, { title: 'Practise' }, 'Little data needed.'), h(S.Card, { title: 'Prove it' }, 'Verified skills.'));

const states: Array<[string, React.ReactNode]> = [
  ["Stacked, sunken", h(S.Section, { title: 'How the programme works', intro: 'Twelve weeks, a mentor and a cohort beside you.', tone: 'sunken' }, grid)],
  ["Split", h(S.Section, { title: 'Built in Northern Ghana', intro: 'For learners in Tamale, Bolgatanga, Wa, Damongo and Nalerigu, and anyone online.', layout: 'split' }, h('p', { className: 'text-body text-content-2' }, 'Content sits in the right column from lg.'))],
];

/** Stacked, sunken */
export const StackedSunken = () => <>{states[0][1]}</>;
/** Split */
export const Split = () => <>{states[1][1]}</>;
