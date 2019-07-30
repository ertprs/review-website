import React from "react";
import { useAmp } from "next/amp";

//using :global() inside the styled jsx css for retaining styles
const AmpLinkWrapper = props => {
  return !useAmp() ? (
    <>
      <a href={props.href} alt={props.alt} style={{ ...props.styles }}>
        {props.children}
      </a>
    </>
  ) : (
    <a href={`${props.href}?amp=1`} style={{ ...props.styles }}>
      {props.children}
    </a>
  );
};

export default AmpLinkWrapper;
