import React from "react";
import Loader from "../Widgets/Loader/Loader";
import Img from "react-image";

const AmpImgWrapper = props => {
  return (
    !props.useImgLoader ? (
      <img
        src={props.src}
        alt={props.alt}
        className={props.classes}
        style={{ ...props.style }}
      />
    ) : (
      <Img
        src={props.src}
        style={{ ...props.style }}
        loader={<Loader styles={{ ...props.loaderStyles }} />}
      />
    )
  )
};

export default AmpImgWrapper;
