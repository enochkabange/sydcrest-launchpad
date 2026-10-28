// RecordingCard: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var ago = function (h) { return new Date(Date.now() - h * 3600e3).toISOString(); }; var inDays = function (d, hr) { var x = new Date(); x.setDate(x.getDate() + d); x.setHours(hr || 10, 0, 0, 0); return x.toISOString(); }; var today = new Date().toISOString().slice(0, 10);
var rec = { id: 'v1', title: 'LinkedIn for your first job', summary: 'How to write a headline, what to put in About when you have little experience, and how to ask for a recommendation.', video_url: 'https://example.org/video', duration_minutes: 58, created_at: ago(100), event: { slug: 'linkedin-for-first-jobs', title: 'LinkedIn for your first job', kind: 'webinar', starts_at: inDays(-6, 18) } };

const states: Array<[string, React.ReactNode]> = [
  ["From an event", h(S.RecordingCard, { recording: rec })],
  ["On its event page", h(S.RecordingCard, { recording: Object.assign({}, rec, { summary: null, duration_minutes: null }), showEvent: false })],
];

/** From an event */
export const FromAnEvent = () => <>{states[0][1]}</>;
/** On its event page */
export const OnItsEventPage = () => <>{states[1][1]}</>;
