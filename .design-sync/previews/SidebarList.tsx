// SidebarList: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var learner = { admin: false, staff: false, expert: false, business: false }, all = { admin: true, staff: true, expert: true, business: true };

const states: Array<[string, React.ReactNode]> = [
  ["Learner, on Your path", h('div', { className: 'w-60' }, h(S.SidebarList, { roles: learner, pathname: '/path' }))],
  ["Every role, on Bookings", h('div', { className: 'w-60' }, h(S.SidebarList, { roles: all, pathname: '/bookings' }))],
];

/** Learner, on Your path */
export const LearnerOnYourPath = () => <>{states[0][1]}</>;
/** Every role, on Bookings */
export const EveryRoleOnBookings = () => <>{states[1][1]}</>;
