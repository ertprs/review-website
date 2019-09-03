import React from "react";
import { solutionForCompaniesStyles } from "./solutionForCompaniesListStyles";
const SolutionForCompaniesList = ({ item }) => {
  return (
    <div className="businessSolutionSteps">
      <style jsx>{solutionForCompaniesStyles}</style>
      <div className="businessSolutionStepCountContainer">
        <div className="businessSolutionStepCount">{item.stepCount}</div>
      </div>
      <div className="businessSolutionStepDetails">
        <div className="businessSolutionStepHeader">
          <h6>{item.stepTitle}</h6>
        </div>
        <div className="businessSolutionStepSubHeader">
          <p>{item.stepSubTitle}</p>
        </div>
        <div className="businessSolutionStepBody">
          <p>{item.stepBody}</p>
        </div>
        <div className="businessSolutionStepImage">
          <div className="businessSolutionStepImageContainer">
            <img src={`/static/business/index/images/${item.stepImage}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionForCompaniesList;
