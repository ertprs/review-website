import React from "react";
import { reviewListStyles } from "../../../../../Widgets/MyReviewsUser/myReviewsStyles";
import RatingIndicators from "../../../../../Widgets/RatingIndicators/RatingIndicators";
import _get from "lodash/get";
import moment from "moment";
import Avatar from "react-avatar";
import { ratingColor } from "../../../../../../utility/ratingTypeColor";

const GoogleReviewCard = ({ review, provider }) => {
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
        // @media screen and (max-width: 991px) {
        //   .fullDate {
        //     display: none;
        //   }
        //   .smallDate {
        //     display: block;
        //   }
        // }

        @media screen and (max-width: 767px) {
          // .dateContainer {
          //   margin-top: 22px;
          // }
          // .fullDate {
          //   display: block;
          // }
          // .smallDate {
          //   display: none;
          // }
          .ratingContainer {
            margin-top: 10px;
          }
        }
      `}</style>
      {/* <div style={{ textAlign: "right", margin: "7px 20px 0px 0px" }}>
        <i style={{ color: "#DB4437" }} className="fa fa-google"></i>
      </div> */}
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
              <p className="userName">
                {provider === "google" ? (
                  <img
                    src="/static/images/googleIcon.png"
                    style={{
                      height: "10px",
                      width: "10px",
                      marginRight: "10px"
                    }}
                  />
                ) : provider === "wot" ? (
                  <img
                    src="/static/images/wotLogo.png"
                    style={{
                      height: "10px",
                      width: "10px",
                      marginRight: "10px"
                    }}
                  />
                ) : provider === "trustsearch" ? (
                  <img
                    src="/static/images/logo_footer.png"
                    alt="footer logo"
                    style={{
                      height: "15px",
                      width: "15px",
                      marginRight: "10px"
                    }}
                  />
                ) : null}
                {name || ""}
              </p>
            </div>
            {/* <div>
              <RatingIndicators
                rating={Number(rating) || 0}
                typeOfWidget="star"
                widgetRatedColors="#21bc61"
                widgetDimensions="21px"
                widgetSpacings="1px"
              />
            </div> */}
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

export default GoogleReviewCard;
