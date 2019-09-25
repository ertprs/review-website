import React, { Component } from "react";
import {newAnalysisCardStyles} from './newAnalysisCardStyles';

export default class NewAnalysisCard extends Component {
  render() {
    const { analysisTitle, analysisInfo, analysisIcon } = this.props;
    return (
      <div
        style={{
          display: "flex",
          textAlign: "left",
          padding: "15px",
          borderBottom: "1px solid #f1f1f1",
          textTransform:"capitalize"
        }}
      >
          {<style jsx>{newAnalysisCardStyles}</style>}
        <div style={{ flex: "1", textAlign:"left", fontWeight:"bold" }}><span style={{marginRight:"5px"}}><i className={`fa fa-${analysisIcon}`}></i></span>{analysisTitle} </div>
        <div style={{ flex: "1", textAlign:"right" }}>{analysisInfo}</div>
      </div>
    );
  }
}
