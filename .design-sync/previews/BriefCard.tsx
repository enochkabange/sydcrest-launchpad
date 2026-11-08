// BriefCard: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var ago = function (h) { return new Date(Date.now() - h * 3600e3).toISOString(); }; var inDays = function (d, hr) { var x = new Date(); x.setDate(x.getDate() + d); x.setHours(hr || 10, 0, 0, 0); return x.toISOString(); }; var today = new Date().toISOString().slice(0, 10);
var br = function (o) { return Object.assign({ id: 'b1', kind: 'advice', status: 'open', title: 'Review my stock spreadsheet for a Tamale provision shop', description: 'I track 40 items and the totals keep breaking when I add rows. I want someone to look at the formulas and show me a better layout.', skills: ['Excel', 'Google Sheets'], categories: [], created_at: ago(30), can_manage: false, my_pitch_status: null, deadline: null, indicative_budget_ghs: null, is_remote: true, location: null, organisation_id: null, organisation_logo: null, organisation_name: null, organisation_slug: null, organisation_verified: null, pitch_count: 0, poster_avatar: null, poster_id: 'u1', poster_name: 'Abdul-Rahman Mahama' }, o); };

const states: Array<[string, React.ReactNode]> = [
  ["Advice from a learner, no pitches yet", h(S.BriefCard, { brief: br() })],
  ["Paid job from a verified organisation, you pitched", h(S.BriefCard, { brief: br({ kind: 'job', title: 'Social media posts for a shea butter cooperative', description: 'Twelve posts for Facebook and WhatsApp status over a month, in English and Dagbani.', skills: ['Canva', 'Copywriting', 'Facebook'], organisation_name: 'Nalerigu Shea Women\'s Cooperative', organisation_verified: true, indicative_budget_ghs: 1200, is_remote: false, location: 'Nalerigu', deadline: inDays(14).slice(0, 10), pitch_count: 4, my_pitch_status: 'submitted' }) })],
];

/** Advice from a learner, no pitches yet */
export const AdviceFromALearnerNoPitchesYet = () => <>{states[0][1]}</>;
/** Paid job from a verified organisation, you pitched */
export const PaidJobFromAVerifiedOrganisationYouPitched = () => <>{states[1][1]}</>;
