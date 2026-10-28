// NotificationList: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var ago = function (h) { return new Date(Date.now() - h * 3600e3).toISOString(); }; var inDays = function (d, hr) { var x = new Date(); x.setDate(x.getDate() + d); x.setHours(hr || 10, 0, 0, 0); return x.toISOString(); }; var today = new Date().toISOString().slice(0, 10);
var it = function (o) { return Object.assign({ id: Math.random().toString(36).slice(2), kind: 'reply', title: 'Issahaku replied to your post', body: 'Same here. Writing it out on paper first saved me a lot of errors.', href: '#', icon: 'reply', createdAt: ago(1), read: false }, o); };

const states: Array<[string, React.ReactNode]> = [
  ["All caught up", h(S.NotificationList, { items: [], unread: 0, now: new Date() })],
  ["Mixed", h(S.NotificationList, { items: [it(), it({ icon: 'booking', kind: 'booking', title: 'Fuseini accepted your booking', body: 'Thursday at 4pm, 30 minutes on Google Meet.', createdAt: ago(5) }), it({ icon: 'skill', kind: 'skill', title: 'You earned a verified skill: Spreadsheets', body: null, createdAt: ago(30), read: true }), it({ icon: 'event-cancelled', kind: 'event', title: 'Canva for small businesses was cancelled', body: 'The organisers will share a new date.', createdAt: ago(60), read: true })], unread: 2, now: new Date() })],
];

/** All caught up */
export const AllCaughtUp = () => <>{states[0][1]}</>;
/** Mixed */
export const Mixed = () => <>{states[1][1]}</>;
