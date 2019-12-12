import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import Slider from "react-slick";
import ReviewBox from "../../../Components/Widgets/ReviewBox/ReviewBox";
import PusherDataComponent from "../../../Components/PusherDataComponent/PusherDataComponent";
import RatingIndicators from "../../../Components/Widgets/RatingIndicators/RatingIndicators";
import { ratingColor } from "../../../utility/ratingTypeColor";
import Head from "next/head";
import uuid from "uuid/v1";
import { layoutStyles } from "../../../style";
import axios from "axios";
import Link from "next/link";
import _get from "lodash/get";
import isEmpty from "lodash/isEmpty";

const settings = {
  infinite: true,
  dots: false,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0
  // adaptiveHeight:true
};

class TextReviewsWithScores extends React.Component {
  state = {
    reviewData: {}
  };

  componentDidMount() {
    if (this.props.domain) {
      const platformId = _get(this.props, "platformId", 0);
      let requestURL = "";
      if (platformId === "0" || platformId === 0) {
        requestURL = `${process.env.BASE_URL}/api/reviews/domain?perPage=24&page=1&domain=${this.props.domain}`;
      } else {
        requestURL = `${process.env.BASE_URL}/api/reviews/domain?perPage=24&page=1&domain=${this.props.domain}&platform=${platformId}`;
      }
      axios
        .get(requestURL)
        .then(res => {
          if (platformId === 0 || platformId === "0") {
            if (!isEmpty(res.data)) {
              const reviews = _get(res, "data.reviews", []);
              if (reviews && Array.isArray(reviews)) {
                if (reviews.length > 0) {
                  this.setState({ reviewData: { ...res.data } });
                } else {
                  this.setState({ reviewData: { noReviewFound: true } });
                }
              }
            }
          } else {
            if (!isEmpty(res.data)) {
              if (!isEmpty(res.data.data)) {
                const reviews = _get(res, "data.data.reviews", []);
                if (reviews && Array.isArray(reviews)) {
                  if (reviews.length > 0) {
                    this.setState({
                      reviewData: { ...res.data.data, url: res.data.url }
                    });
                  } else {
                    this.setState({ reviewData: { noReviewFound: true } });
                  }
                }
              }
            }
          }
        })
        .catch(error => {
          this.setState({ reviewData: { success: false } });
          let success = _get(error, "response.data.success", false);
          if (!success) {
            this.setState({
              reviewData: { rating: "0", reviews: [], total: 0, next: "" }
            });
          }
        });
    }
  }

  retrieveRequiredData = reviewData => {
    const ratings = Number(_get(reviewData, "rating", 0));

    const totalReviews =
      _get(reviewData, "googleTotal") || _get(reviewData, "total", "");

    const reviews = _get(reviewData, "reviews", []);

    const redirectURL = _get(reviewData, "url", "https://thetrustsearch.com");

    const noReviewFound = _get(reviewData, "noReviewFound", "");

    return { ratings, totalReviews, reviews, redirectURL, noReviewFound };
  };

  renderSliderBoxes = requiredData => {
    let totalReviews = _get(requiredData, "totalReviews", 0);
    let output = requiredData.reviews.map(item => {
      const review_url = _get(item, "review_url", "");
      return (item || {}).text || (item || {}).review ? (
        <div key={uuid()}>
          <ReviewBox
            review={item}
            styles={{ height: "170px" }}
            reviewRatingStyles={{ margin: "8px 0 8px 0" }}
            reviewHeaderStyles={{ marginTop: "0px" }}
            domain={this.props.domain}
            platformId={this.props.platformId}
            redirectURL={review_url ? review_url : requiredData.redirectURL}
          />
        </div>
      ) : null;
    });

    return totalReviews > 26
      ? [
          output,
          <div key={uuid()}>
            <ReviewBox
              readMoreBox={true}
              styles={{ height: "170px" }}
              domain={this.props.domain}
              platformId={this.props.platformId}
            />
          </div>
        ]
      : output;
  };

