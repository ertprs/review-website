import React from "react";
import { reviewListStyles } from "../../../../../Widgets/MyReviewsUser/myReviewsStyles";
import RatingIndicators from "../../../../../Widgets/RatingIndicators/RatingIndicators";
import _get from "lodash/get";

const GoogleReviewCard = ({ review, provider }) => {
  const { name, text, rating } = review;

  return (
    <div className="reviewCard">
      <style jsx> {reviewListStyles}</style>
      <div style={{ textAlign: "right", margin: "7px 20px 0px 0px" }}>
        {/* <i style={{ color: "#DB4437" }} className="fa fa-google"></i> */}
      </div>
      <div className="row topBox">
        <div className="col-md-4 ratingBox">
          <div>
            <RatingIndicators
              rating={Number(rating) || 0}
              typeOfWidget="star"
              widgetRatedColors="#21bc61"
              widgetDimensions="22px"
              widgetSpacings="2px"
            />
            <p className="userName">
              {provider === "google" ? (
                <img
                  src="/static/images/googleIcon.png"
                  style={{ height: "10px", width: "10px", marginRight: "10px" }}
                />
              ) : provider === "wot" ? (
                <img
                  src="/static/images/wotLogo.png"
                  style={{ height: "10px", width: "10px", marginRight: "10px" }}
                />
              ) : null}
              {name || ""}
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div>
            <div>
              <span className="reviewText">{text || ""}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleReviewCard;
