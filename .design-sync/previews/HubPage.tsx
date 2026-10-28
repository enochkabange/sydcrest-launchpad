// HubPage: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
window.SydCrestPreview = { pathname: '/roadmaps', viewer: { name: 'Hawa Iddrisu', email: 'hawa@example.com', roles: { admin: false, staff: false, expert: false, business: false }, displayPrefs: null }, unread: 3 };

const states: Array<[string, React.ReactNode]> = [
  ["Learn hub", h(S.HubPage, { id: 'learn' })],
];

/** Learn hub */
export const LearnHub = () => <>{states[0][1]}</>;
