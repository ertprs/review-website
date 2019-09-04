import React from "react";
import Link from "next/link";
import { useAmp } from "next/amp";

//using :global() inside the styled jsx css for retaining styles
const AmpLinkWrapper = props => {
  return !useAmp() ? (
    <>
      <Link href={props.href}>
        <a alt={props.alt} style={{ ...props.styles }}>
          {props.children}
        </a>
      </Link>
    </>
  ) : (
    //?amp=1 append, but also look for sharebtn fix
    <a href={`${props.href}`} style={{ ...props.styles }}>
      {props.children}
    </a>
  );
};

export default AmpLinkWrapper;
