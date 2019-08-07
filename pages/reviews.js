import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAmp } from "next/amp";
import SocialMediaGrid from "../Components/Widgets/SocialMediaGrid/SocialMediaGrid";
import TrafficGrid from "../Components/Widgets/TrafficGrid/TrafficGrid";
import axios from "axios";
import AmpImgWrapper from "../Components/AmpWrappers/AmpImgWrapper";
import { reviewPageStyles } from "./Styles/reviewsPageStyles";
import VerifiedBtn from "../Components/Widgets/VerifiedBtn/VerifiedBtn";
import RatingsBadge from "../Components/Widgets/RatingsBadge/RatingsBadge";
import SocialMediaPieChart from "../Components/Widgets/SocialMediaPieChart/SocialMediaPieChart";
import RatingIndicators from "../Components/Widgets/RatingIndicators/RatingIndicators";
import AnalysisCard from "../Components/Widgets/AnalysisCard/AnalysisCard";
import ShareBtn from "../Components/Widgets/ShareBtn/ShareBtn";
import ReviewCard from "..//Components/Widgets/ReviewCard/ReviewCard";
import uuid from "uuid/v1";
import TrafficStatsChart from "../Components/Widgets/TrafficStatsChart/TrafficStatsChart";
export const config = { amp: "hybrid" };

// TODO: AMP Bug for pretty URLs

