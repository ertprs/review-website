import React from "react";
import { reviewBoxStyles } from "./reviewBoxStyles.js";
import stringHelpers from "../../../utility/stringHelpers";
import ReviewCard from "../ReviewCard/ReviewCard";
import RatingIndicators from "../../Widgets/RatingIndicators/RatingIndicators";
import { ratingColor } from "../../../utility/ratingTypeColor";
import StarRatings from "react-star-ratings";
import moment from "moment";
import {widgetsLogoConstants} from "../../../utility/constants/widgetsLogoConstants";
import _get from 'lodash/get';
import Link from "next/link";

const renderTextualReviewBox = (
  review,
  reviewRatingStyles,
  reviewHeaderStyles,
  domain,
  platformId,
  redirectURL
) => {
  let name = review.name.replace(/\s+/gim, " ");
  let text = _get(review, "text", "") || _get(review, "review", "");
  let date = _get(review, "date", "");
  let logo = "";
  let logoTitle = "";
  if(widgetsLogoConstants[Number(platformId)]){
    logo = widgetsLogoConstants[Number(platformId)].imageLogo;
    logoTitle = widgetsLogoConstants[Number(platformId)].name;
  }
  if (name) {
    let parsedName = name.split(" ");
    if (parsedName[0]) {
      name = parsedName[0];
      if (parsedName[1]) {
        name = name + " " + parsedName[1][0] + ".";
      }
    }
  }
  return (
    <div>
      <style jsx>{reviewBoxStyles}</style>
      <div className="reviewHeader" style={{ ...reviewHeaderStyles }}>
        <div className="reviewHeaderTitle">
          <Link href={redirectURL}>
            <a target="_blank">
              <img
                src={`/static/images/${logo}`}
                style={{
                  height: "10px",
                  width: "10px",
                  marginRight: "10px",
                  display: "inline-block"
                }}
                title={logoTitle}
              />
            </a>
          </Link>
          {name}
        </div>
        <div className="reviewHeaderDate" style={{textAlign:"right"}}>
          {/* {stringHelpers("shortenMonths", review.date)} */}
          {date ? moment(date).format("DD/MM/YYYY") : null}
        </div>
      </div>
      <div className="reviewRatings" style={{ ...reviewRatingStyles }}>
        <div>
          <RatingIndicators
            rating={Number((review || {}).rating) || 0}
            typeOfWidget="star"
            widgetRatedColors={
              ratingColor[Math.round(Number(review.rating)) || 0]
            }
            widgetDimensions="20px"
            widgetSpacings="1px"
          />
        </div>
      </div>
      <div className="reviewText">
        <p>
          <Link href={redirectURL}>
            <a
              target="_blank"
              style={{ textDecoration: "none", color: "#000" }}
            >
              {text.replace(/\s+/gim, " ") !== null && text
                ? text.length <= 95
                  ? text.replace(/\s\s+/g, " ")
                  : text.substring(0, 80).replace(/\s\s+/g, " ") + "..."
                : "no textual review"}
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

const renderTrustDontTrustReviewBox = review => {
  return (
    <div>
      <style jsx>{reviewBoxStyles}</style>
      <div className="reviewHeader">
        <div className="reviewHeaderTitle">
          {review.name.length > 7
            ? review.name.substring(0, 7) + ".."
            : review.name}
        </div>
        <div style={{ textAlign: "center" }}>
          {/* <div style={{ maxWidth: "22px", height: "auto" }}>
              <img
                src={`/static/images/${review.image}.svg`}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div> */}
          <i
            className={`fa fa-${
              review.image === "trust"
                ? "thumbs-up trustIconGreen"
                : "thumbs-down trustIconRed"
            }`}
            style={{ fontSize: "1.2rem" }}
          ></i>
        </div>
        {/* <div className="reviewHeaderDate">
          {stringHelpers("shortenMonths", review.date)}
        </div> */}
      </div>
      <div className="reviewRatings">
        <div className="trustDontTrustIconContainer">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                textTransform: "capitalize",
                textAlign: "left",
                flexBasis: "100%",
                fontWeight: "bold"
              }}
            >
              {review.image === "trust" ? (
                <span className="trustIconGreen">Trust</span>
              ) : (
                <span className="trustIconRed">Don't Trust</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="reviewText">
        <p>
          {review.text.length <= 100
            ? review.text
            : review.text.substring(0, 97) + "..."}
        </p>
      </div>
    </div>
  );
};

const renderVideoReviewBox = () => {
  return (
    <div>
      <style jsx>{reviewBoxStyles}</style>
      <div>
        <iframe
          src="https://www.youtube.com/embed/MooRiiNG4j4"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="vid"
          frameBorder="0"
          style={{ width: "100%", height: "133px" }}
        />
      </div>
      <div className="videoCaption">
        <h6 style={{ marginBottom: "0" }}>
          Decent experience with this site...
        </h6>
      </div>
      <div className="videoReviewRatings">
        <div>
          <StarRatings
            rating={4}
            starRatedColor="#21bc61"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="0px"
          />
        </div>
      </div>
    </div>
  );
};
const ReviewBox = props => {
  return props.video ? (
    <div className="reviewVideoBox">
      <style jsx>{reviewBoxStyles}</style>
      {renderVideoReviewBox()}
    </div>
  ) : props.trustDontTrust ? (
    <div className="reviewBox">
      <style jsx>{reviewBoxStyles}</style>
      {renderTrustDontTrustReviewBox(props.review)}
    </div>
  ) : (
    <div className="reviewBox" style={{ ...props.styles }}>
      <style jsx>{reviewBoxStyles}</style>
      {renderTextualReviewBox(
        props.review,
        props.reviewRatingStyles,
        props.reviewHeaderStyles,
        props.domain,
        props.platformId,
        props.redirectURL
      )}
    </div>
  );
};

export default ReviewBox;
