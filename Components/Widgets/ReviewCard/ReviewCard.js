import React from "react";
import AmpImgWrapper from "../../AmpWrappers/AmpImgWrapper";
import RatingsBadge from "../RatingsBadge/RatingsBadge";
import RatingIndicators from "../RatingIndicators/RatingIndicators";
import uuid from 'uuid/v1';
import { reviewCardStyles } from "./reviewCardStyles";

const renderReviewCard = ({ avatar, date, name, score, text, variant, ampImgHeight, ampImgWidth, title, body, image, designation, specialistIn}) => {
  switch (variant) {
    case "reviews":
      return (
        <div className="reviewCardContainer">
          <style jsx>{reviewCardStyles}</style>
          <div className="reviewProfilePic">
            <div className="reviewPicContainer">
              <AmpImgWrapper
                src={avatar}
                alt="avatar"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "50%"
                }}
                layout="responsive"
                height={ampImgHeight}
                width={ampImgWidth}
                ampImgStyles={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "50%"
                }}
              />
            </div>
          </div>
          <div className="reviewDetails">
            <div className="reviewerName">{name}</div>
            <div className="reviewRatings">
              <div className="badge">
                <RatingsBadge
                  ratingCount={score}
                  style={{ padding: "5% 7% 5% 7%" }}
                />
              </div>
              <div className="rating">
                <RatingIndicators
                  rating={score}
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

    case "business":
      return (
        <div className="reviewCardContainer">
          <style jsx>{reviewCardStyles}</style>
          <div className="businessProfilePic">
            <div className="businessPicContainer">
              <img src={image} style={{height:"auto", maxWidth:"100%"}}/>
            </div>
          </div>
          <div className="businessDetails">
            <div className="businessTitle">{title}</div>
            <div className="businessText">
              <p>{body}</p>
            </div>
          </div>
        </div>
      );
    
    case "team":
      return(
        <div className="reviewCardContainer">
          <style jsx>{reviewCardStyles}</style>
          <div className="businessProfilePic">
            <div className="businessPicContainer">
              <img src={image} style={{height:"auto", maxWidth:"100%"}}/>
            </div>
          </div>
          <div className="businessDetails">
            <div className="individualName">{name.substring(0,name.indexOf(" "))}</div>
            <div className="individualName">{name.substring(name.indexOf(" "), name.length)}</div>
            <div className="individualDesignation">{designation}</div>
            <div className="individualSpecialization">
              {specialistIn.length > 0 ? specialistIn.map(item=>{
                return <div className="specializationItem" key={uuid()}>{item}</div>
              }): null}
            </div>
            {/* specialistIn */}
          </div>
        </div>
      )

    default:
      return null;
  }
};

const ReviewCard = props => {
  return(
    <>
      {renderReviewCard(props)}
    </>
  )
};

export default ReviewCard;