const renderReviewHeader = (data, domain) => {
  const ratings = data.general_analysis.payload.ratings.watchdog;
  // const ratings = "5";
  const headerBgColor = Number(ratings) >= 3.5 ? "green" : "red";
  return (
    <div
      className="reviewHeaderContainer"
      style={{
        background: `linear-gradient(to right,rgba(247, 247, 247, 1) 50%,rgba(247, 247, 247, 0.5) 70%,rgba(247, 247, 247, 0.1) 90%),url("https://thetrustsearch.com/themes/watchdog/assets/images/${headerBgColor}.png")`
      }}
    >
      <style jsx>{reviewPageStyles}</style>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="reviewImgContainer">
              <AmpImgWrapper
                src={`http://api.screenshotlayer.com/api/capture?access_key=dc13fa64cde0b342fdbe7ddf8b56d1b8&url=https://${domain}&viewport=1440x900&width=250`}
                alt="Websites logo"
                height="156"
                width="250"
                layout="responsive"
                imgContainerStyles={{ width: "250px", height: "156px" }}
                style={{ maxWidth: "100%", maxheight: "100%" }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="row domainDescRow"
              style={{ flexDirection: "column", marginLeft: "2%" }}
            >
              <div>
                <h3 style={{ fontWeight: "400" }}>
                  <AmpImgWrapper
                    src={`http://www.google.com/s2/favicons?domain=https://${domain}`}
                    width="16"
                    height="16"
                    alt="favicon"
                    layout="responsive"
                    imgContainerStyles={{
                      height: "16px",
                      width: "16px",
                      display: "inline-block"
                    }}
                  />
                  <span style={{ marginLeft: "5px" }}>{domain}</span>
                </h3>
              </div>
              <div className="domainDescContainer">
                <span className="domainDesc">Domain Description</span>
              </div>
              <div className="ratingsColumn">
                <div className="ratingsBadgeCont">
                  <div>
                    <RatingsBadge bgColor="golden" ratingCount={ratings} />
                  </div>
                </div>
                <div className="ratingsIndCont">
                  <div>
                    <RatingIndicators
                      rating={Number(ratings)}
                      typeOfWidget="star"
                      widgetRatedColors="#febe42"
                      widgetDimensions="20px"
                      widgetSpacings="3px"
                    />
                  </div>
                </div>

                <div className="reviewFlag">
                  <AmpImgWrapper
                    src="https://thetrustsearch.com/themes/watchdog/assets/panel/images/flags/ch.svg"
                    width="22"
                    height="16"
                    layout="responsive"
                    imgContainerStyles={{
                      height: "16px",
                      width: "22px",
                      display: "inline-block",
                      marginTop: "5%"
                    }}
                    style={{
                      height: "16px",
                      width: "22px",
                      display: "inline-block"
                    }}
                  />{" "}
                  <span
                    style={{
                      display: "inline-block",
                      verticalAlign: useAmp() ? "" : "middle",
                      marginLeft: "5px"
                    }}
                  >
                    Swiss
                  </span>
                </div>
                <div className="reviewVerifiedBtn">
                  <VerifiedBtn />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 bigRatingInd">
          <div className="bigRatingCaption">
              <h3>
                {Number(ratings) > 3.5
                  ? "Good & Safe Website"
                  : "Low rating. Be careful"}
              </h3>
            </div>
            <div className="ratings">
              <RatingIndicators
                rating={Number(ratings)}
                typeOfWidget="star"
                widgetRatedColors="#FFFFFF"
                widgetDimensions="35px"
                widgetSpacings="3px"
              />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

const renderAnalysisCards = analysisReport => {
  let cardsArray = [];
  for (let reportItem in analysisReport) {
    cardsArray = [
      ...cardsArray,
      <div className="col-md-6 col-lg-4" key={uuid()}>
        <AnalysisCard
          analysisTitle={reportItem.split("_").join(" ")}
          analysisInfo={analysisReport[reportItem]}
        />
      </div>
    ];
  }
  return cardsArray;
};

const renderAnalysisReport = analysisReport => {
  return (
    <>
      <style jsx>{reviewPageStyles}</style>
      <div className="reviewAnalysisReport">
        <div className="container">
          <div className="reviewAnalysisHeading">
            <h4>
              <i className="fa fa-bar-chart" />
              Analyze Reports
            </h4>
          </div>
          <div className="row">{renderAnalysisCards(analysisReport)}</div>
          <div className="row">
            <div className="col-md-12">
              <div className="reviewDescription">
                <h6>
                  {" "}
                  <i
                    className="fa fa-angle-right"
                    style={{ marginRight: "3px" }}
                  />{" "}
                  Description
                </h6>
                {/* TODO: find description in the API response */}
                <p>This website don't have meta description :( </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const renderShareBtn = (shareURL, btnText, shareIcon) => {
  return (
    <div className="container">
      <div className="row" style={{ textAlign: "center", margin: "0 0 5% 0" }}>
        <div className="col-md-12">
          <ShareBtn
            shareURL={shareURL}
            btnText={btnText}
            shareIcon={shareIcon}
          />
        </div>
      </div>
    </div>
  );
};

const renderTrafficReports = () => {
  return (
    <div className="reviewVideosContainer">
      <style jsx>{reviewPageStyles}</style>
      <div className="container">
        <div className="reviewVideosHeader">
          <h5>
            <i className="fa fa-line-chart" />
            Traffic Analysis Report
          </h5>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div style={{ height: "250px", width: "auto" }}>
              <TrafficStatsChart />
            </div>
          </div>
          <div className="col-md-4">
            <TrafficGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

const renderSocialReports = () => {
  return (
    <div className="reviewVideosContainer">
      <style jsx>{reviewPageStyles}</style>
      <div className="container">
        <div className="reviewVideosHeader">
          <h5>
            <i className="fa fa-area-chart" />
            Social Media Stats
          </h5>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div style={{ height: "250px", width: "auto" }}>
              <SocialMediaPieChart />
            </div>
          </div>
          <div className="col-md-4">
            <SocialMediaGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

const renderVideoReviews = () => {
  return (
    <div className="reviewVideosContainer">
      <style jsx>{reviewPageStyles}</style>
      <div className="container">
        <div className="reviewVideosHeader">
          <h5>
            <i className="fa fa-file-video-o" />
            Video reviews
          </h5>
        </div>
        <div>
          {/* TODO: AMP Image Wrapper, need to replace with original videos */}
          <img
            src="/static/images/video_reviews.png"
            alt="video reviews"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

const renderReviewCard = commentsToRender => {
  return commentsToRender.map(item => {
    return (
      <div className="col-md-6" style={{ marginBottom: "2%" }} key={uuid()}>
        <ReviewCard {...item} ampImgHeight="75" ampImgWidth="75" />
      </div>
    );
  });
};

const renderTextualReviews = comments => {
  let commentsToRender =
    comments.length > 10 ? [...comments.splice(0, 10)] : [...comments];
  return (
    <div className="textualReviewsContainer">
      <style jsx>{reviewPageStyles}</style>
      <div className="container">
        <div className="textualReviewHeader">
          <h5>
            <i className="fa fa-pencil-square-o	" />
            Textual Review
          </h5>
        </div>
        <div className="row">{renderReviewCard(commentsToRender)}</div>
      </div>
    </div>
  );
};

const getAnalysisReportObject = data => {
  return {
    registration_Date: (
      (((data || {}).whois || {}).payload || {}).registration || {}
    ).value
      ? ((((data || {}).whois || {}).payload || {}).registration || {}).value
      : "Nothing found",

    expiration_Date: (
      (((data || {}).whois || {}).payload || {}).expiration || {}
    ).value
      ? ((((data || {}).whois || {}).payload || {}).expiration || {}).value
      : "Nothing found",

    connection_Safety: ((((data || {}).ssl || {}).payload || {}).enabled || {})
      .value
      ? ((((data || {}).ssl || {}).payload || {}).enabled || {}).value
      : "Nothing found",

    //API Mis-spelled organization to ogranisation

    organization_Check: (
      (((data || {}).ssl || {}).payload || {}).ogranisation || {}
    ).value
      ? ((((data || {}).ssl || {}).payload || {}).ogranisation || {}).value
      : "Nothing found",

    etherscam_DB: ((((data || {}).etherscam || {}).payload || {}).status || {})
      .value
      ? ((((data || {}).etherscam || {}).payload || {}).status || {}).value
      : "Nothing found",

    phishtank_Status: (
      (((data || {}).phishtank || {}).payload || {}).status || {}
    ).value
      ? ((((data || {}).phishtank || {}).payload || {}).status || {}).value
      : "Nothing found",

    trustworthiness: ((((data || {}).wot || {}).payload || {}).trust || {})
      .value
      ? ((((data || {}).wot || {}).payload || {}).trust || {}).value
      : 0,

    index_Page_Analysis: (
      (((data || {}).deface || {}).payload || {}).index || {}
    ).value
      ? ((((data || {}).deface || {}).payload || {}).index || {}).value
      : "Nothing found",

    redirect_Count: ((((data || {}).deface || {}).payload || {}).redirect || {})
      .color
      ? ((((data || {}).deface || {}).payload || {}).redirect || {}).value
      : "Nothing found"
  };
};

const Reviews = props => {
  const [analysisData, setAnalysisData] = useState(props.analysisData);
  const domain = props.domain;
  const data = { ...analysisData.response };
  const analysisReport = getAnalysisReportObject(data);
  const comments =
    ((((data || {}).wot || {}).payload || {}).comments || []).length > 0
      ? (((data || {}).wot || {}).payload || {}).comments
      : [];

  const share_url =
    "https://chrome.google.com/webstore/detail/watchdog2-beta/nolhjjgkcpolemkdekaneneefghjahfp";
  return (
    <div>
      <style jsx>
        {reviewPageStyles}
      </style>
      {renderReviewHeader(data, domain)}
      <div>{renderAnalysisReport(analysisReport)}</div>
      <div className="reviewShareBtnContainer">
        {renderShareBtn(
          share_url,
          "Share your experience and earn rewards",
          "fa fa-gift"
        )}
      </div>
      <div>{renderTrafficReports()}</div>
      <div>{renderSocialReports()}</div>
      <div>{renderVideoReviews()}</div>
      <div>{renderTextualReviews(comments)}</div>
      {renderShareBtn(share_url, "Leave a Review", "fa fa-comments-o")}
    </div>
  );
};

Reviews.getInitialProps = async ({ query }) => {
  const searchURL = query.domain
    ? `https://${query.domain}`
    : "https://google.com";
  const domain = query.domain ? query.domain : "google.com";
  const response = await axios.post(
    "https://watchdog-api-v1.cryptopolice.com/api/verify",
    { domain: searchURL }
  );
  return { analysisData: { ...response.data }, domain };
};

export default Reviews;
