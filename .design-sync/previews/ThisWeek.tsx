// ThisWeek: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var ago = function (h) { return new Date(Date.now() - h * 3600e3).toISOString(); }; var inDays = function (d, hr) { var x = new Date(); x.setDate(x.getDate() + d); x.setHours(hr || 10, 0, 0, 0); return x.toISOString(); }; var today = new Date().toISOString().slice(0, 10);
var loop = function (o) { return Object.assign({ daily: { days: 0, activeToday: false, restDaysLeft: 2 }, weekly: { target: null, done: 0, met: false, weeksInARow: 0 }, reviewedToday: false, reviewQuestions: 0 }, o); };
function TW(p) { window.SydCrestPreview = { learningLoop: p.data }; return S.ThisWeek(); }
var tw = function (data) { return h(TW, { data: data }); };

const states: Array<[string, React.ReactNode]> = [
  ["New learner, no goal", tw(loop())],
  ["Partway through the week", tw(loop({ daily: { days: 4, activeToday: false, restDaysLeft: 1 }, weekly: { target: 3, done: 2, met: false, weeksInARow: 1 }, reviewQuestions: 9 }))],
  ["Goal met, reviewed today", tw(loop({ daily: { days: 12, activeToday: true, restDaysLeft: 2 }, weekly: { target: 3, done: 3, met: true, weeksInARow: 3 }, reviewedToday: true, reviewQuestions: 14 }))],
];

/** New learner, no goal */
export const NewLearnerNoGoal = () => <>{states[0][1]}</>;
/** Partway through the week */
export const PartwayThroughTheWeek = () => <>{states[1][1]}</>;
/** Goal met, reviewed today */
export const GoalMetReviewedToday = () => <>{states[2][1]}</>;
