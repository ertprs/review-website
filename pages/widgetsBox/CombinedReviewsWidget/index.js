import React from "react";
import axios from "axios";
import Slider from "react-slick";
import uuid from "uuid/v1";
import { layoutStyles } from "../../../style";
import Head from "next/head";
import _get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { widgetsLogoConstants } from "../../../utility/constants/widgetsLogoConstants";
import { combinedReviewsWidgetStyles } from "../../../Components/Styles/combinedReviewsWidgetStyles";
import ReviewBox from "../../../Components/Widgets/ReviewBox/ReviewBox";
import { ratingColor } from "../../../utility/ratingTypeColor";
import dynamic from "next/dynamic";
const RatingIndicators = dynamic(
  () => import("../../../Components/Widgets/RatingIndicators/RatingIndicators"),
  { ssr: false }
);

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1110,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: false
      }
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false
      }
    }
  ]
};

class CombinedReviewsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewData: {}
    };
  }

  componentDidMount() {
    if (this.props.domain) {
      const domain = _get(this.props, "domain", "google.com");
      const maxReviews = _get(this.props, "maxReviews", 20);
      const newerThanMonths = _get(this.props, "newerThanMonths", 2);
      const platformId = _get(this.props, "platformId", "");
      const rating = _get(this.props, "rating", 1);
      let requestURL = `${process.env.BASE_URL}/api/reviews/widget/domain?domain=${domain}&maxReviews=${maxReviews}&newerThanMonths=${newerThanMonths}&rating=${rating}`;
      if (requestURL) {
        axios
          .get(requestURL)
          .then(res => {
            const data = _get(res, "data", {});
            const reviews = _get(res, "data.reviews", {});
            const success = _get(res, "data.success", false);
            const reviewPlatformObjects = _get(res, "data.reviews.reviews", {});
            if (!isEmpty(data)) {
              if (
                !isEmpty(reviews) &&
                success &&
                !isEmpty(reviewPlatformObjects)
              ) {
                const overallRating = _get(reviews, "rating", "");
                const totalReviews = _get(reviews, "total", 0);
                const availablePlatforms =
                  Object.keys(reviewPlatformObjects) || [];
                const selectedPlatform =
                  availablePlatforms.length > 0 ? availablePlatforms[0] : "";
                this.setState({
                  reviewData: {
                    overallRating,
                    platformReviewsObject: { ...reviewPlatformObjects },
                    totalReviews,
                    selectedPlatform,
                    success
                  }
                });
              } else {
                //if inner reviews is empty i.e. no reviewPlatformObjects is empty
                this.setState({ reviewData: { noReviewFound: true, success } });
              }
            }
          })
          .catch(error => {
            let success = _get(error, "response.data.success", false);
            if (!success) {
              this.setState({
                reviewData: { noReviewFound: true, success: false }
              });
            }
          });
      }
    }
  }


  changeSelectedPlatform = platformId => {
    this.setState({
      reviewData: { ...this.state.reviewData, selectedPlatform: platformId }
    });
  };

  renderPlatformSliderBoxes = platformReviewsObject => {
    let output = [];
    for (let platformId in platformReviewsObject) {
      if (platformReviewsObject.hasOwnProperty(platformId)) {
        if (platformReviewsObject[platformId]) {
          let particularPlatformData = platformReviewsObject[platformId];
          let total = _get(particularPlatformData, "total", "");
          let rating = _get(particularPlatformData, "rating", "");
          let max_rating = _get(particularPlatformData, "max_rating", "5");
          let url = "";
          let logo = "";
          let subHeading = "";
          if (platformId == "1") {
            url = _get(particularPlatformData, "businessProfile", "");
          } else {
            url = _get(particularPlatformData, "url", "");
          }
          if (platformId !== "google") {
            if (widgetsLogoConstants[Number(platformId)]) {
              let subtitle = widgetsLogoConstants[Number(platformId)].subTitle;
              subHeading = subtitle.replace("?", total);
              logo = widgetsLogoConstants[Number(platformId)].imageLogo || "";
            }
          } else {
            if (widgetsLogoConstants[0]) {
              let subtitle = widgetsLogoConstants[0].subTitle;
              subHeading = subtitle.replace("?", total);
              logo = widgetsLogoConstants[0].imageLogo || "";
            }
          }
          output = [
            ...output,
            <div key={uuid()}>
              <style jsx>{combinedReviewsWidgetStyles}</style>
              <div
                className="platformCardContainer"
                onClick={() => {
                  this.changeSelectedPlatform(platformId);
                }}
              >
                <div>
                  <div className="logoContainer">
                    <img src={`/static/images/${logo}`} />
                  </div>
                </div>
                <div>
                  <div className="textContainer">
                    <h4>
                      {rating} / {max_rating}
                    </h4>
                    <p>{subHeading}</p>
                  </div>
                </div>
              </div>
            </div>
          ];
        }
      }
    }
    return output;
  };

  renderPlatformSlider = () => {
    const { reviewData } = this.state;
    const success = _get(reviewData, "success", false);
    const noReviewFound = _get(reviewData, "noReviewFound", false);
    const platformReviewsObject = _get(reviewData, "platformReviewsObject", {});
    return (
      <div className="flexContainer">
        <style jsx>{layoutStyles}</style>
        <style jsx>{`
          .flexContainer {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
          }
          .textReviewsContainer {
            padding: 0 3% 0 3%;
            font-size:0.9rem;
            width: 95%;
            margin:0 auto;
            order: 0;
            flex: 0 1 auto;
          }
          .reviewBoxFooter{
            display:none;
          }
  
          .noReviewBox{
            text-align:left;
          }
  
          @media screen and (max-width:1110px){
            textReviewsContainer {
              width: 24.3%;
            }
          }
  
           @media screen and (max-width: 990px) {
             .flexContainer{
               justify-content:space-around;
             }
            .flexContainer > textReviewsContainer {
              width: 40%;
            }
           }
  
           @media screen and (max-width: 599px){
             .textReviewsContainer{
               width:81.5%;
               margin:0 auto;
             }
             .reviewBoxFooter{
               display:block;
               margin-top:8px;
             }
             .noReviewBox{
               text-align:center;
             }
           }
          }
        `}</style>
        <div className="textReviewsContainer">
          <Head>
            <link
              rel="stylesheet"
              type="text/css"
              charset="UTF-8"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            <link
              href="/static/css/slick.css"
              type="text/css"
              rel="stylesheet"
            />
          </Head>
          <div className="reviewBoxSlider">
            {Object.keys(platformReviewsObject).length > 0 && success ? (
              <Slider {...settings}>
                {this.renderPlatformSliderBoxes(platformReviewsObject)}
              </Slider>
            ) : noReviewFound ? null : (
              this.renderFetchingBox()
            )}
            <div></div>
          </div>
        </div>
      </div>
    );
  };

  renderFetchingBox = () => {
    return (
      <div className="fetchingContainer">
        <style jsx>{combinedReviewsWidgetStyles}</style>
        <div className="fetchingImageContainer">
          <a
            href={`https://thetrustsearch.com/reviews/${this.props.domain}`}
            target="_blank"
          >
            <img src="/static/images/9.png" />
          </a>
        </div>
        <div className="fetchingTextContainer">
          <h4>Fetching your reviews...</h4>
        </div>
      </div>
    );
  };

  renderTextReviewsSlider = () => {
    const { reviewData } = this.state;
    const success = _get(reviewData, "success", false);
    const noReviewFound = _get(reviewData, "noReviewFound", false);
    const platformReviewsObject = _get(reviewData, "platformReviewsObject", {});
    const selectedPlatform = _get(reviewData, "selectedPlatform", "");
    return (
      <div className="flexContainer">
        <style jsx>{layoutStyles}</style>
        <style jsx>{`
          .flexContainer {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
          }
          .textReviewsContainer {
            padding: 0 3% 0 3%;
            font-size:0.9rem;
            width: 95%;
            margin:0 auto;
            order: 0;
            flex: 0 1 auto;
          }
          .reviewBoxFooter{
            display:none;
          }
  
          .noReviewBox{
            text-align:left;
          }
  
          @media screen and (max-width:1110px){
            textReviewsContainer {
              width: 24.3%;
            }
          }
  
           @media screen and (max-width: 990px) {
             .flexContainer{
               justify-content:space-around;
             }
            .flexContainer > textReviewsContainer {
              width: 40%;
            }
           }
  
           @media screen and (max-width: 599px){
             .textReviewsContainer{
               width:81.5%;
               margin:0 auto;
             }
             .reviewBoxFooter{
               display:block;
               margin-top:8px;
             }
             .noReviewBox{
               text-align:center;
             }
           }
          }
        `}</style>
        <div className="textReviewsContainer">
          <Head>
            <link
              rel="stylesheet"
              type="text/css"
              charset="UTF-8"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            <link
              href="/static/css/slick.css"
              type="text/css"
              rel="stylesheet"
            />
          </Head>
          <div className="reviewBoxSlider">
            {Object.keys(platformReviewsObject).length > 0 &&
            success &&
            selectedPlatform ? (
              <Slider {...settings}>{this.renderSliderBoxes()}</Slider>
            ) : noReviewFound ? (
              this.renderNoReviewsBox()
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  renderNoReviewsBox = () => {
    return (
      <div className="noReviewsFoundContainer">
        <style jsx>{combinedReviewsWidgetStyles}</style>
        <div className="noReviewsFoundImageContainer">
          <a
            href={`https://thetrustsearch.com/reviews/${this.props.domain}`}
            target="_blank"
          >
            <img src="/static/images/gradientLogo.png" />
          </a>
        </div>
        <div className="noReviewFoundTextContainer">
          <h4>No Reviews Found !</h4>
        </div>
      </div>
    );
  };

  renderSliderBoxes = () => {
    const { reviewData } = this.state;
    const selectedPlatform = _get(reviewData, "selectedPlatform", "");
    const platformReviewsObject = _get(reviewData, "platformReviewsObject", {});
    const alternateURL =
      _get(platformReviewsObject[selectedPlatform], "businessProfile", "") ||
      _get(platformReviewsObject[selectedPlatform], "url", "");
    const selectedPlatformReviews = _get(
      platformReviewsObject[selectedPlatform],
      "reviews",
      []
    );
    if (selectedPlatform && selectedPlatformReviews.length > 0) {
      return selectedPlatformReviews.map(item => {
        const review_url = _get(item, "review_url", "");
        return (item || {}).text || (item || {}).review ? (
          <div key={uuid()}>
            <ReviewBox
              review={item}
              styles={{ height: "170px" }}
              reviewRatingStyles={{ margin: "8px 0 8px 0" }}
              reviewHeaderStyles={{ marginTop: "0px" }}
              domain={this.props.domain}
              platformId={
                selectedPlatform !== "google" ? selectedPlatform : "0"
              }
              redirectURL={review_url ? review_url : alternateURL}
            />
          </div>
        ) : null;
      });
    }
  };

  renderStatsFooter = () => {
    const { reviewData } = this.state;
    const overallRating = _get(reviewData, "overallRating", "");
    const totalReviews = _get(reviewData, "totalReviews", "");
    return (
      <div className="statsFooterContainer">
        <style jsx>{combinedReviewsWidgetStyles}</style>
        {overallRating ? (
          <div className="row">
            <div className="col-md-6">
              <div className="ratingContainer">
                <div className="row">
                  <div className="col-md-2">
                    <div className="textualRating">
                      <h3>{overallRating}/5</h3>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className="starRatingContainer">
                      <RatingIndicators
                        rating={Number(overallRating) || 0}
                        typeOfWidget="star"
                        widgetRatedColors={
                          ratingColor[Math.round(Number(overallRating)) || 0]
                        }
                        widgetDimensions="35px"
                        widgetSpacings="1px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="footerFlex">
                <div style={{ alignSelf: "center" }}>
                  <div className="totalReviewsTextContainer">
                    {totalReviews ? (
                      <h4 style={{ marginBottom: "0px" }}>
                        Based on <span className="bold">{totalReviews}</span>{" "}
                        reviews at{" "}
                      </h4>
                    ) : null}
                  </div>
                </div>
                <div>
                  <div className="footerLogoContainer">
                    <a href="https://thetrustsearch.com" target="_blank">
                      <img src="/static/images/gradientLogo.png" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              {this.renderSmallFooter(totalReviews)}
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  renderSmallFooter = totalReviews => {
    return (
      <div className="smallFooterContainer">
        <style jsx>{combinedReviewsWidgetStyles}</style>
        <div className="smallFooterText">
          Based on <span>{totalReviews}</span> reviews at
        </div>
        <div className="smallFooterImageContainer">
          <a href="https://thetrustsearch.com" target="_blank">
            <img src="/static/images/gradientLogo.png" />
          </a>
        </div>
      </div>
    );
  };

  render() {
    return (
      <>
        <div style={{ marginBottom: "10px" }}>
          {this.renderPlatformSlider()}
        </div>
        <div>{this.renderTextReviewsSlider()}</div>
        <div>{this.renderStatsFooter()}</div>
      </>
    );
  }
}

CombinedReviewsWidget.getInitialProps = async ({ query }) => {
  const searchURL = (await query.businessunitId)
    ? `${query.businessunitId}`
    : "google.com";
  const maxReviews = (await query.maxReviews) ? `${query.maxReviews}` : 20;
  const newerThanMonths = (await query.newerThanMonths)
    ? `${query.newerThanMonths}`
    : 2;
  const platformId = (await query.platformId) ? `${query.platformId}` : "";
  const rating = (await query.rating) ? `${query.rating}` : 1;
  return { domain: searchURL, maxReviews, newerThanMonths, platformId, rating };
};

export default CombinedReviewsWidget;
