import React, { Component } from "react";
import { newAnalysisCardStyles } from "./newAnalysisCardStyles";

export default class NewAnalysisCard extends Component {
  render() {
    const { analysisTitle, analysisInfo, analysisIcon } = this.props;
    return (
      <div
        className="cardContainer"
      >
        <style jsx>{newAnalysisCardStyles}</style>
        <div className="cardLeftItem">
          {analysisIcon!==undefined ? <span style={{ marginRight: "5px" }}>
            <i className={`fa fa-${analysisIcon}`}></i>
          </span>: null}
          {analysisTitle}{" "}
        </div>
        <div className="cardItemRight">{analysisInfo}</div>
      </div>
    );
  }
}
