import React from "react";
import { reviewListStyles } from "../Widgets/MyReviewsUser/myReviewsStyles";
import RatingIndicators from "../Widgets/RatingIndicators/RatingIndicators";
import { ratingColor } from "../../utility/ratingTypeColor";
import Button from "@material-ui/core/Button";
import ShowIcon from "@material-ui/icons/VisibilityOutlined";
import HideIcon from "@material-ui/icons/VisibilityOffOutlined";
import ReplyIcon from "@material-ui/icons/Reply";
import _get from "lodash/get";
import moment from "moment";
import Avatar from "react-avatar";

const renderIcon = provider => {
  let src = "";
  //? will replace the names with socialAppId
  switch (provider) {
    case "trustsearch":
      src = "/static/images/logo_footer.png";
      break;
    case "google":
      src = "/static/images/googleIcon.png";
      break;
    case "Google Business":
      src = "/static/images/googleIcon.png";
      break;
    case 22:
      src = "/static/images/googleIcon.png";
      break;
    case "facebook":
      src = "/static/images/facebookicon.png";
      break;
    case "Facebook":
      src = "/static/images/facebookicon.png";
      break;
    case 1:
      src = "/static/images/facebookicon.png";
      break;
    case "trustpilot":
      src = "/static/images/trustpiloticon.png";
      break;
    case "TrustPilot":
      src = "/static/images/trustpiloticon.png";
      break;
    case 18:
      src = "/static/images/trustpiloticon.png";
      break;
    case "trustedshops":
      src = "/static/images/trustedShopLogo.jpg";
      break;
    case "TrustedShops":
      src = "/static/images/trustedShopLogo.jpg";
      break;
    case 19:
      src = "/static/images/trustedShopLogo.jpg";
      break;
    case "wot":
      src = "/static/images/wotLogo.png";
      break;
    case "Web Of Trust":
      src = "/static/images/wotLogo.png";
      break;
    default:
      src = "";
  }
  return (
    <>
      {src ? (
        <img
          title={provider}
          src={src}
          alt="icon"
          style={{
            height: "15px",
            width: "15px",
            marginRight: "10px"
          }}
        />
      ) : (
        ""
      )}
    </>
  );
};

const ReviewCard = ({
  review,
  provider,
  showToggleBtn,
  toggleReviewVisibility
}) => {
  let { name, text, rating, date, replyURL, id, hideFromWidget } = review;
  name = name === "N/A" ? "Anonymous" : name;
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
        .bottomBtn {
          padding: 14px;
        }
      `}</style>
      <div></div>
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
                {text || _get(review, "review", "") || ""}
              </span>
            </div>
          </div>
        </div>
      </div>
      {replyURL || showToggleBtn ? (
        <div className="row">
          {showToggleBtn ? (
            <div className="col-md-6">
              <div className="bottomBtn">
                <Button
                  color="primary"
                  startIcon={hideFromWidget === 0 ? <HideIcon /> : <ShowIcon />}
                  onClick={() => toggleReviewVisibility(id, hideFromWidget)}
                >
                  {hideFromWidget === 0
                    ? "Hide"
                    : hideFromWidget === 1
                    ? "Show"
                    : null}
                </Button>
              </div>
            </div>
          ) : null}
          {replyURL ? (
            <div className="col-md-6">
              <div className="bottomBtn">
                <Button
                  color="primary"
                  startIcon={<ReplyIcon />}
                  onClick={() => {
                    window.open(replyURL, "_blank");
                  }}
                >
                  Reply
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default ReviewCard;
