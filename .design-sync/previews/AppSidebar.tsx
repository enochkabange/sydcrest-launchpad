// AppSidebar: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
window.SydCrestPreview = { pathname: '/roadmaps', viewer: { name: 'Hawa Iddrisu', email: 'hawa@example.com', roles: { admin: false, staff: false, expert: false, business: false }, displayPrefs: null }, unread: 3 };

const states: Array<[string, React.ReactNode]> = [
  ["Learner on Roadmaps", h('div', { className: 'flex h-[680px]' }, h(S.AppSidebar))],
];

/** Learner on Roadmaps */
export const LearnerOnRoadmaps = () => <>{states[0][1]}</>;
