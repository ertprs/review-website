import React, { Component } from "react";
import Card from "../../MaterialComponents/Card";
import NewAnalysisCard from "../../Widgets/NewAnalysisCard/NewAnalysisCard";
import { profilePageBodyRightStyles } from "./profilePageBodyRightStyles";

export default class ProfilePageBodyRight extends Component {
  renderAnalyzeReports = () => {
    const analysisData = [
      { analysisTitle: "Registration Date", analysisInfo: "1.11.1994" },
      { analysisTitle: "Expiration Date", analysisInfo: "31.10.2024" },
      { analysisTitle: "Connection Safety", analysisInfo: "Secure" },
      { analysisTitle: "Organization Check", analysisInfo: "Not Validated" },
      { analysisTitle: "Etherscam DB", analysisInfo: "Nothing found" },
      { analysisTitle: "Phishtank Status", analysisInfo: "Nothing Found" },
      { analysisTitle: "Trustworthiness", analysisInfo: "4.7" },
      { analysisTitle: "Index Page Analysis", analysisInfo: "Exists" },
      { analysisTitle: "Redirect Count", analysisInfo: "0" }
    ];
    return (
      <div>
        <style jsx>{profilePageBodyRightStyles}</style>
        <Card>
          <div className="analyzeCardHeader">
            <h5>
              <i className="fa fa-bar-chart analyzeCardHeaderIcon" />
              Analyze Reports
            </h5>
          </div>
          <div className="analyzeCardBody">
            <div className="row">
              <div className="col-md-12">
                {/* <AnalysisCard
                  analysisTitle={reportItem.split("_").join(" ")}
                  analysisInfo={analysisReport[reportItem]}
                /> */}
                {analysisData.map(item => {
                  return (
                    <NewAnalysisCard
                      analysisInfo={item.analysisInfo}
                      analysisTitle={item.analysisTitle}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  renderTrafficAnalysisReports = () => {
    const analysisData = [
      { analysisTitle: "Daily Unique Visitors", analysisInfo: "1,017,574,672", analysisIcon:"pie-chart" },
      { analysisTitle: "Monthly Unique Visitors", analysisInfo: "30,527,240,160", analysisIcon:"calendar"},
      { analysisTitle: "Pages Per Visit", analysisInfo: "13.51", analysisIcon:"bullseye" },
      { analysisTitle: "Bounce Rate", analysisInfo: "27.38%", analysisIcon:"chain-broken" },
      { analysisTitle: "Daily Pageviews", analysisInfo: "2,147,483,647", analysisIcon:"eye" },
      { analysisTitle: "Alexa Pageviews", analysisInfo: "1", analysisIcon:"bolt" }
    ];
    return (
      <div>
        <style jsx>{profilePageBodyRightStyles}</style>
        <Card>
          <div className="analyzeCardHeader">
            <h5>
              <i className="fa fa-line-chart analyzeCardHeaderIcon" />
              Traffic Reports
            </h5>
          </div>
          <div className="analyzeCardBody">
            <div className="row">
              <div className="col-md-12">
                {/* <AnalysisCard
                      analysisTitle={reportItem.split("_").join(" ")}
                      analysisInfo={analysisReport[reportItem]}
                    /> */}
                {analysisData.map(item => {
                  return (
                    <NewAnalysisCard
                      analysisInfo={item.analysisInfo}
                      analysisTitle={item.analysisTitle}
                      analysisIcon={item.analysisIcon || ""}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  render() {
    return (
      <div>
        <div style={{marginBottom:"25px"}}>{this.renderAnalyzeReports()}</div>
        {this.renderTrafficAnalysisReports()}
      </div>
    );
  }
}
