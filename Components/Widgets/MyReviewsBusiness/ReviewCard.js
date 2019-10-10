import React, { useState } from "react";
import { reviewListStyles } from "./myReviewsStyles";
import RatingIndicators from "../RatingIndicators/RatingIndicators";
import ReplyBox from "./ReplyBox";

const ReviewCardBusiness = props => {
  const [showReply, setShowReply] = useState(false);
  return (
    <div className="reviewCard">
      <style jsx> {reviewListStyles}</style>
      <div className="row topBox">
        <div className="col-md-3">
          <div>
            <RatingIndicators
              rating={props.rating}
              typeOfWidget="star"
              widgetRatedColors="#21bc61"
              widgetDimensions="30px"
              widgetSpacings="2px"
            />
            <p className="userName">Aiga Titokiva</p>
          </div>
        </div>
        <div className="col-md-6">
          <div>
            <div>
              <span className="cardLink">This will be any link!!</span>
              <br />
              <span>Any sub text</span>
            </div>
            <p className="source">
              Source: <span>Organic</span>
            </p>
          </div>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-2 dateContainer">
          <p className="date">Aug 16, 2019</p>
        </div>
      </div>
      <div className="row bottomBox">
        <div className="col-md-2"></div>
        <div className="col-md-9">
          <div className="bottomBoxInner">
            <div
              className="footerLinks"
              onClick={() => setShowReply(!showReply)}
            >
              <p>
                <i className="fa fa-share icons"></i>Reply
              </p>
            </div>
            <div className="footerLinks">
              <p>
                <i className="fa fa-share-alt icons"></i>Share
              </p>
            </div>
            <div className="footerLinks">
              <p>
                <i className="fa fa-search icons"></i>Find Reviewer
              </p>
            </div>
            <div className="footerLinks">
              <p>
                <i className="fa fa-flag icons"></i>Report
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
      {showReply ? <ReplyBox /> : ""}
    </div>
  );
};

export default ReviewCardBusiness;
