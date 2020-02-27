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
  //? we don't have platform if for trustsearch and wot(in profile page), rest are being displayed from their platformId
  switch (provider) {
    case "trustsearch":
      src = "/static/images/logo_footer.png";
      break;
    case 22:
      src = "/static/images/googleIcon.png";
      break;
    case 1:
      src = "/static/images/facebookicon.png";
      break;
    case 18:
      src = "/static/images/trustpiloticon.png";
      break;
    case 19:
      src = "/static/images/trustedShopLogo.jpg";
      break;
    case "wot":
      src = "/static/images/wotLogo.png";
      break;
    case 21:
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

//? we are passing parent to show/hide something conditionally like if we are coming from dashboard we want to show footer. There are two parents only reviewsPage and dashboard
const ReviewCard = ({ review, provider, parent, toggleReviewVisibility }) => {
  let {
    id,
    name,
    text,
    rating,
    date,
    review_url,
    hide_from_widget,
    recommended
  } = review || {};
  name = name === "N/A" ? "Anonymous" : name;

  const redirectToReview = () => {
    if (parent === "reviewsPage") {
      if (review_url) {
        window.open(review_url, "_blank");
      }
    }
  };

  return (
    <div
      className={`${
        parent === "reviewsPage" ? "reviewCard pointerCursor" : "reviewCard"
      }`}
      onClick={redirectToReview}
    >
      <style jsx> {reviewListStyles}</style>
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
              {recommended === true ? (
                <>
                  <p className="userName">
                    <span style={{ fontWeight: "bold" }}>{name || ""}</span>{" "}
                    <span
                      className={`${
                        parent === "reviewsPage" ? "displayBlock" : ""
                      }`}
                    >
                      {" "}
                      recommends.
                    </span>
                  </p>
                </>
              ) : recommended === false ? (
                <>
                  <p className="userName">
                    <span style={{ fontWeight: "bold" }}>{name || ""}</span>{" "}
                    <span
                      className={`${
                        parent === "reviewsPage" ? "displayBlock" : ""
                      }`}
                    >
                      {" "}
                      doesn't recommend.
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <RatingIndicators
                    rating={Number(rating) || 0}
                    typeOfWidget="star"
                    widgetRatedColors={
                      ratingColor[Math.round(Number(rating)) || 0]
                    }
                    widgetDimensions="21px"
                    widgetSpacings="1px"
                  />
                  <p className="userName">
                    <span style={{ fontWeight: "bold" }}>{name || ""}</span>
                  </p>
                </>
              )}
              <div>
                {date ? (
                  <span className="mr-10">
                    {moment(date).format("DD/MM/YYYY")}
                  </span>
                ) : null}
                {provider ? (
                  <>
                    <span className="mr-10">on</span>
                    <span>{renderIcon(provider)}</span>
                  </>
                ) : null}
              </div>
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
      {parent === "dashboard" ? (
        <div className="row">
          <div className="col-md-6">
            <div className="bottomBtn">
              <Button
                color="primary"
                startIcon={hide_from_widget === 0 ? <HideIcon /> : <ShowIcon />}
                onClick={() => toggleReviewVisibility(id, hide_from_widget)}
              >
                {hide_from_widget === 0
                  ? "Hide"
                  : hide_from_widget === 1
                  ? "Show"
                  : null}
              </Button>
            </div>
          </div>
          {review_url ? (
            <div className="col-md-6">
              <div className="bottomBtn">
                <Button
                  color="primary"
                  startIcon={<ReplyIcon />}
                  onClick={() => {
                    window.open(review_url, "_blank");
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