  renderWidget = (reviewData, settings, domain) => {
    let requiredData = this.retrieveRequiredData(reviewData);
    return (
      <div className="widgetBox">
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
        </Head>
        <style jsx>{layoutStyles}</style>
        <style jsx>
          {`
                .widgetContainer{
                  max-width:100%;
                  height:auto;
                }
                .widgetBox {
                  box-shadow: 0px 2px 4px #d1d1d1;
                  background:#fff;
                  padding: 3% 4% 4% 4%;
                  border-radius: 6px;
                  -webkit-border-radius: 10px;
                  -moz-border-radius: 10px;
                  -ms-border-radius: 10px;
                  -o-border-radius: 10px;
                   height:100%;
                   max-width:99%;
                   margin:0 auto;
                }
                .widgetImgContainer {
                  height: 80px;
                  width: 100%;
                  margin-top: 5px;
                  text-align-center;
                  
                }
                .reviewHeader {
                  display: flex;
                  margin-bottom:25px;
                }
  
                .textRatings{
                  margin-top:7px;
                }
  
                .reviewHeader > div {
                  flex-basis: 50%;
                }
  
                .ratingsContainer {
                  text-align: right;
                }
  
                .reviewBoxSlider{
                  margin: 3% 0 0% 0;
                }
  
                @media screen and (min-width:408px){
                 .widgetBox{
                  // padding:0;
                  width:60%;
                  margin:0 auto;
                  // height:50%;
                  border-radius:4px;
                  box-shadow:none;
                 }
                 .reviewHeader{
                   margin-bottom:0;
                 }
                .ratingsContainer{
                  display:none;
                }
                .reviewHeader{
                  flex-basis:100% !important;
                  text-align:center;
                }
                .reviewsCountContainer{
                  flex-basis:100% !important;
                }
                .reviewBoxSlider{
                  margin-top:0;
                  margin:0 auto;
                  width:99%;
                }
                }
  
                @media screen and (max-width:279px){
                  .reviewHeader{
                    flex-direction:column;
                  }
                  .reviewHeader > div{
                    flex-basis:100%;
                  }
                  .reviewHeader{
                    margin-bottom:12px;
                  }
                  .ratingsContainer{
                    text-align:center;
                  }
                  .textRatings{
                    display:none;
                  }
                  .starRatings{
                    display:none;
                  }
                }
  
                @media screen and (max-width:200px){
                  // .reviewsCountContainer{
                  //   display:none;
                  // }
                  .reviewBoxSlider{
                    display:none;
                  }
                  .widgetImgContainer{
                    height:40px;
                  }
                }
  
                // @media screen and (max-width:279px){
                //   .starRatings{
                //     display:none;
                //   }
                // }
                // @media screen and (max-width:252px){
                //   .widgetBox{
                //     display:none;
                //   }
                }
              `}
        </style>
        {/* <div className="widgetBox"> */}
        <div className="widgetImgContainer">
          <Link href="https://thetrustsearch.com">
            <a target="_blank">
              <img
                src="/static/business/index/images/gradientLogo.png"
                alt="logo"
                style={{
                  maxWidth: "100%",
                  height: "57%",
                  margin: "0 auto",
                  display: "block"
                }}
              />
            </a>
          </Link>
        </div>
        {requiredData.totalReviews !== "" && requiredData.totalReviews > 0 ? (
          <div className="reviewHeader">
            <div className="reviewsCountContainer">
              <div>
                <h5>Trusted Site !</h5>
              </div>
              <div>
                <span style={{ fontWeight: "bold", marginLeft: "4px" }}>
                  {requiredData.totalReviews}
                </span>{" "}
                reviews
              </div>
            </div>
            <div className="ratingsContainer">
              <div className="starRatings">
                <RatingIndicators
                  rating={Number((requiredData || {}).ratings) || 0}
                  typeOfWidget="star"
                  widgetRatedColors={
                    ratingColor[
                      Math.round(Number((requiredData || {}).ratings)) || 0
                    ]
                  }
                  widgetDimensions="23px"
                  widgetSpacings="0.5px"
                />
              </div>
              <div className="textRatings">
                <span style={{ fontWeight: "bold" }}>
                  {requiredData.ratings}/5
                </span>{" "}
                Average
              </div>
            </div>
          </div>
        ) : null}
        <div className="reviewBoxSlider">
          {requiredData.totalReviews > 0 ? (
            <Slider {...settings}>
              {this.renderSliderBoxes(requiredData)}
            </Slider>
          ) : requiredData.noReviewFound ? (
            <h5 style={{ textAlign: "center" }}>No reviews Found</h5>
          ) : (
            <div style={{ textAlign: "center" }}>
              <img
                src="/static/images/preloader.gif"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  render() {
    return (
      <>
        {this.renderWidget(this.state.reviewData, settings, this.props.domain)}
      </>
    );
  }
}

TextReviewsWithScores.getInitialProps = async ({ query }) => {
  const searchURL = query.businessunitId
    ? `${query.businessunitId}`
    : "google.com";
  const platformId = (await query.platformId) ? `${query.platformId}` : "0";
  return { domain: searchURL, platformId };
};

export default TextReviewsWithScores;
