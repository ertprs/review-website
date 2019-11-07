import React from "react";
import Link from "next/link";

//using :global() inside the styled jsx css for retaining styles
const AmpLinkWrapper = props => {
  return (
    <>
      <Link href={props.href}>
        <a alt={props.alt} style={{ ...props.styles }}>
          {props.children}
        </a>
      </Link>
    </>
  )
};

export default AmpLinkWrapper;
