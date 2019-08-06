import React from "react";
import * as AmpHelpers from "react-amphtml/helpers";
import { useAmp } from "next/amp";

const renderToolTipBox = children => {
  return (
    <>
      <style jsx>
        {`
          .tooltip {
            position: absolute;
            animation-duration: 0.4s;
            animation-name: fade;
            z-index: 1;
            top: 100%;
            right: 0;
          }
          @keyframes fade {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
      <div className="tooltip">{children}</div>
    </>
  );
};

const ToolTip = ({ children, visible }) => {
  if (useAmp()) {
    return (
      <AmpHelpers.Bind hidden="showAlexaGraph.show">
        {props => (
          <div {...props} hidden={true}>
            {renderToolTipBox(children)}
          </div>
        )}
      </AmpHelpers.Bind>
    );
  }
  return visible ? renderToolTipBox(children) : null;
};

export default ToolTip;
