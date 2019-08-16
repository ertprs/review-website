import React from "react";
import { bigLoaderStyles } from "./bigLoaderStyles";
const BigLoader = props => {
  return (
    <>
      <style jsx>{bigLoaderStyles}</style>
      <div className="signal" style={{...props.styles}}></div>

    </>
  );
};

export default BigLoader;
