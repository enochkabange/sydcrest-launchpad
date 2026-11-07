// CheckboxField: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Unchecked", h(S.CheckboxField, { id: 'c1' }, 'Send me a reminder the day before a session')],
  ["Checked", h(S.CheckboxField, { id: 'c2', defaultChecked: true }, 'Show my profile to organisations looking for talent')],
  ["Error", h(S.CheckboxField, { id: 'c3', error: 'You must be 18 or older to join.' }, 'I am 18 or older')],
];

/** Unchecked */
export const Unchecked = () => <>{states[0][1]}</>;
/** Checked */
export const Checked = () => <>{states[1][1]}</>;
/** Error */
export const Error = () => <>{states[2][1]}</>;
