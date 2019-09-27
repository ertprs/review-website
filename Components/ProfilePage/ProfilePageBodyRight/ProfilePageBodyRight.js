import React, { Component } from "react";
import Card from "../../MaterialComponents/Card";
import NewAnalysisCard from "../../Widgets/NewAnalysisCard/NewAnalysisCard";
import { profilePageBodyRightStyles } from "./profilePageBodyRightStyles";
import { trafficIcons } from "../../../utility/constants/trafficReportsConstants";
import uuid from 'uuid/v1';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { SocialMediaPlaceholder, TrafficReportsPlaceholder, AnalysisReportsPlaceholder } from './Placeholders';


class ProfilePageBodyRight extends Component {

  renderAnalysisCards = (data) => {
    let output = [];
    if (Object.keys(data).length > 0) {
      for (let item in data) {
        if (data[item] !== "") {
          output = [
            ...output,
            <NewAnalysisCard key={uuid()}
              analysisTitle={item.split("_").join(" ")}
              analysisInfo={data[item]}
            />
          ];
        }
      }
    }
    return output;
  };

  renderAnalyzeReports = (data) => {
    const analyzeReports = this.props.analyzeReports;
    // const analysisData = [
    //   { analysisTitle: "Registration Date", analysisInfo: "1.11.1994" },
    //   { analysisTitle: "Expiration Date", analysisInfo: "31.10.2024" },
    //   { analysisTitle: "Connection Safety", analysisInfo: "Secure" },
    //   { analysisTitle: "Organization Check", analysisInfo: "Not Validated" },
    //   { analysisTitle: "Etherscam DB", analysisInfo: "Nothing found" },
    //   { analysisTitle: "Phishtank Status", analysisInfo: "Nothing Found" },
    //   { analysisTitle: "Trustworthiness", analysisInfo: "4.7" },
    //   { analysisTitle: "Index Page Analysis", analysisInfo: "Exists" },
    //   { analysisTitle: "Redirect Count", analysisInfo: "0" }
    // ];
    return (
      <div>
        <style jsx>{profilePageBodyRightStyles}</style>
        <Card>
          <div className="analyzeCardHeader">
            <h5 style={{ textAlign: "left", marginLeft: "15px" }} className="analyzeCardHeading">
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
                {/* {analysisData.map(item => {
                  return (
                    <NewAnalysisCard
                      analysisInfo={item.analysisInfo}
                      analysisTitle={item.analysisTitle}
                    />
                  );
                })} */}
                {this.renderAnalysisCards(data)}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  renderTrafficAnalysisCards = (data) => {
    let output = [];
    if (Object.keys(data).length > 0) {
      for (let item in data) {
        if (data[item] !== "") {
          output = [
            ...output,
            <NewAnalysisCard key={uuid()}
              analysisTitle={item.split("_").join(" ")}
              analysisInfo={data[item]}
              analysisIcon={trafficIcons[item].name}
            />
          ];
        }
      }
    }
    return output;
  };

  renderSocialMediaCards = (data) => {
    return data.map(item => {
      return <NewAnalysisCard key={uuid()}
        analysisTitle={item.name}
        analysisInfo={item.followers}
        analysisIcon={item.icon}
      />;
    });
  };

  renderTrafficAnalysisReports = (data) => {
    const analysisData = [
      {
        analysisTitle: "Daily Unique Visitors",
        analysisInfo: "1,017,574,672",
        analysisIcon: "pie-chart"
      },
      {
        analysisTitle: "Monthly Unique Visitors",
        analysisInfo: "30,527,240,160",
        analysisIcon: "calendar"
      },
      {
        analysisTitle: "Pages Per Visit",
        analysisInfo: "13.51",
        analysisIcon: "bullseye"
      },
      {
        analysisTitle: "Bounce Rate",
        analysisInfo: "27.38%",
        analysisIcon: "chain-broken"
      },
      {
        analysisTitle: "Daily Pageviews",
        analysisInfo: "2,147,483,647",
        analysisIcon: "eye"
      },
      {
        analysisTitle: "Alexa Pageviews",
        analysisInfo: "1",
        analysisIcon: "bolt"
      }
    ];
    return (
      <div>
        <style jsx>{profilePageBodyRightStyles}</style>
        <Card>
          <div className="analyzeCardHeader">
            <h5 style={{ textAlign: "left", marginLeft: "15px" }} className="analyzeCardHeading">
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
                {/* {analysisData.map(item => {
                  return (
                    <NewAnalysisCard
                      analysisInfo={item.analysisInfo}
                      analysisTitle={item.analysisTitle}
                      analysisIcon={item.analysisIcon || ""}
                    />
                  );
                })} */}
                {this.renderTrafficAnalysisCards(data)}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  renderSocialMediaReports = (data) => {
    const analysisData = [
      {
        analysisTitle: "Facebook",
        analysisInfo: "27992084",
        analysisIcon: "facebook"
      },
      {
        analysisTitle: "Twitter",
        analysisInfo: "21498343",
        analysisIcon: "twitter"
      },
      {
        analysisTitle: "Instagram",
        analysisInfo: "22598343",
        analysisIcon: "instagram"
      },
      {
        analysisTitle: "Medium",
        analysisInfo: "22612369",
        analysisIcon: "medium"
      }
    ];
    return (
      <div>
        <style jsx>{profilePageBodyRightStyles}</style>
        <Card>
          <div className="analyzeCardHeader">
            <h5 style={{ textAlign: "left", marginLeft: "15px" }} className="analyzeCardHeading">
              <i className="fa fa-area-chart" style={{ marginRight: "7px" }} />
              Social Media Stats
            </h5>
          </div>
          <div className="analyzeCardBody">
            <div className="row">
              <div className="col-md-12">
                {/* <AnalysisCard
                      analysisTitle={reportItem.split("_").join(" ")}
                      analysisInfo={analysisReport[reportItem]}
                    /> */}
                {/* {analysisData.map(item => {
                  return (
                    <NewAnalysisCard
                      analysisInfo={item.analysisInfo}
                      analysisTitle={item.analysisTitle}
                      analysisIcon={item.analysisIcon || ""}
                    />
                  );
                })} */}
                {this.renderSocialMediaCards(data)}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  render() {
    const { domainProfileData, isLoading } = this.props
    const analysisReportsData = (((domainProfileData || {}).analysisReports || {}).data || {})
    const trafficReportsData = (((domainProfileData || {}).trafficReports || {}).data || {})
    const socialMediaStatsData = (((domainProfileData || {}).socialMediaStats || {}).data || {})

    const analysisReportsWillCome = (((domainProfileData || {}).analysisReports || {}).willCome || false)
    const trafficReportsWillCome = (((domainProfileData || {}).trafficReports || {}).willCome || false)
    const socialMediaStatsWillCome = (((domainProfileData || {}).socialMediaStats || {}).willCome || false)

    return (
      <div>
        <style jsx>{profilePageBodyRightStyles}</style>
        {isLoading ? <div>
          <div className="mb-25" style={{ marginTop: "-14px" }}>
            <SocialMediaPlaceholder />
          </div>
          <div className="mb-25" style={{ marginTop: "-50px" }} >
            <TrafficReportsPlaceholder />
          </div>
          <div className="mb-25" style={{ marginTop: "-150px" }} >
            <AnalysisReportsPlaceholder style={{ marginTop: "-150px" }} />
          </div>
        </div> : <div>
            <div className="mb-25">
              {socialMediaStatsWillCome ?
                <div className="mb-25">
                  {this.renderSocialMediaReports(socialMediaStatsData)}
                </div> : null}
            </div>
            <div className="mb-25">
              {trafficReportsWillCome ?
                <div className="mb-25">
                  {this.renderTrafficAnalysisReports(trafficReportsData)}
                </div> : null}
            </div>
            <div className="mb-25">
              {analysisReportsWillCome ?
                <div className="mb-25">
                  {this.renderAnalyzeReports(analysisReportsData)}
                </div> : null}
            </div>
          </div>}
      </div>
      // <div>
      //   <style jsx>{profilePageBodyRightStyles}</style>
      //   {isLoading ? <div className="mb-25" style={{ marginTop: "-14px" }}>
      //     <SocialMediaPlaceholder />
      //   </div> : socialMediaStatsWillCome ?
      //       <div className="mb-25">
      //         {this.renderSocialMediaReports(socialMediaStatsData)}
      //       </div> : null
      //   }
      //   {isLoading ? <div className="mb-25" style={{ marginTop: "-50px" }} >
      //     <TrafficReportsPlaceholder />
      //   </div> : trafficReportsWillCome ?
      //       <div className="mb-25">
      //         {this.renderTrafficAnalysisReports(trafficReportsData)}
      //       </div> : null
      //   }
      //   {
      //     isLoading ? <div className="mb-25" style={{ marginTop: "-150px" }}>
      //       <AnalysisReportsPlaceholder />
      //     </div> : analysisReportsWillCome ?
      //         <div className="mb-25">
      //           {this.renderAnalyzeReports(analysisReportsData)}
      //         </div> : null
      //   }
      // </div>
    );
  }
}

const mapStateToProps = state => {
  const { profileData } = state
  const { domainProfileData, isLoading } = profileData
  return { domainProfileData, isLoading }
}

export default connect(mapStateToProps)(ProfilePageBodyRight);