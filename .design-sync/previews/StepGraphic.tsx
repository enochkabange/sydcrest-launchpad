// StepGraphic: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Steps 0 to 3", h('div', { className: 'flex gap-6' }, [0, 1, 2, 3].map(function (i) { return h(S.StepGraphic, { key: i, index: i }); }))],
];

/** Steps 0 to 3 */
export const Steps0To3 = () => <>{states[0][1]}</>;
