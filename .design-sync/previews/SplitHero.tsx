// SplitHero: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var box = function (t, cls) { return h('div', { className: 'rounded-lg border border-line bg-surface-sunken p-4 text-sm text-content-2 ' + (cls || '') }, t); };
var words = h('div', { className: 'flex flex-col gap-4' }, h('h1', { className: 'text-h1 text-content' }, 'Find your path into tech'), h('p', { className: 'text-lead text-content-2' }, 'Learn with people beside you, and earn from your skills.'), h('div', null, h(S.Button, null, 'Take the path quiz')));

const states: Array<[string, React.ReactNode]> = [
  ["Words and visual", h(S.SplitHero, { visual: h(S.HeroGraphic, { className: 'w-full' }) }, words)],
];

/** Words and visual */
export const WordsAndVisual = () => <>{states[0][1]}</>;
