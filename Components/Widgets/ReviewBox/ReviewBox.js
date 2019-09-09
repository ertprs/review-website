import React from "react";
import { reviewBoxStyles } from "./reviewBoxStyles.js";
import stringHelpers from '../../../utility/stringHelpers';
import StarRatings from "react-star-ratings";
const renderTextualReviewBox = (review) => {
  return (
    <div>
      <style jsx>{reviewBoxStyles}</style>
      <div className="reviewHeader">
        <div className="reviewHeaderTitle">{review.name.length > 7 ? review.name.substring(0, 7)+".." : review.name}</div>
        <div className="reviewHeaderDate">{stringHelpers("shortenMonths", review.date)}</div>
      </div>
      <div className="reviewRatings">
        <div>
          <StarRatings
            rating={((review.score)/20)}
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
          {review.text.length <= 100 ? review.text : review.text.substring(0,97)+"..."}
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
          style={{width:"100%", height:"133px"}}
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
const ReviewBox = (props) => {
  return props.video ? (
    <div className="reviewVideoBox">
      <style jsx>{reviewBoxStyles}</style>
      {renderVideoReviewBox()}
    </div>
  ) : (
    <div className="reviewBox">
      <style jsx>{reviewBoxStyles}</style>
      {renderTextualReviewBox(props.review)}
    </div>
  );
};

export default ReviewBox;
