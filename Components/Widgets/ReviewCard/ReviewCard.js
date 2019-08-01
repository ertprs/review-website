import React from "react";
import AmpImgWrapper from "../../AmpWrappers/AmpImgWrapper";
import RatingsBadge from "../RatingsBadge/RatingsBadge";
import RatingIndicators from "../RatingIndicators/RatingIndicators";
import { reviewCardStyles } from "./reviewCardStyles";
//ToDo: replace static content with props after testing.

const ReviewCard = props => {
  const {avatar, date, name, score, text} = props;
  return (
    <div className="reviewCardContainer">
      <style jsx>{reviewCardStyles}</style>
      <div className="reviewProfilePic">
        <div className="reviewPicContainer">
          <AmpImgWrapper
            src={avatar}
            alt="avatar"
            style={{ maxWidth: "100%", height: "auto", borderRadius: "50%" }}
            layout="responsive"
            height={props.ampImgHeight}
            width={props.ampImgWidth}
            ampImgStyles={{ maxWidth: "100%", height: "auto", borderRadius: "50%" }}
          />
        </div>
      </div>
      <div className="reviewDetails">
        <div className="reviewerName">{name}</div>
        <div className="reviewRatings">
          {/* TODO: change the static values for rating widgets */}
          <div className="badge">
            <RatingsBadge
              ratingCount={"4.5"}
              style={{ padding: "5% 7% 5% 7%" }}
            />
          </div>
          <div className="rating">
            <RatingIndicators
              rating={Number("4.5")}
              typeOfWidget="star"
              widgetRatedColors="#febe42"
              widgetDimensions="20px"
              widgetSpacings="0px"
            />
          </div>
          <div className="date">
              <div>
                  <i className="fa fa-calendar-o"></i> {date}
              </div>
          </div>
        </div>
        <div className="reviewText">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
