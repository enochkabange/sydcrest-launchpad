// ShareCertificate: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Issued", h(S.ShareCertificate, { url: 'https://sydcrest.example/verify/SC-7K2Q', title: 'Digital Marketing Programme: Social media', verificationId: 'SC-7K2Q', issuedAt: '2026-09-30T10:00:00Z' })],
];

/** Issued */
export const Issued = () => <>{states[0][1]}</>;
