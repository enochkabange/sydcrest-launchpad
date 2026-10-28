// TextAreaField: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Empty", h(S.TextAreaField, { id: 'about', label: 'What do you want help with?', hint: 'A sentence or two is enough.' })],
  ["Filled", h(S.TextAreaField, { id: 'about2', label: 'What do you want help with?', defaultValue: 'I built a stock list for my aunt\'s shop in Tamale and want feedback on the formulas.' })],
  ["Error", h(S.TextAreaField, { id: 'about3', label: 'What do you want help with?', error: 'Write something first.' })],
];

/** Empty */
export const Empty = () => <>{states[0][1]}</>;
/** Filled */
export const Filled = () => <>{states[1][1]}</>;
/** Error */
export const Error = () => <>{states[2][1]}</>;
