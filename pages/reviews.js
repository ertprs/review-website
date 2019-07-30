import React, { useState } from "react";
import axios from "axios";
import AmpImgWrapper from "../Components/AmpWrappers/AmpImgWrapper";
import { reviewPageStyles } from "./Styles/reviewsPageStyles";
import VerifiedBtn from "../Components/Widgets/VerifiedBtn/VerifiedBtn";
import RatingsBadge from "../Components/Widgets/RatingsBadge/RatingsBadge";
import RatingIndicators from "../Components/Widgets/RatingIndicators/RatingIndicators";

export const config = { amp: "hybrid" };

const renderReviewHeader = () => {
  return (
    <div className="reviewHeaderContainer">
      <style jsx>{reviewPageStyles}</style>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="reviewImgContainer">
              <AmpImgWrapper
                src="/static/images/review_demo.png"
                alt="Trust search logo"
                height="156"
                width="250"
                layout="responsive"
                imgContainerStyles={{ width: "156px", height: "250px" }}
                style={{ maxWidth: "100%", maxheight: "100%" }}
              />
            </div>
          </div>
          <div className="col-md-6">
            {/* TO DO: get dynamic domain for favicon, try to migrate from css in js to external as much as possible*/}
            <div
              className="row"
              style={{ flexDirection: "column", marginLeft: "2%" }}
            >
              <div>
                <h3 style={{ fontWeight: "400" }}>
                  <AmpImgWrapper
                    src="http://www.google.com/s2/favicons?domain=google.com"
                    width="16"
                    height="16"
                    alt="favicon"
                    layout="responsive"
                    imgContainerStyles={{ height: "16px", width: "16px" }}
                  />
                  <span style={{ marginLeft: "5px" }}>google.com</span>
                </h3>
              </div>
              <div className="domainDescContainer">
                <span className="domainDesc">Domain Description</span>
              </div>
              <div className="ratingsColumn">
                {/* Convert Rating from API to number */}
                <div className="ratingsBadgeCont">
                  <div>
                    <RatingsBadge bgColor="golden" ratingCount="4.5" />
                  </div>
                </div>
                <div className="ratingsIndCont">
                  <div>
                    <RatingIndicators
                      rating={4.5}
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
                    imgContainerStyles={{ height: "16px", width: "22px" }}
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
            <div>
              <RatingIndicators
                rating={4.5}
                typeOfWidget="star"
                widgetRatedColors="#FFFFFF"
                widgetDimensions="42px"
                widgetSpacings="3px"
              />
            </div>
            <div className="bigRatingCaption">
              <h3>Good &amp; Safe Website</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Reviews = props => {
  const [analysisData, setAnalysisData] = useState(props.analysisData);
  console.log(analysisData.response);
  return <div>{renderReviewHeader()}</div>;
};

Reviews.getInitialProps = async ({ query }) => {
  //todo try to get the query param from the URL
  console.log(query);
  const res = await axios.post(
    "https://watchdog-api-v1.cryptopolice.com/api/verify",
    { domain: "https://google.com" }
  );
  return { analysisData: { ...res.data } };
};

export default Reviews;
