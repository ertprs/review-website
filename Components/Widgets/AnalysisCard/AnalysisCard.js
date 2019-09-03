import React from "react";
import {analysisCardStyles} from './analysisCardStyles';
const AnalysisCard = props => {
  return (
    <>
    <style jsx>
        {analysisCardStyles}
    </style>
    <div className="analysisCard">
      <div>
        <div className="analysisCardTitle">{props.analysisTitle}</div>
      </div>
      <div>
          <div className="analysisCardDate">{props.analysisInfo}</div>
      </div>
    </div>
    </>
  );
};
export default AnalysisCard;
