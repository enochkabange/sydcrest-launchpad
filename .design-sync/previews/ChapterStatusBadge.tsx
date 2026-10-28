// ChapterStatusBadge: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var row = h('div', { className: 'flex flex-wrap gap-2' }, h(S.ChapterStatusBadge, { status: 'active' }), h(S.ChapterStatusBadge, { status: 'launching' }), h(S.ChapterStatusBadge, { status: 'paused' }), h(S.ChapterStatusBadge, { status: 'planned', label: 'Planned' }), h(S.ChapterStatusBadge, { status: 'planned', label: 'Starting first' }));

const states: Array<[string, React.ReactNode]> = [
  ["Every status", row],
];

/** Every status */
export const EveryStatus = () => <>{states[0][1]}</>;
