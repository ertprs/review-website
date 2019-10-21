import React from "react";
import { reviewBoxStyles } from "./reviewBoxStyles.js";
import stringHelpers from "../../../utility/stringHelpers";
import ReviewCard from "../ReviewCard/ReviewCard";
import StarRatings from "react-star-ratings";
import {googleMapsURL} from "../../../utility/config";
const renderTextualReviewBox = (review, reviewRatingStyles, reviewHeaderStyles, domain) => {
  return (
    <div>
      <style jsx>{reviewBoxStyles}</style>
      <div className="reviewHeader" style={{...reviewHeaderStyles}}>
        <div className="reviewHeaderTitle">
          {/* {review.name.length > 7
            ? review.name.substring(0, 7) + ".."
            : review.name} */}
            {review.name.replace(/\s\s+/g, ' ')}
        </div>
        {/* <div className="reviewHeaderDate">
          {stringHelpers("shortenMonths", review.date)}
          In the css change flex-basis to 50%
        </div> */}
      </div>
      <div className="reviewRatings" style={{...reviewRatingStyles}}>
        <div>
          <StarRatings
            rating={review.rating}
            starRatedColor="#21bc61"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="1px"
          />
        </div>
      </div>
      <div className="reviewText">
        <p>
          <a href={`${googleMapsURL}/${domain}`} target="_blank" style={{textDecoration:"none", color:"#000"}}>
          {review.text.length <= 95
            ? review.text.replace(/\s\s+/g, ' ')
            : review.text.substring(0, 93).replace(/\s\s+/g, ' ') + "..."}
          </a>
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
        <div style={{textAlign:"center"}}>
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
            }`} style={{fontSize:"1.2rem"}}
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
                fontWeight:"bold"
              }}
            >
              {review.image ==="trust" ? <span className="trustIconGreen">Trust</span> : <span className="trustIconRed">Don't Trust</span>}
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
    <div className="reviewBox" style={{...props.styles}}>
      <style jsx>{reviewBoxStyles}</style>
      {renderTextualReviewBox(props.review, props.reviewRatingStyles, props.reviewHeaderStyles, props.domain)}
    </div>
  );
};

export default ReviewBox;
