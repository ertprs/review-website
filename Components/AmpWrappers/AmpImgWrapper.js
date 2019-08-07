import React from "react";
import { useAmp } from "next/amp";
import Loader from '../Widgets/Loader/Loader';
import Img from 'react-image';

const AmpImgWrapper = props => {
  return !useAmp() ? (
   !props.useImgLoader ?  <img src={props.src}  alt={props.alt} className={props.classes} style={{...props.style}} /> : <Img
   src={props.src}
   loader={<Loader styles={{...props.loaderStyles}} />}
 />
  ) : (
    <div style={{...props.imgContainerStyles}}>
        <amp-img src={props.src} height={props.height} width={props.width} layout={props.layout} className={props.classes} style={{...props.ampImgStyles}}>
        </amp-img>
    </div>
  );
};

export default AmpImgWrapper;
