// PersonAvatar: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["sm and md", h('div', { className: 'flex items-end gap-4' }, h(S.PersonAvatar, { name: 'Issahaku Bawa', avatarUrl: null }), h(S.PersonAvatar, { name: 'Hawa Iddrisu', avatarUrl: null, size: 'md' }))],
];

/** sm and md */
export const SmAndMd = () => <>{states[0][1]}</>;
