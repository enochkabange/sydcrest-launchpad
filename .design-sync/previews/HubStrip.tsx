// HubStrip: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Community, on the feed", h(S.HubStrip, { id: 'community', current: '/community' })],
  ["Community, on events", h(S.HubStrip, { id: 'community', current: '/events' })],
];

/** Community, on the feed */
export const CommunityOnTheFeed = () => <>{states[0][1]}</>;
/** Community, on events */
export const CommunityOnEvents = () => <>{states[1][1]}</>;
