// BriefFacts: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var ago = function (h) { return new Date(Date.now() - h * 3600e3).toISOString(); }; var inDays = function (d, hr) { var x = new Date(); x.setDate(x.getDate() + d); x.setHours(hr || 10, 0, 0, 0); return x.toISOString(); }; var today = new Date().toISOString().slice(0, 10);
var br = function (o) { return Object.assign({ id: 'b1', kind: 'advice', status: 'open', title: 'Review my stock spreadsheet for a Tamale provision shop', description: 'I track 40 items and the totals keep breaking when I add rows. I want someone to look at the formulas and show me a better layout.', skills: ['Excel', 'Google Sheets'], categories: [], created_at: ago(30), can_manage: false, my_pitch_status: null, deadline: null, indicative_budget_ghs: null, is_remote: true, location: null, organisation_id: null, organisation_logo: null, organisation_name: null, organisation_slug: null, organisation_verified: null, pitch_count: 0, poster_avatar: null, poster_id: 'u1', poster_name: 'Abdul-Rahman Mahama' }, o); };

const states: Array<[string, React.ReactNode]> = [
  ["Remote, no pitches", h(S.BriefFacts, { brief: br() })],
  ["Everything set", h(S.BriefFacts, { brief: br({ indicative_budget_ghs: 800, is_remote: true, location: 'Tamale', deadline: inDays(10).slice(0, 10), pitch_count: 2 }) })],
];

/** Remote, no pitches */
export const RemoteNoPitches = () => <>{states[0][1]}</>;
/** Everything set */
export const EverythingSet = () => <>{states[1][1]}</>;
