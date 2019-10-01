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
import ClaimYourWebsite from '../ClaimYourWebsite/ClaimYourWebsite';

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

    const domainReviewsWillCome = (((domainProfileData || {}).domainReviews || {}).willCome || false)
    const analysisReportsWillCome = (((domainProfileData || {}).analysisReports || {}).willCome || false)
    const trafficReportsWillCome = (((domainProfileData || {}).trafficReports || {}).willCome || false)
    const socialMediaStatsWillCome = (((domainProfileData || {}).socialMediaStats || {}).willCome || false)

    return (
      <div>
        <style jsx>{profilePageBodyRightStyles}</style>
        <style jsx>
          {`
            @media only screen and (max-width:767px){
              .claim{
                margin-top:25px;
              }
            }
          `}
        </style>
        {isLoading ? <div>
          <div className="mb-25">
            <Card>
              <SocialMediaPlaceholder />
            </Card>
          </div>
          <div className="mb-25" >
            <Card>
              <TrafficReportsPlaceholder />
            </Card>
          </div>
          <div className="mb-25" >
            <Card>
              <AnalysisReportsPlaceholder />
            </Card>
          </div>
        </div> : <div>
            {!domainReviewsWillCome ? <div className="mb-25 claim">
              <ClaimYourWebsite variant="small" />
            </div> : null}
            <div>
              {socialMediaStatsWillCome ?
                <div className="mb-25">
                  {this.renderSocialMediaReports(socialMediaStatsData)}
                </div> : null}
            </div>
            <div>
              {trafficReportsWillCome ?
                <div className="mb-25">
                  {this.renderTrafficAnalysisReports(trafficReportsData)}
                </div> : null}
            </div>
            <div>
              {analysisReportsWillCome ?
                <div className="mb-25">
                  {this.renderAnalyzeReports(analysisReportsData)}
                </div> : null}
            </div>
          </div>}
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