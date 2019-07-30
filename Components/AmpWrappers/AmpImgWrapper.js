import React from "react";
import { useAmp } from "next/amp";

const AmpImgWrapper = props => {
  return !useAmp() ? (
    <img src={props.src}  alt={props.alt} className={props.classes} style={{...props.style}} />
  ) : (
    <div style={{...props.imgContainerStyles}}>
        <amp-img src={props.src} height={props.height} width={props.width} layout={props.layout} className={props.classes}>
        </amp-img>
    </div>
  );
};

export default AmpImgWrapper;
