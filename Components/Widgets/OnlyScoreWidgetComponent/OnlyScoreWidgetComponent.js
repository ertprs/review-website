import React from "react";
import { layoutStyles } from "../../../style";
import {onlyScoreWidgetComponentStyles} from './onlyScoreWidgetComponentStyles';
import StarRatings from "react-star-ratings";

const renderStandAloneWidget = requiredData => {
  console.log(requiredData.ratings)
  return (
    <div className="widgetBox">
      <style jsx>{layoutStyles}</style>
      <style jsx>
       {onlyScoreWidgetComponentStyles}
      </style>
      <div className="widgetHeader">
        <h3 className="widgetHeading">Trusted site!</h3>
      </div>
      <div className="ratingText">
        <h4 className="widgetRating">{requiredData.ratings} / 5</h4>
      </div>

      <div className="ratingIndicator">
        {requiredData.ratings!=="" ? <StarRatings
          rating={Number(requiredData.ratings)}
          starRatedColor="#21bc61"
          starDimension="40px"
          starSpacing="3px"
          numberOfStars={5}
          name="rating"
        /> : "Loading..."}
      </div>

      <div className="smallRatingIndicator">
        {requiredData.ratings!=="" ? <StarRatings
          rating={Number(requiredData.ratings)}
          starRatedColor="#21bc61"
          starDimension="25px"
          starSpacing="3px"
          numberOfStars={5}
          name="rating"
        /> : "Loading..."}
      </div>

      <div className="ratingBasis">
        <div>
          Based on{" "}
          <span style={{ fontWeight: "bold" }}>
            {requiredData.totalReviews}
          </span>{" "}
          reviews.
        </div>
        <div>
          <a href="https://thetrustsearch.com" className="learnMoreLink" target="_blank">
            Learn More
          </a>
        </div>
      </div>

      <div>
        <div className="widgetImgContainer">
          <img
            src="/static/business/index/images/gradientLogo.png"
            alt="logo"
            style={{
              maxWidth: "100%",
              height: "57%",
              margin: "0 auto"
            }}
          />
        </div>
      </div>
    </div>
  );
};

const renderCarouselVariant = requiredData => {

  return (
    <div className="carouselWidgetBox">
      <style jsx>{layoutStyles}</style>
      <style jsx>
        {onlyScoreWidgetComponentStyles}
      </style>
      
      <div className="ratingText">
        <h5 className="widgetRating">{requiredData.ratings} / 5</h5>
      </div>

      <div className="carouselRatingIndicator">
        {requiredData.ratings!=="" ? <StarRatings
          rating={Number(requiredData.ratings)}
          starRatedColor="#21bc61"
          starDimension="33px"
          starSpacing="1.5px"
          numberOfStars={5}
          name="rating"
        /> : "Loading...."}
      </div>
      <div className="widgetHeader">
        <h5 className="widgetHeading">Trusted site!</h5>
      </div>
      <div className="carouselSmallRatingIndicator">
        {requiredData.ratings!=="" ? <StarRatings
          rating={Number(requiredData.ratings)}
          starRatedColor="#21bc61"
          starDimension="23px"
          starSpacing="1.5px"
          numberOfStars={5}
          name="rating"
        /> : "Loading...."}
      </div>

      <div className="carouselRatingBasis">
        <div>
          <span style={{ fontWeight: "bold" }}>
            {requiredData.totalReviews}
          </span>{" "}
          reviews
        </div>
      </div>

      <div>
        <div className="carouselWidgetImgContainer">
          <img
            src="/static/business/index/images/gradientLogo.png"
            alt="logo"
            style={{
              maxWidth: "100%",
              height: "100%"
            }}
          />
        </div>
      </div>
    </div>
  );
};

const OnlyScoreWidgetComponent = ({requiredData, variant}) => {
  return <>
    {variant==="carousel" ? renderCarouselVariant(requiredData) : renderStandAloneWidget(requiredData)}
  </>;
};

export default OnlyScoreWidgetComponent;
