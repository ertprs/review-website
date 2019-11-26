import React from "react";
import { reviewListStyles } from "../Widgets/MyReviewsUser/myReviewsStyles";
import RatingIndicators from "../Widgets/RatingIndicators/RatingIndicators";
import { ratingColor } from "../../utility/ratingTypeColor";
import _get from "lodash/get";
import moment from "moment";
import Avatar from "react-avatar";

const renderIcon = provider => {
  let src = "";
  switch (provider) {
    case "trustsearch":
      src = "/static/images/logo_footer.png";
      break;
    case "google":
      src = "/static/images/googleIcon.png";
      break;
    case "facebook":
      src = "/static/images/facebookicon.png";
      break;
    case "trustpilot":
      src = "/static/images/trustpiloticon.png";
      break;
    case "trustedshops":
      src = "/static/images/trustedShopLogo.jpg";
      break;
    case "wot":
      src = "/static/images/wotLogo.png";
      break;
    default:
      src = "";
  }
  return (
    <img
      src={src}
      alt="icon"
      style={{
        height: "15px",
        width: "15px",
        marginRight: "10px"
      }}
    />
  );
};

const ReviewCard = ({ review, provider }) => {
  const { name, text, rating, date } = review;
  return (
    <div className="reviewCard">
      <style jsx> {reviewListStyles}</style>
      <style jsx>{`
        .smallDate {
          display: none;
        }

        .dateContainer {
          text-align: right;
          margin: 20px 40px 0px 0px;
          font-weight: bold;
        }
        .ratingContainer {
          margin-top: 10px;
        }

        .userName {
          font-weight: bold;
        }

        .mr-10 {
          margin-right: 10px;
        }
      `}</style>
      <div>
        {provider === "wot" ? (
          <div className="dateContainer">
            <span className="fullDate">
              {moment(date).format("DD/MM/YYYY")}
            </span>
            <span className="smallDate">{moment(date).format("YYYY")}</span>
          </div>
        ) : null}
      </div>
      <div className="row topBox">
        <div className="col-md-6 ratingBox">
          <div className="row">
            <div className="col-md-4">
              <Avatar
                style={{ marginRight: "20px" }}
                name={name || "Not Found"}
                size="50"
                round={true}
              />
            </div>
            <div className="col-md-8 ratingContainer">
              <RatingIndicators
                rating={Number(rating) || 0}
                typeOfWidget="star"
                widgetRatedColors={ratingColor[Math.round(Number(rating)) || 0]}
                widgetDimensions="21px"
                widgetSpacings="1px"
              />
              <p className="userName">{name || ""}</p>
              {date ? (
                <div>
                  <span className="mr-10">
                    {moment(date).format("DD/MM/YYYY")}
                  </span>
                  <span className="mr-10">on</span>
                  <span>{renderIcon(provider)}</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div>
            <div>
              <span
                className={`${
                  provider === "wot" ? "reviewText wordBreak" : "reviewText"
                }`}
              >
                {text || ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
