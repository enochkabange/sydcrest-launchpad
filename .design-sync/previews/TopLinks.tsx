// TopLinks: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["On Earn", h(S.TopLinks, { pathname: '/opportunities' })],
  ["Nothing current", h(S.TopLinks, { pathname: null })],
];

/** On Earn */
export const OnEarn = () => <>{states[0][1]}</>;
/** Nothing current */
export const NothingCurrent = () => <>{states[1][1]}</>;
