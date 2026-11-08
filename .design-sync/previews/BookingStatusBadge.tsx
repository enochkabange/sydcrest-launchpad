// BookingStatusBadge: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var row = h('div', { className: 'flex flex-wrap gap-2' }, ['requested', 'accepted', 'completed', 'declined', 'cancelled'].map(function (s) { return h(S.BookingStatusBadge, { key: s, status: s }); }));

const states: Array<[string, React.ReactNode]> = [
  ["Every status", row],
];

/** Every status */
export const EveryStatus = () => <>{states[0][1]}</>;
