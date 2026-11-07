// ExpertAvatar: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Initials at three sizes", h('div', { className: 'flex items-end gap-4' }, ['sm', 'md', 'lg'].map(function (s) { return h(S.ExpertAvatar, { key: s, size: s, expert: { name: 'Mariama Seidu', avatarUrl: null } }); }))],
];

/** Initials at three sizes */
export const InitialsAtThreeSizes = () => <>{states[0][1]}</>;
