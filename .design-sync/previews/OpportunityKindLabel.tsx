// OpportunityKindLabel: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var row = h('div', { className: 'flex flex-wrap gap-2' }, ['job', 'internship', 'scholarship', 'grant', 'gig'].map(function (k) { return h(S.OpportunityKindLabel, { key: k, kind: k }); }));

const states: Array<[string, React.ReactNode]> = [
  ["Every kind", row],
];

/** Every kind */
export const EveryKind = () => <>{states[0][1]}</>;
