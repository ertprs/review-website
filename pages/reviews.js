import React, { useState, useEffect } from "react";
import { useAmp } from "next/amp"; // query.amp==="1"
import {baseURL, screenshotURL, faviconURL, flagsURL, shareURL} from "../utility/config";
import axios from "axios";
import Layout from "../hoc/layout/layout";
import PusherDataComponent from "../Components/PusherDataComponent/PusherDataComponent";
import SocialMediaGrid from "../Components/Widgets/SocialMediaGrid/SocialMediaGrid";
import TrafficGrid from "../Components/Widgets/TrafficGrid/TrafficGrid";
import AmpImgWrapper from "../Components/AmpWrappers/AmpImgWrapper";
import { reviewPageStyles } from "../Components/Styles/reviewsPageStyles";
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

const renderReviewHeader = (data, domain) => {
  const ratings = (
    (((data || {}).general_analysis || {}).payload || {}).ratings || {}
  ).watchdog
    ? ((((data || {}).general_analysis || {}).payload || {}).ratings || {})
        .watchdog
    : "loading";

  const is_verified =
    ((data || {}).domain_data || {}).is_verified !== undefined
      ? ((data || {}).domain_data || {}).is_verified
      : "loading";

  const screenshot =
    ((data || {}).domain_data || {}).screenshot !== undefined
      ? ((data || {}).domain_data || {}).screenshot
      : `${screenshotURL}?access_key=1ed89e56fa17fe2bd7cc86f2a0e6a209&url=http://${domain}&viewport=1440x900&width=250`;

  const favicon =
    ((data || {}).domain_data || {}).favicon !== undefined
      ? ((data || {}).domain_data || {}).favicon
      : `${faviconURL}?domain=https://${domain}`;

  const title =
    ((data || {}).domain_data || {}).title !== undefined
      ? ((data || {}).domain_data || {}).title
      : "loading";

  const flagCode =
    (((data || {}).domain_data || {}).country || {}).code !== undefined
      ? (((data || {}).domain_data || {}).country || {}).code
      : "loading";

  const headerBgColor =
    ratings !== "loading" ? (Number(ratings) >= 3.5 ? "green" : "red") : null;
  return (
    <div
      className="reviewHeaderContainer"
      style={{
        background: `linear-gradient(to right,rgba(247, 247, 247, 1) 50%,rgba(247, 247, 247, 0.5) 70%,rgba(247, 247, 247, 0.1) 90%),url("/static/images/${headerBgColor}.png")`
      }}
    >
      <style jsx>{reviewPageStyles}</style>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            {is_verified !== "loading" ? (
              <div className="reviewImgContainer">
                <AmpImgWrapper
                  src={`${screenshot}`}
                  alt="Websites screenshot"
                  height="156"
                  width="250"
                  layout="responsive"
                  imgContainerStyles={{ width: "250px", height: "156px" }}
                  style={{ maxWidth: "100%", maxheight: "100%" }}
                />
              </div>
            ) : null}
          </div>
          <div className="col-md-6">
            <div
              className="row domainDescRow"
              style={{ flexDirection: "column", marginLeft: "2%" }}
            >
              <div>
                <h3 style={{ fontWeight: "400" }}>
                  <AmpImgWrapper
                    src={favicon}
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
                {title !== "loading" ? (
                  <span className="domainDesc">{title}</span>
                ) : null}
              </div>
              <div className="ratingsColumn">
                <div className="ratingsBadgeCont">
                  <div>
                    {ratings !== "loading" ? (
                      <RatingsBadge bgColor="golden" ratingCount={ratings} />
                    ) : null}
                  </div>
                </div>
                <div className="ratingsIndCont">
                  <div>
                    {ratings !== "loading" ? (
                      <RatingIndicators
                        rating={Number(ratings)}
                        typeOfWidget="star"
                        widgetRatedColors="#febe42"
                        widgetDimensions="20px"
                        widgetSpacings="3px"
                      />
                    ) : null}
                  </div>
                </div>

                {flagCode !== "loading" ? (
                  <div className="reviewFlag">
                    <>
                      <AmpImgWrapper
                        src={`${flagsURL}/${flagCode}/flat/64.png`}
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
                          verticalAlign: "middle",
                          marginLeft: "5px"
                        }}
                      >
                        {flagCode.toUpperCase()}
                      </span>
                    </>
                  </div>
                ) : null}

                <div className="reviewVerifiedBtn">
                  {is_verified !== "loading" ? (
                    <VerifiedBtn verified={is_verified} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 bigRatingInd">
            {ratings !== "loading" ? (
              <>
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
              </>
            ) : (
              <div>
                <img src="/static/images/9.gif" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const renderAnalysisCards = analysisReport => {
  let cardsArray = [];
  for (let reportItem in analysisReport) {
    if (analysisReport[reportItem] !== "...") {
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
  }
  if (cardsArray.length > 0) {
    return cardsArray;
  } else {
    return !useAmp() ? <img src="/static/images/825.gif" /> : null;
  }
};

const renderAnalysisReport = parentState => {
  const analysisReport = getAnalysisReportObject({ ...parentState });
  const data = { ...parentState };
  const meta_desc =
    ((data || {}).domain_data || {}).description !== undefined
      ? ((data || {}).domain_data || {}).description
      : "loading";
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
          {meta_desc !== "loading" ? (
            <div className="row">
              <div className="col-md-12">
                <div className="reviewDescription">
                  <h6>
                    <i
                      className="fa fa-angle-right"
                      style={{ marginRight: "3px" }}
                    />
                    Description
                  </h6>
                  <p>{meta_desc}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

const renderShareBtn = (shareURL, btnText, shareIcon) => {
  return (
    <div className="container">
      <style jsx>{reviewPageStyles}</style>
      <div className="row" style={{ textAlign: "center", margin: "0 0 5% 0" }}>
        <div className="col-md-12 reviewsShareBtnCont">
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

const renderTrafficReports = parentState => {
  const trafficData = getTrafficReportObject({ ...parentState });
  const uniqueVisitorsTimeLine = getUniqueVisitorsTimeline({ ...parentState });
  return (
    <div className="reviewTrafficContainer">
      <style jsx>{reviewPageStyles}</style>
      <div className="container">
        <div className="reviewTrafficHeader">
          <h5>
            <i className="fa fa-line-chart" />
            Traffic Analysis Report
          </h5>
        </div>

        <div className="row reviewStatsFlex">
          {Object.keys(trafficData.payload).length > 0 ? (
            <>
              {!useAmp() ? <div className="col-md-8">
                <div style={{ height: "250px", width: "auto" }}>
                  <TrafficStatsChart data={uniqueVisitorsTimeLine} />
                </div>
              </div> : null}
              <div className="col-md-4" style={{ marginBottom: "5%" }}>
                <TrafficGrid trafficData={trafficData.payload} />
              </div>
            </>
          ) : (
            <div className="col-md-12">
              <div style={{ textAlign: "center" }}>
                {trafficData.success ? (
                  !useAmp() ? <div>
                  <img src="/static/images/traffic_data.gif" />
                </div> : null
                ) : (
                  <div>No traffic records found :(</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const renderSocialReports = parentState => {
  const socialData = getSocialReportObject({ ...parentState });
  return (
    <div className="reviewSocialContainer">
      <style jsx>{reviewPageStyles}</style>
      <div className="container">
        <div className="reviewSocialHeader">
          <h5>
            <i className="fa fa-area-chart" />
            Social Media Stats
          </h5>
        </div>
        <div className="row reviewStatsFlex">
          {Object.keys(socialData.payload || {}).length > 0 ? (
            <>
              {!useAmp() ? <div className="col-md-8">
                <div style={{ height: "250px", width: "auto" }}>
                  <SocialMediaPieChart socialData={{ ...socialData.payload }} />
                </div>
              </div> : null}
              <div className="col-md-4" style={{ marginBottom: "5%" }}>
                <SocialMediaGrid socialData={{ ...socialData.payload }} />
              </div>
            </>
          ) : (
            <div className="col-md-12">
              <div style={{ textAlign: "center" }}>
                {socialData.success ? (
                  !useAmp() ? <div>
                  <img src="/static/images/social_data.gif" />
                </div> : null
                ) : (
                  <div>No social media records found :(</div>
                )}
              </div>
            </div>
          )}
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
        <ReviewCard
          {...item}
          ampImgHeight="75"
          ampImgWidth="75"
          variant="reviews"
        />
      </div>
    );
  });
};

const renderTextualReviews = comments => {
  let commentsToRender =
    comments[0] !== "loading"
      ? comments.length > 10
        ? [...comments.splice(0, 10)]
        : [...comments]
      : ["loading"];

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
        <div className="row">
          {commentsToRender.length > 0 && commentsToRender[0] !== "loading" &&  commentsToRender[0] !== "not found" ? (
            renderReviewCard(commentsToRender)
          ) : (
            <div className="col-md-12">
              <div style={{ textAlign: "center", marginLeft: "15px" }}>
                {commentsToRender[0] === "not found" || commentsToRender.length===0 ? (
                  <div>No text reviews found :(</div>
                ) : (
                  !useAmp() ? <div>
                  <img src="/static/images/253.gif" />
                </div> : null
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getAnalysisReportObject = data => {
  let addon = {};
  const additional_info = ((data || {}).domain_data ||{}).additional_info;
  if(additional_info !==undefined){
    for(let item in additional_info){
      addon = {...addon, [item]: additional_info[item]}
    }
  }

  return {
    registration_Date: (
      (((data || {}).whois || {}).payload || {}).registration || {}
    ).value
      ? ((((data || {}).whois || {}).payload || {}).registration || {}).value
      : "...",

    expiration_Date: (
      (((data || {}).whois || {}).payload || {}).expiration || {}
    ).value
      ? ((((data || {}).whois || {}).payload || {}).expiration || {}).value
      : "...",

    connection_Safety: ((((data || {}).ssl || {}).payload || {}).enabled || {})
      .value
      ? ((((data || {}).ssl || {}).payload || {}).enabled || {}).value
      : "...",

    //API Mis-spelled organization to ogranisation

    organization_Check: (
      (((data || {}).ssl || {}).payload || {}).ogranisation || {}
    ).value
      ? ((((data || {}).ssl || {}).payload || {}).ogranisation || {}).value
      : "...",

    etherscam_DB: ((((data || {}).etherscam || {}).payload || {}).status || {})
      .value
      ? ((((data || {}).etherscam || {}).payload || {}).status || {}).value
      : "...",

    phishtank_Status: (
      (((data || {}).phishtank || {}).payload || {}).status || {}
    ).value
      ? ((((data || {}).phishtank || {}).payload || {}).status || {}).value
      : "...",

    trustworthiness: ((((data || {}).wot || {}).payload || {}).trust || {})
      .value
      ? ((((data || {}).wot || {}).payload || {}).trust || {}).value
      : "...",

    index_Page_Analysis: (
      (((data || {}).deface || {}).payload || {}).index || {}
    ).value
      ? ((((data || {}).deface || {}).payload || {}).index || {}).value
      : "...",

    redirect_Count: ((((data || {}).deface || {}).payload || {}).redirect || {})
      .color
      ? ((((data || {}).deface || {}).payload || {}).redirect || {}).value
      : "...",
    ...addon
  };
};

const getTrafficReportObject = data => {
  const timeline = (((data || {}).traffic || {}).payload || {}).timeline || [];
  const success = ((data || {}).traffic || {}).success;
  const isTimeLinePresent = timeline.length > 0;
  if (isTimeLinePresent) {
    return {
      payload: {
        daily_unique_visitors: (
          (((data || {}).traffic || {}).payload || {}).timeline[0].visits || {}
        ).daily_unique_visitors,

        monthly_unique_visitors: (
          (((data || {}).traffic || {}).payload || {}).timeline[0].visits || {}
        ).monthly_unique_visitors,

        pages_per_visit: (
          (((data || {}).traffic || {}).payload || {}).timeline[0].visits || {}
        ).pages_per_visit,

        bounce_rate: (
          (((data || {}).traffic || {}).payload || {}).timeline[0].visits || {}
        ).bounce_rate,

        daily_pageviews: (
          (((data || {}).traffic || {}).payload || {}).timeline[0].visits || {}
        ).daily_pageviews,

        alexa_pageviews: (
          (((data || {}).traffic || {}).payload || {}).timeline[0].visits || {}
        ).alexa_pageviews,

        alexa_search_traffic: (
          (((data || {}).traffic || {}).payload || {}).traffic_stats_links || {}
        ).alexa_search_traffic
      },
      success: success
    };
  } else if (!success && success !== undefined) {
    return { payload: {}, success: success };
  }
  return { payload: {}, success: true };
};

const getUniqueVisitorsTimeline = data => {
  const timeline = (((data || {}).traffic || {}).payload || {}).timeline || [];
  const isTimeLinePresent = timeline.length > 0;
  let uniqueVisitorsTimeline = [];
  if (isTimeLinePresent) {
    uniqueVisitorsTimeline = timeline
      .reverse()
      .map(item => {
        console.log(item)
        if(item.visits.length > 0 || Object.keys(item.visits).length > 0) {
          return {
            name:
              new Date(item["updated_at"]).getDate() +
              "/" +
              (new Date(item["updated_at"]).getMonth() + 1),
            daily_unique_visitors: Number(
              item.visits["daily_unique_visitors"].split(",").join("")
            )
          };
        }
      });
  }

  return uniqueVisitorsTimeline;
};

const getSocialReportObject = data => {
  if (((data || {}).social || {}).payload) {
    let payload = {};
    let initPayload = {...data.social.payload};
    for(let item in initPayload){
      if(initPayload[item].verified){
        payload = {...payload, [item]:initPayload[item]}
      }
    }

    const success = ((data || {}).social || {}).success
      ? ((data || {}).social || {}).success
      : false;
    
    return Object.keys(payload).length > 0 ?  { payload: payload, success: success } : 
    { payload: payload, success: false }
    
  } else if (((data || {}).social || {}).success === false) {
    return { payload: {}, success: false };
  }
  return { payload: {}, success: true };
};

const renderMajorData = (parentState, domain, share_url, comments) => {
  return (
    <>
      <style jsx>{reviewPageStyles}</style>
      {renderReviewHeader(parentState, domain)}
      <div>{renderAnalysisReport(parentState)}</div>
      <div className="reviewShareBtnContainer">
        {renderShareBtn(
          share_url,
          "Share your experience and earn rewards",
          "fa fa-gift"
        )}
      </div>
      <div>{renderTrafficReports(parentState)}</div>
      <div>{renderSocialReports(parentState)}</div>
      {/* <div>{renderVideoReviews()}</div> */}
      <div>{renderTextualReviews(comments)}</div>
      {renderShareBtn(share_url, "Leave a Review", "fa fa-comments-o")}
    </>
  );
};

const getCommentsObject = parentState => {
  const data = { ...parentState };
  if (
    !(((data || {}).wot || {}).payload || {}).comments &&
    ((data || {}).wot || {}).needs_pull === undefined
  ) {
    return ["loading"];
  }
  else if (((data || {}).wot || {}).needs_pull) {
    return ["not found"];
  }
  return ((((data || {}).wot || {}).payload || {}).comments || []).length > 0
    ? (((data || {}).wot || {}).payload || {}).comments
    : [];
};

const Reviews = props => {
  let initState = {};
  if (useAmp()) {
    initState = { ...props.analysisData.response };
  }
  const [parentState, setParentState] = useState(initState);
  const domain = props.domain;
  const comments = getCommentsObject({ ...parentState });

  const share_url = shareURL;

  return (
    <Layout>
      {!useAmp() ? (
        <PusherDataComponent
          domain={props.domain}
          onChildStateChange={newState => {
            setParentState({ ...parentState, ...newState });
          }}
        />
      ) : null}
      {renderMajorData(parentState, domain, share_url, comments)}
    </Layout>
  );
};

Reviews.getInitialProps = async ({ query }) => {
  // const oldURL = "https://watchdog-api-v1.cryptopolice.com/api/verify";
  const searchURL = query.domain
    ? `https://${query.domain}`
    : "https://google.com";
  const domain = query.domain ? query.domain : "google.com";
  if (query.amp === "1") {
    const response = await axios.get(
      `https://${baseURL}/api/verify?domain=${searchURL}`
    );
    return { analysisData: { ...response.data }, domain };
  }
  return { domain: domain };
};

export default Reviews;
