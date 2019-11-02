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
    const { aggregateData } = this.props;
    const trustPilotData = _get(aggregateData, "18", {});
    const profile_url = _get(trustPilotData, "profile_url", "");
    const verified = _get(trustPilotData, "verified", false);
    const total = _get(trustPilotData, "data.total", 0);
    const claimed = _get(trustPilotData, "data.claimed", false);
    const rating = _get(trustPilotData, "data.rating", 0);
    const max_rating = _get(trustPilotData, "data.max_rating", 0);
    const categories = _get(trustPilotData, "data.categories", []);
    const image_url = "/static/images/trustpilotLogo.png";
    const description = _get(trustPilotData, "data.description", "");
    const url = _get(trustPilotData, "data.url", "");
    const followers = _get(trustPilotData, "followers", 0);

    // const trustPilotData = {
    //   reviews: [],
    //   claimed: false,
    //   rating: 3.5,
    //   max_rating: 5,
    //   categories: ["sports", "wrestling"],
    //   image_url: "/static/images/trustpilotLogo.png",
    //   description:
    //     "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
    // };

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
                {claimed ? (
                  <i
                    className="fa fa-check-circle"
                    style={{ color: "green" }}
                  ></i>
                ) : (
                  <i className="fa fa-warning claimHeaderIcon"></i>
                )}
              </span>
              {claimed ? "Claimed" : "Unclaimed"}
            </div>
          </div>
          <div className="brandImageContainer">
            <img src={image_url} className="brandImage" />
          </div>
          <div className="ratingContainer">
            <div className="ratingContainerText">
              <span className="bold">{rating}</span> out of{" "}
              <span className="bold">{max_rating}</span>
            </div>
          </div>
          {categories &&
          Array.isArray(categories) &&
          (categories || []).length > 0 ? (
            <div className="additionalDetails">
              <div className="additionalDetailsHeader">Categories :</div>{" "}
              <div style={{ textAlign: "left" }}>
                {Array.isArray(categories) && (categories || []).length > 0
                  ? categories.map((item, index) => {
                      return (
                        <span>
                          {item} {index !== categories.length - 1 ? "," : ""}{" "}
                        </span>
                      );
                    })
                  : null}
              </div>
            </div>
          ) : null}
          {total ? (
            <div className="additionalDetails">
              <div className="additionalDetailsHeader">Total Reviews :</div>{" "}
              <div style={{ textAlign: "center" }}>{total}</div>
            </div>
          ) : null}
          {description ? (
            <div className="description">
              <div className="description_header">Description :</div>
              <p>
                {description.length > 200
                  ? description.substring(0, 200) + "..."
                  : description}
              </p>
            </div>
          ) : null}
          <div className="learnMoreBtn">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                window.open(url);
              }}
            >
              See more
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  renderLinkedInCard = () => {
    const { aggregateData } = this.props;
    const linkedInData = _get(aggregateData, "13", {});
    const followers = _get(linkedInData, "data.followers", 0);
    const employee_count = _get(linkedInData, "data.employee_count", 0);
    const industry = _get(linkedInData, "data.industry", "");
    const company_size = _get(linkedInData, "data.company_size", "");
    const headquarters = _get(linkedInData, "data.headquarters", "");
    const type = _get(linkedInData, "data.type", "");
    const founded = _get(linkedInData, "data.founded", "");
    const specialities = _get(linkedInData, "data.specialities", "");
    const url = _get(linkedInData, "data.url", "");
    const employees = _get(linkedInData, "empolyees", []);

    // const trustPilotData = {
    //   reviews: [],
    //   claimed: false,
    //   rating: 3.5,
    //   max_rating: 5,
    //   categories: ["sports", "wrestling"],
    //   image_url: "/static/images/trustpilotLogo.png",
    //   description:
    //     "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
    // };

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
            margin: 0 auto 30px auto;
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
          <div className="brandImageContainer">
            <img src="/static/images/linkedinLogo.png" className="brandImage" />
          </div>
          {followers ? (
            <div className="additionalDetails">
              <div className="additionalDetailsHeader">Followers :</div>{" "}
              <div style={{ textAlign: "left" }}>{followers}</div>
            </div>
          ) : null}
          {employee_count ? (
            <div className="additionalDetails">
              <div className="additionalDetailsHeader">Employee count :</div>{" "}
              <div style={{ textAlign: "left" }}>{employee_count}</div>
            </div>
          ) : null}
          {industry ? (
            <div className="additionalDetails">
              <div className="additionalDetailsHeader">Industry :</div>{" "}
              <div style={{ textAlign: "left" }}>{industry}</div>
            </div>
          ) : null}
          {company_size ? (
            <div className="additionalDetails">
              <div className="additionalDetailsHeader">Company size :</div>{" "}
              <div style={{ textAlign: "left" }}>{company_size}</div>
            </div>
          ) : null}
          {headquarters ? (
            <div className="additionalDetails">
              <div className="additionalDetailsHeader">Headquarters :</div>{" "}
              <div style={{ textAlign: "left" }}>{headquarters}</div>
            </div>
          ) : null}
          {type ? (
            <div className="additionalDetails">
              <div className="additionalDetailsHeader">Type :</div>{" "}
              <div style={{ textAlign: "left" }}>{type}</div>
            </div>
          ) : null}
          {founded ? (
            <div className="additionalDetails">
              <div className="additionalDetailsHeader">Founded :</div>{" "}
              <div style={{ textAlign: "left" }}>{founded}</div>
            </div>
          ) : null}
          {specialities ? (
            <div className="additionalDetails">
              <div className="additionalDetailsHeader">Specialities :</div>{" "}
              <div style={{ textAlign: "left" }}>{specialities}</div>
            </div>
          ) : null}
          <div className="learnMoreBtn">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                window.open(url);
              }}
            >
              See more
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  renderFacebookCard = () => {
    const { aggregateData } = this.props;
    const facebookData = _get(aggregateData, "1", {});
    const profile_url = _get(facebookData, "profile_url", "");
    const verified = _get(facebookData, "verified", false);
    const likes = _get(facebookData, "data.likes", 0);
    const url = _get(facebookData, "data.url", "");
    const followers = _get(facebookData, "data.followers", "");
    const username = _get(facebookData, "data.username", "");

    return (
      <div>
        <style jsx>
          {`
            .flexContainer {
              display: flex;
              align-items: center;
            }

            .flexContainer > div:last-child {
              flex-basis: 100%;
              margin-left: 15px;
            }

            .brandImageContainer {
              height: 100px;
              width: 100px;
            }
            .brandImage {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
            }
            .brandImageContainer {
              display: flex;
              align-items: center;
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
            .learnMoreBtn {
              text-align: center;
              margin: 15px 0 5px 0;
            }
          `}
        </style>
        <Card>
          <div className="claimHeader">
            <div>
              <span className="claimHeaderIconContainer">
                {verified ? (
                  <i
                    className="fa fa-check-circle"
                    style={{ color: "green" }}
                  ></i>
                ) : (
                  <i className="fa fa-warning claimHeaderIcon"></i>
                )}
              </span>
              {verified ? "Verified" : "Unverified"}
            </div>
          </div>
          <div className="flexContainer">
            <div className="brandImageContainer">
              <img
                src="/static/images/facebookLogo.png"
                className="brandImage"
              />
            </div>
            <div className="detailsContainer">
              {followers ? (
                <div className="additionalDetails">
                  <div className="additionalDetailsHeader">Followers :</div>{" "}
                  <div style={{ textAlign: "left" }}>{followers}</div>
                </div>
              ) : null}
              {likes ? (
                <div className="additionalDetails">
                  <div className="additionalDetailsHeader">Likes :</div>{" "}
                  <div style={{ textAlign: "left" }}>{likes}</div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="learnMoreBtn">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                window.open(url);
              }}
            >
              See more
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  renderTrustedShopCard = () => {
    const { aggregateData } = this.props;
    const trustedShopData = _get(aggregateData, "19", {});
    const total = _get(trustedShopData, "data.total", 0);
    const verified = _get(trustedShopData, "verified", false);
    const certificate_expiry_date = _get(
      trustedShopData,
      "data.certificate_expiry_date",
      ""
    );
    const rating = _get(trustedShopData, "data.rating", 0);
    const max_rating = _get(trustedShopData, "data.max_rating", 0);
    const categories = _get(trustedShopData, "data.categories", []);
    const image_url = _get(trustedShopData, "data.image_url", "");
    const description = _get(trustedShopData, "data.description", "");
    const url = _get(trustedShopData, "data.url", "");

    // const trustedShopData = {
    //   reviews: [],
    //   claimed: "",
    //   certificate_expiry_date: "27/12/2019",
    //   rating: 3.5,
    //   max_rating: 5,
    //   categories: ["sports", "wrestling"],
    //   image_url: "/static/images/trustedShopLogo.jpg",
    //   description:
    //     "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
    // };

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
            margin: 13px 0 13px 0;
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
                {verified ? (
                  <i
                    className="fa fa-check-circle"
                    style={{ color: "green" }}
                  ></i>
                ) : (
                  <i className="fa fa-warning claimHeaderIcon"></i>
                )}
              </span>
              {verified ? "Verified" : "Unverified"}
            </div>
          </div>
          <div className="brandImageContainer">
            <img
              src="/static/images/trustedShopLogo.jpg"
              className="brandImage"
            />
          </div>
          <div className="ratingContainer">
            <div className="ratingContainerText">
              <span className="bold">{rating}</span> out of{" "}
              <span className="bold">{max_rating}</span>
            </div>
          </div>
          {categories &&
          Array.isArray(categories) &&
          (categories || []).length > 0 ? (
            <div className="additionalDetails">
              <div className="additionalDetailsHeader">Categories :</div>{" "}
              <div>
                {Array.isArray(categories) && (categories || []).length > 0
                  ? categories.map(item => {
                      return <span>{item} </span>;
                    })
                  : null}
              </div>
            </div>
          ) : null}
          {certificate_expiry_date ? (
            <div className="additionalDetails">
              <div className="additionalDetailsHeader">
                Certifcate expiry date:
              </div>{" "}
              <div>{certificate_expiry_date}</div>
            </div>
          ) : null}
          {total ? (
            <div className="additionalDetails">
              <div className="additionalDetailsHeader">Total Reviews :</div>{" "}
              <div style={{ textAlign: "center" }}>{total}</div>
            </div>
          ) : null}
          {description ? (
            <div className="description">
              <div className="description_header">Description :</div>
              <p>
                {description.length > 200
                  ? description.substring(0, 200) + "..."
                  : description}
              </p>
            </div>
          ) : null}
          <div className="learnMoreBtn">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                window.open(url);
              }}
            >
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
    const { domainProfileData, isLoading, aggregateData } = this.props;
    let showTrustPilot = false;
    let showTrustedShop = false;
    let showFacebook = false;
    let showLinkedInCard = false;
    if (aggregateData.hasOwnProperty("18")) {
      if (
        _get(aggregateData, "18.data", null) !== null &&
        !_isEmpty(_get(aggregateData, "18.data", {}))
      ) {
        showTrustPilot = true;
      } else {
        showTrustPilot = false;
      }
    }

    if (aggregateData.hasOwnProperty("19")) {
      if (
        _get(aggregateData, "19.data", null) !== null &&
        !_isEmpty(_get(aggregateData, "19.data", {}))
      ) {
        showTrustedShop = true;
      } else {
        showTrustedShop = false;
      }
    }

    if (aggregateData.hasOwnProperty("1")) {
      if (
        _get(aggregateData, "1.data", null) !== null &&
        !_isEmpty(_get(aggregateData, "1.data", {}))
      ) {
        showFacebook = true;
      } else {
        showFacebook = false;
      }
    }
    if (aggregateData.hasOwnProperty("13")) {
      if (
        _get(aggregateData, "13.data", null) !== null &&
        !_isEmpty(_get(aggregateData, "13.data", {}))
      ) {
        showLinkedInCard = true;
      } else {
        showLinkedInCard = false;
      }
    }

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
    const is_verified = _get(
      domainProfileData,
      "headerData.data.is_verified",
      false
    );
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
            {showTrustPilot ? this.renderTrustPilotCard() : null}
            {showTrustedShop ? this.renderTrustedShopCard() : null}
            {showLinkedInCard ? (
              <div className="mb-25">{this.renderLinkedInCard()}</div>
            ) : null}
            {showFacebook ? (
              <div className="mb-25">{this.renderFacebookCard()}</div>
            ) : null}
            {!is_verified ? (
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
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { profileData, aggregateData } = state;
  const { domainProfileData, isLoading } = profileData;
  return { domainProfileData, isLoading, aggregateData };
};

export default connect(mapStateToProps)(ProfilePageBodyRight);
