// OpportunityCard: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var ago = function (h) { return new Date(Date.now() - h * 3600e3).toISOString(); }; var inDays = function (d, hr) { var x = new Date(); x.setDate(x.getDate() + d); x.setHours(hr || 10, 0, 0, 0); return x.toISOString(); }; var today = new Date().toISOString().slice(0, 10);
var op = function (o) { return Object.assign({ id: 'o1', slug: 'data-entry-intern', kind: 'internship', title: 'Data entry intern', summary: 'Help a health NGO digitise field survey forms. Training provided.', description: '', organisation_name: 'Northern Health Outreach', apply_url: '#', apply_instructions: null, location: 'Tamale', region: 'northern', is_remote: false, deadline: inDays(12).slice(0, 10), eligibility: null, fields: [], skills: ['Excel'], tracks: ['data'], compensation_note: null, published_at: ago(48), updated_at: ago(48) }, o); };

const states: Array<[string, React.ReactNode]> = [
  ["Open internship", h(S.OpportunityCard, { o: op(), today: today })],
  ["Remote gig, saved", h(S.OpportunityCard, { o: op({ id: 'o2', slug: 'social-posts', kind: 'gig', title: 'Write social posts for a fashion shop', organisation_name: 'Hawa\'s Kente Corner', summary: null, location: null, is_remote: true, deadline: null }), today: today, status: 'saved' })],
  ["Scholarship, applied", h(S.OpportunityCard, { o: op({ id: 'o3', kind: 'scholarship', title: 'Women in data scholarship', organisation_name: 'Savannah Tech Fund', summary: 'Covers a year of data analysis training and a laptop loan for women in the north.', location: 'Anywhere in Ghana', deadline: inDays(2).slice(0, 10) }), today: today, status: 'applied' })],
];

/** Open internship */
export const OpenInternship = () => <>{states[0][1]}</>;
/** Remote gig, saved */
export const RemoteGigSaved = () => <>{states[1][1]}</>;
/** Scholarship, applied */
export const ScholarshipApplied = () => <>{states[2][1]}</>;
