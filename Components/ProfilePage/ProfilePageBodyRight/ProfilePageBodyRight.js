import React, { Component } from "react";
import Card from "../../MaterialComponents/Card";
import NewAnalysisCard from "../../Widgets/NewAnalysisCard/NewAnalysisCard";
import { profilePageBodyRightStyles } from "./profilePageBodyRightStyles";
import { trafficIcons } from "../../../utility/constants/trafficReportsConstants";
import uuid from 'uuid/v1';
import { connect } from 'react-redux';
import { _isEmpty } from 'lodash/isEmpty';
import ContentLoader from 'react-content-loader';
import ClaimYourWebsite from '../ClaimYourWebsite/ClaimYourWebsite';

const MyLoader = () => (
  <ContentLoader
    height={475}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="70" rx="5" ry="5" width="100%" height="100%" />
  </ContentLoader>
)


class ProfilePageBodyRight extends Component {

  renderAnalysisCards = () => {
    let output = [];
    const { domainProfileData } = this.props
    const analysisReports = ((domainProfileData || {}).analysisReports || {}).data || {}
    // const analysisReports = this.props.analysisReports;
    // isLoading ? <MyLoader /> :
    if (Object.keys(analysisReports).length > 0) {
      for (let item in analysisReports) {
        if (analysisReports[item] !== "") {
          output = [
            ...output,
            <NewAnalysisCard key={uuid()}
              analysisTitle={item.split("_").join(" ")}
              analysisInfo={analysisReports[item]}
            />
          ];
        }
      }
    }
    return output;
  };

  renderAnalyzeReports = () => {
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
                {this.renderAnalysisCards()}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  renderTrafficAnalysisCards = () => {
    const { domainProfileData, isLoading } = this.props
    const trafficReports = ((domainProfileData || {}).trafficReports || {}).data || {}
    // const { trafficReports } = this.props;
    console.log(trafficReports, 'trafficReports');
    let output = [];
    if (Object.keys(trafficReports).length > 0) {
      for (let item in trafficReports) {
        if (trafficReports[item] !== "") {
          output = [
            ...output,
            <NewAnalysisCard key={uuid()}
              analysisTitle={item.split("_").join(" ")}
              analysisInfo={trafficReports[item]}
              analysisIcon={trafficIcons[item].name}
            />
          ];
        }
      }
    }
    return output;
  };

  renderSocialMediaCards = () => {
    const { domainProfileData, isLoading } = this.props
    const socialMediaStats = ((domainProfileData || {}).socialMediaStats || {}).data || []
    // const { socialMediaStats } = this.props;
    console.log(socialMediaStats, 'socialMediaStats');
    return socialMediaStats.map(item => {
      return <NewAnalysisCard key={uuid()}
        analysisTitle={item.name}
        analysisInfo={item.followers}
        analysisIcon={item.icon}
      />;
    });
  };

  renderTrafficAnalysisReports = () => {
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
                {this.renderTrafficAnalysisCards()}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  renderSocialMediaReports = () => {
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
                {this.renderSocialMediaCards()}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  render() {
    const socialMediaStats = this.props.socialMediaStats || [];
    const trafficReports = this.props.trafficReports || {};
    const analyzeReports = this.props.analyzeReports || {}
    const {domainReviews} = this.props;
    const { isLoading } = this.props
    return (
      isLoading ? <MyLoader /> : <div>
        <div style={{ marginBottom: "25px" }}>
          {domainReviews.length === 0 ? <ClaimYourWebsite variant="small" /> : null}
        </div>
        <div style={{ marginBottom: "25px" }}>
          {socialMediaStats.length > 0 ? this.renderSocialMediaReports() : null}
        </div>
        <div style={{ marginBottom: "25px" }}>
          {Object.keys(trafficReports).length > 0 ? this.renderTrafficAnalysisReports() : null}
        </div>
        <div style={{ marginBottom: "25px" }}>
          {Object.keys(analyzeReports).length > 0 ? this.renderAnalyzeReports() : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { profileData } = state
  const { domainProfileData, isLoading } = profileData
  return { domainProfileData, isLoading }
}

export default connect(mapStateToProps)(ProfilePageBodyRight);