// WhereAndWhen: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var ago = function (h) { return new Date(Date.now() - h * 3600e3).toISOString(); }; var inDays = function (d, hr) { var x = new Date(); x.setDate(x.getDate() + d); x.setHours(hr || 10, 0, 0, 0); return x.toISOString(); }; var today = new Date().toISOString().slice(0, 10);
var op = function (o) { return Object.assign({ id: 'o1', slug: 'data-entry-intern', kind: 'internship', title: 'Data entry intern', summary: 'Help a health NGO digitise field survey forms. Training provided.', description: '', organisation_name: 'Northern Health Outreach', apply_url: '#', apply_instructions: null, location: 'Tamale', region: 'northern', is_remote: false, deadline: inDays(12).slice(0, 10), eligibility: null, fields: [], skills: ['Excel'], tracks: ['data'], compensation_note: null, published_at: ago(48), updated_at: ago(48) }, o); };

const states: Array<[string, React.ReactNode]> = [
  ["In person with a deadline", h(S.WhereAndWhen, { o: op(), today: today })],
  ["Remote, rolling", h(S.WhereAndWhen, { o: op({ is_remote: true, location: null, deadline: null }), today: today })],
];

/** In person with a deadline */
export const InPersonWithADeadline = () => <>{states[0][1]}</>;
/** Remote, rolling */
export const RemoteRolling = () => <>{states[1][1]}</>;
