import React from "react";
import RatingIndicators from "../../../../Widgets/RatingIndicators/RatingIndicators";
import Card from "../../../../MaterialComponents/Card";
import { ratingColor } from "../../../../../utility/ratingTypeColor";
import productReviewCardStyles from "./productReviewCardStyles";
import moment from "moment";

import _get from "lodash/get";

const ProductReviewCard = ({ review }) => {
  const name = _get(review, "name", "");
  const rating = _get(review, "rating", "");
  const date = _get(review, "date", "");
  const reviewText = _get(review, "review", "");
  return (
    <Card>
      <style jsx>{productReviewCardStyles}</style>
      <div className="row">
        <div className="col-md-2">
          <div className="reviewDetailsFlex">
            <div>
              <div className="reviewerName">{name}</div>
              <div className="ratingContainer">
                <RatingIndicators
                  rating={Number(rating) || 0}
                  typeOfWidget="star"
                  widgetRatedColors={
                    ratingColor[Math.round(Number(rating)) || 0]
                  }
                  widgetDimensions="25px"
                  widgetSpacings="1px"
                />
              </div>
              <div className="dateContainer">
                {moment(new Date(date)).format("DD/MM/YYYY") || null}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="logoFlex">
            <div className="logoContainer">
              <img src="/static/images/ebayLogo.png" alt="google icon" />
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="textContainer">{reviewText}</div>
        </div>
      </div>
    </Card>
  );
};

export default ProductReviewCard;
