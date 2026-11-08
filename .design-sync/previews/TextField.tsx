// TextField: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Empty", h(S.TextField, { id: 'name', label: 'Full name', hint: 'As it should appear on your certificate.', placeholder: 'Wumpini Alhassan' })],
  ["Filled", h(S.TextField, { id: 'phone', label: 'Phone number', defaultValue: '024 123 4567', hint: 'We only use it for session reminders.' })],
  ["Error", h(S.TextField, { id: 'email', label: 'Email', defaultValue: 'mariama@', error: 'Enter a full email address, like name@example.com.' })],
];

/** Empty */
export const Empty = () => <>{states[0][1]}</>;
/** Filled */
export const Filled = () => <>{states[1][1]}</>;
/** Error */
export const Error = () => <>{states[2][1]}</>;
