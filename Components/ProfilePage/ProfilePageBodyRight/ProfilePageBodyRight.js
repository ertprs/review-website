import React, { Component } from "react";
import Card from "../../MaterialComponents/Card";
import NewAnalysisCard from "../../Widgets/NewAnalysisCard/NewAnalysisCard";
import { profilePageBodyRightStyles } from "./profilePageBodyRightStyles";
import { trafficIcons } from "../../../utility/constants/trafficReportsConstants";
import uuid from "uuid/v1";
import { connect } from "react-redux";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import {
  SocialMediaPlaceholder,
  TrafficReportsPlaceholder,
  AnalysisReportsPlaceholder
} from "./Placeholders";
import ClaimYourWebsite from "../ClaimYourWebsite/ClaimYourWebsite";
import Button from "@material-ui/core/Button";

class ProfilePageBodyRight extends Component {
  renderAnalysisCards = data => {
    let output = [];
    if (Object.keys(data).length > 0) {
      for (let item in data) {
        if (data[item] !== "") {
          output = [
            ...output,
            <NewAnalysisCard
              key={uuid()}
              analysisTitle={item.split("_").join(" ")}
              analysisInfo={data[item]}
            />
          ];
        }
      }
    }
    return output;
  };

  renderAnalyzeReports = data => {
    const analyzeReports = this.props.analyzeReports;
    return (
      <div>
        <style jsx>{profilePageBodyRightStyles}</style>
        <Card>
          <div className="analyzeCardHeader">
            <h5
              style={{ textAlign: "left", marginLeft: "15px" }}
              className="analyzeCardHeading"
            >
              <i className="fa fa-bar-chart analyzeCardHeaderIcon" />
              Analyze Reports
            </h5>
          </div>
          <div className="analyzeCardBody">
            <div className="row">
              <div className="col-md-12">{this.renderAnalysisCards(data)}</div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  renderTrafficAnalysisCards = data => {
    let output = [];
    if (Object.keys(data).length > 0) {
      for (let item in data) {
        if (data[item] !== "") {
          output = [
            ...output,
            <NewAnalysisCard
              key={uuid()}
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

  renderSocialMediaCards = data => {
    return data.map(item => {
      return (
        <NewAnalysisCard
          key={uuid()}
          analysisTitle={item.name}
          analysisInfo={item.followers}
          analysisIcon={item.icon}
        />
      );
    });
  };

  renderTrafficAnalysisReports = data => {
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
            <h5
              style={{ textAlign: "left", marginLeft: "15px" }}
              className="analyzeCardHeading"
            >
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

  renderTrustPilotCard = () => {
    const trustPilotData = {
      reviews: [],
      claimed: false,
      rating: 3.5,
      max_rating: 5,
      categories: ["sports", "wrestling"],
      image_url: "/static/images/trustpilotLogo.png",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
    };

    return (
      <div style={{ marginBottom: "50px" }}>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }
          .claimHeader {
            text-align: right;
          }
          .claimHeaderIconContainer {
            margin-right: 4px;
          }
          .claimHeaderIcon {
            color: rgb(252, 175, 22);
          }
          .brandImageContainer {
            height: 100px;
            width: 100px;
            margin: 0 auto;
          }
          .brandImage {
            max-width: 100%;
            height: auto;
          }
          .ratingContainer {
            text-align: center;
          }
          .ratingContainerText {
            font-size: 1.2rem;
          }
          .learnMoreBtn {
            text-align: center;
            margin: 15px 0 5px 0;
          }
          .description_header {
            font-weight: bold;
            font-size: 1rem;
          }
          .additionalDetailsHeader {
            font-weight: bold;
            font-size: 1rem;
          }
          .additionalDetails {
            display: flex;
            margin: 9px 0 9px 0;
          }
          .additionalDetails > div {
            flex-basis: 50%;
          }
          .additionalDetails > div:last-child {
            text-align: center;
          }
        `}</style>
        <Card>
          <div className="claimHeader">
            <div>
              <span className="claimHeaderIconContainer">
                <i className="fa fa-warning claimHeaderIcon"></i>
              </span>
              {trustPilotData.claimed ? "claimed" : "Unclaimed"}
            </div>
          </div>
          <div className="brandImageContainer">
            <img src={trustPilotData.image_url} className="brandImage" />
          </div>
          <div className="ratingContainer">
            <div className="ratingContainerText">
              <span className="bold">{trustPilotData.rating}</span> out of{" "}
              <span className="bold">{trustPilotData.max_rating}</span>
            </div>
          </div>
          <div className="additionalDetails">
            <div className="additionalDetailsHeader">Categories :</div>{" "}
            <div>
              {trustPilotData.categories.map(item => {
                return <span>{item} </span>;
              })}
            </div>
          </div>
          <div className="description">
            <div className="description_header">Description :</div>
            <p>
              {trustPilotData.description.length > 100
                ? trustPilotData.description.substring(0, 100) + "..."
                : trustPilotData.description}
            </p>
          </div>
          <div className="learnMoreBtn">
            <Button variant="contained" color="primary" size="small">
              See more
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  renderFacebookCard = () => {
    const facebookData = {
      profile_url: "https://facebook.com",
      verified: false,
      likes: "58",
      followers: "70",
      rating: "1.8",
      total: "21",
      businessProfile: "https://facebook.com",
      username: "Nest"
    };

    return (
      <div style={{ marginBottom: "50px" }}>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }
          .claimHeader {
            text-align: right;
          }
          .claimHeaderIconContainer {
            margin-right: 4px;
          }
          .claimHeaderIcon {
            color: rgb(252, 175, 22);
          }
          .brandImageContainer {
            height: 80px;
            width: 80px;
            margin: 0 auto;
          }
          .brandImage {
            max-width: 100%;
            height: auto;
            border-radius:10px;
          }
          .ratingContainer {
            text-align: center;
            margin: 15px 0 15px 0;
          }
          .ratingContainerText {
            font-size: 1.2rem;
          }
          .learnMoreBtn {
            text-align: center;
            margin: 15px 0 5px 0;
          }
          .description_header {
            font-weight: bold;
            font-size: 1rem;
          }
          .additionalDetailsHeader {
            font-weight: bold;
            font-size: 0.95rem;
          }
          .additionalDetails {
            display: flex;
            margin: 9px 0 9px 0;
          }
          .additionalDetails > div {
            flex-basis: 50%;
          }
          .additionalDetails > div:last-child {
            text-align: center;
          }
        `}</style>
        <Card>
          <div className="claimHeader">
            <div>
              <span className="claimHeaderIconContainer">
                <i className="fa fa-warning claimHeaderIcon"></i>
              </span>
              {facebookData.verified ? "verified" : "unverified"}
            </div>
          </div>
          <div className="brandImageContainer">
            <img src="/static/images/facebookLogo.png" className="brandImage" />
          </div>
          <div className="ratingContainer">
            <div className="ratingContainerText">
              <span className="bold">{facebookData.rating}</span> out of{" "}
              <span className="bold">5</span>
            </div>
          </div>
          <div className="additionalDetails">
            <div className="additionalDetailsHeader">Likes :</div>{" "}
            <div>{facebookData.likes}</div>
          </div>
          <div className="additionalDetails">
            <div className="additionalDetailsHeader">Followers :</div>{" "}
            <div>{facebookData.followers}</div>
          </div>
          <div className="additionalDetails">
            <div className="additionalDetailsHeader">Total reviews :</div>{" "}
            <div>{facebookData.total}</div>
          </div>
          <div className="additionalDetails">
            <div className="additionalDetailsHeader">Username :</div>{" "}
            <div>{facebookData.username}</div>
          </div>
          <div className="learnMoreBtn">
            <Button variant="contained" color="primary" size="small" onClick={()=>{
              window.open(facebookData.businessProfile)
            }}>
              Go to profile
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  renderTrustedShopCard = () => {
    const trustedShopData = {
      reviews: [],
      claimed: "",
      certificate_expiry_date: "27/12/2019",
      rating: 3.5,
      max_rating: 5,
      categories: ["sports", "wrestling"],
      image_url: "/static/images/trustedShopLogo.jpg",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
    };

    return (
      <div style={{ marginBottom: "50px" }}>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }
          .claimHeader {
            text-align: right;
          }
          .claimHeaderIconContainer {
            margin-right: 4px;
          }
          .claimHeaderIcon {
            color: rgb(252, 175, 22);
          }
          .brandImageContainer {
            height: 100px;
            width: 100px;
            margin: 0 auto;
          }
          .brandImage {
            max-width: 100%;
            height: auto;
          }
          .ratingContainer {
            text-align: center;
          }
          .ratingContainerText {
            font-size: 1.2rem;
            margin: 9px 0 9px 0;
          }
          .learnMoreBtn {
            text-align: center;
            margin: 15px 0 5px 0;
          }
          .description_header {
            font-weight: bold;
            font-size: 1rem;
          }
          .additionalDetailsHeader {
            font-weight: bold;
            font-size: 1rem;
          }
          .additionalDetails {
            display: flex;
            margin: 9px 0 9px 0;
          }
          .additionalDetails > div {
            flex-basis: 50%;
          }
          .additionalDetails > div:last-child {
            text-align: center;
          }
        `}</style>
        <Card>
          <div className="claimHeader">
            <div>
              <span className="claimHeaderIconContainer">
                <i className="fa fa-warning claimHeaderIcon"></i>
              </span>
              {trustedShopData.claimed ? "claimed" : "Unclaimed"}
            </div>
          </div>
          <div className="brandImageContainer">
            <img src={trustedShopData.image_url} className="brandImage" />
          </div>
          <div className="ratingContainer">
            <div className="ratingContainerText">
              <span className="bold">{trustedShopData.rating}</span> out of{" "}
              <span className="bold">{trustedShopData.max_rating}</span>
            </div>
          </div>
          <div className="additionalDetails">
            <div className="additionalDetailsHeader">Categories :</div>{" "}
            <div>
              {trustedShopData.categories.map(item => {
                return <span>{item} </span>;
              })}
            </div>
          </div>
          <div className="additionalDetails">
            <div className="additionalDetailsHeader">
              Certifcate expiry date:
            </div>{" "}
            <div>{trustedShopData.certificate_expiry_date}</div>
          </div>
          <div className="description">
            <div className="description_header">Description :</div>
            <p>
              {trustedShopData.description.length > 100
                ? trustedShopData.description.substring(0, 100) + "..."
                : trustedShopData.description}
            </p>
          </div>
          <div className="learnMoreBtn">
            <Button variant="contained" color="primary" size="small">
              See more
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  renderSocialMediaReports = data => {
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
            <h5
              style={{ textAlign: "left", marginLeft: "15px" }}
              className="analyzeCardHeading"
            >
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
    const { domainProfileData, isLoading } = this.props;
    const analysisReportsData =
      ((domainProfileData || {}).analysisReports || {}).data || {};
    const trafficReportsData =
      ((domainProfileData || {}).trafficReports || {}).data || {};
    const socialMediaStatsData =
      ((domainProfileData || {}).socialMediaStats || {}).data || {};

    const domainReviewsWillCome =
      ((domainProfileData || {}).domainReviews || {}).willCome || false;
    const analysisReportsWillCome =
      ((domainProfileData || {}).analysisReports || {}).willCome || false;
    const trafficReportsWillCome =
      ((domainProfileData || {}).trafficReports || {}).willCome || false;
    const socialMediaStatsWillCome =
      ((domainProfileData || {}).socialMediaStats || {}).willCome || false;

    return (
      <div>
        <style jsx>{profilePageBodyRightStyles}</style>
        <style jsx>
          {`
            @media only screen and (max-width: 767px) {
              .claim {
                margin-top: 25px;
              }
            }
          `}
        </style>
        {isLoading ? (
          <div>
            <div className="mb-25">
              <Card>
                <SocialMediaPlaceholder />
              </Card>
            </div>
            <div className="mb-25">
              <Card>
                <TrafficReportsPlaceholder />
              </Card>
            </div>
            <div className="mb-25">
              <Card>
                <AnalysisReportsPlaceholder />
              </Card>
            </div>
          </div>
        ) : (
          <div>
            {!domainReviewsWillCome ? (
              <div className="mb-25 claim">
                <ClaimYourWebsite variant="small" />
              </div>
            ) : null}
            <div>
              {socialMediaStatsWillCome ? (
                <div className="mb-25">
                  {this.renderSocialMediaReports(socialMediaStatsData)}
                </div>
              ) : null}
            </div>
            <div>
              {trafficReportsWillCome ? (
                <div className="mb-25">
                  {this.renderTrafficAnalysisReports(trafficReportsData)}
                </div>
              ) : null}
            </div>
            <div>
              {analysisReportsWillCome ? (
                <div className="mb-25">
                  {this.renderAnalyzeReports(analysisReportsData)}
                </div>
              ) : null}
            </div>
            {/* add will come condition */}
            {this.renderTrustPilotCard()}
            {this.renderTrustedShopCard()}
            {this.renderFacebookCard()}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { profileData } = state;
  const { domainProfileData, isLoading } = profileData;
  return { domainProfileData, isLoading };
};

export default connect(mapStateToProps)(ProfilePageBodyRight);
