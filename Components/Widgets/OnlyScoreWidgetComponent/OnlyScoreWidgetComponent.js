import React from "react";
import { layoutStyles } from "../../../style";
import { onlyScoreWidgetComponentStyles } from "./onlyScoreWidgetComponentStyles";
import StarRatings from "react-star-ratings";

const renderStandAloneWidget = requiredData => {
  console.log(requiredData.ratings);
  return (
    <div className="widgetBox">
      <style jsx>{layoutStyles}</style>
      <style jsx>{onlyScoreWidgetComponentStyles}</style>
      <div className="widgetHeader">
        <h3 className="widgetHeading">Trusted site!</h3>
      </div>
      <div className="ratingText">
        <h4 className="widgetRating">{requiredData.ratings} / 5</h4>
      </div>

      <div className="ratingIndicator">
        {requiredData.ratings !== "" ? (
          <StarRatings
            rating={Number(requiredData.ratings)}
            starRatedColor="#21bc61"
            starDimension="40px"
            starSpacing="3px"
            numberOfStars={5}
            name="rating"
          />
        ) : (
          "Loading..."
        )}
      </div>

      <div className="smallRatingIndicator">
        {requiredData.ratings !== "" ? (
          <StarRatings
            rating={Number(requiredData.ratings)}
            starRatedColor="#21bc61"
            starDimension="25px"
            starSpacing="3px"
            numberOfStars={5}
            name="rating"
          />
        ) : (
          "Loading..."
        )}
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
          <a
            href="https://thetrustsearch.com"
            className="learnMoreLink"
            target="_blank"
          >
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

const renderCarouselVariant = (requiredData, textReviews) => {
  return (
    <div className="carouselWidgetBox">
      <style jsx>{layoutStyles}</style>
      <style jsx>{onlyScoreWidgetComponentStyles}</style>

      <div className={`ratingText ${textReviews ? "mb mt" : ""}`}>
        <h5 className="widgetRating">{requiredData.ratings} / 5</h5>
      </div>

      <div className={`carouselRatingIndicator ${textReviews ? "mbs mt" : ""}`}>
        {requiredData.ratings !== "" ? (
          <StarRatings
            rating={Number(requiredData.ratings)}
            starRatedColor="#21bc61"
            starDimension="33px"
            starSpacing="1.5px"
            numberOfStars={5}
            name="rating"
          />
        ) : (
          "Loading...."
        )}
      </div>
      <div className="widgetHeader">
        {!textReviews ? <h5 className="widgetHeading">Trusted site!</h5> : null}
      </div>
      <div className={`carouselSmallRatingIndicator ${textReviews ? "mbs mt" : ""}`}>
        {requiredData.ratings !== "" ? (
          <StarRatings
            rating={Number(requiredData.ratings)}
            starRatedColor="#21bc61"
            starDimension="23px"
            starSpacing="1.5px"
            numberOfStars={5}
            name="rating"
          />
        ) : (
          "Loading...."
        )}
      </div>

      <div className={`carouselRatingBasis ${textReviews ? "mt" : ""}`}>
        {!textReviews ? (
          <div>
            <span style={{ fontWeight: "bold" }}>
              {requiredData.totalReviews}
            </span>{" "}
            reviews
          </div>
        ) : (
          <div>
            <span>Based on </span>
            <span style={{ fontWeight: "bold" }}>
              {requiredData.totalReviews}
            </span>{" "}
            reviews at 
          </div>
        )}
      </div>

      <div>
        <div className={`${!textReviews ? "carouselWidgetImgContainer" : "carouselWidgetImgContainerV"}`}>
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

const OnlyScoreWidgetComponent = ({ requiredData, variant, textReviews }) => {
  return (
    <>
      {variant === "carousel"
        ? renderCarouselVariant(requiredData, textReviews)
        : renderStandAloneWidget(requiredData)}
    </>
  );
};

export default OnlyScoreWidgetComponent;
