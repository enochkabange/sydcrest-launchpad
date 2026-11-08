// EventCard: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var ago = function (h) { return new Date(Date.now() - h * 3600e3).toISOString(); }; var inDays = function (d, hr) { var x = new Date(); x.setDate(x.getDate() + d); x.setHours(hr || 10, 0, 0, 0); return x.toISOString(); }; var today = new Date().toISOString().slice(0, 10);
var ev = function (o) { return Object.assign({ id: 'e1', slug: 'tamale-budget-sheet-skillshop', kind: 'skillshop', title: 'Build a budget sheet on your phone or laptop', summary: null, format: 'in_person', starts_at: inDays(3, 10), ends_at: inDays(3, 13), venue_name: 'Tamale Central Library', city: 'Tamale', region: 'northern', capacity: 40, status: 'published', updated_at: ago(5), chapter: { slug: 'tamale', name: 'Tamale chapter', city: 'Tamale' }, recording_count: 0 }, o); };

const states: Array<[string, React.ReactNode]> = [
  ["Upcoming, in person", h(S.EventCard, { event: ev() })],
  ["Online webinar with a recording", h(S.EventCard, { event: ev({ id: 'e2', slug: 'linkedin-for-first-jobs', kind: 'webinar', title: 'LinkedIn for your first job', format: 'online', venue_name: null, city: null, chapter: null, starts_at: inDays(-6, 18), ends_at: inDays(-6, 19), recording_count: 1 }), past: true })],
  ["Cancelled", h(S.EventCard, { event: ev({ id: 'e3', status: 'cancelled', format: 'hybrid', title: 'Canva for small businesses' }) })],
];

/** Upcoming, in person */
export const UpcomingInPerson = () => <>{states[0][1]}</>;
/** Online webinar with a recording */
export const OnlineWebinarWithARecording = () => <>{states[1][1]}</>;
/** Cancelled */
export const Cancelled = () => <>{states[2][1]}</>;
