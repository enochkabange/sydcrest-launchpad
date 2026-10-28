// DateTile: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var ago = function (h) { return new Date(Date.now() - h * 3600e3).toISOString(); }; var inDays = function (d, hr) { var x = new Date(); x.setDate(x.getDate() + d); x.setHours(hr || 10, 0, 0, 0); return x.toISOString(); }; var today = new Date().toISOString().slice(0, 10);

const states: Array<[string, React.ReactNode]> = [
  ["Upcoming and muted", h('div', { className: 'flex gap-4' }, h(S.DateTile, { iso: inDays(3) }), h(S.DateTile, { iso: inDays(-20), muted: true }))],
];

/** Upcoming and muted */
export const UpcomingAndMuted = () => <>{states[0][1]}</>;
