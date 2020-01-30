import React from "react";
//? own imports
import { ratingColor } from "../../utility/ratingTypeColor";
//? nextjs imports
import dynamic from "next/dynamic";
//? library imports
import _get from "lodash/get";
const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false
});
import Card from "../../Components/MaterialComponents/Card";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  card: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "green"
    }
  }
}));

const ReviewPlatforms = ({
  reviewPlatforms,
  handlePlatformClick,
  overallRating,
  domainName
}) => {
  const classes = useStyles();
  let domainProfileUrl = `${process.env.DOMAIN_NAME}reviews/${domainName}`;
  return (
    <div className="container">
      <style jsx>{`
        .topOuterContainer {
          display: flex;
          max-width: 100%;
          justify-content: center;
        }

        .mb_50 {
          margin-bottom: 50px;
        }

        .mt_50 {
          margin-top: 50px;
        }

        .topInnerContainer {
          margin-top: 50px;
          width: 50%;
        }
        .ratingDomainContainer {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
        }
        .rating {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .shareExperienceContainer {
          margin-top: 50px;
        }

        .shareExperienceText {
          text-align: center;
        }
        .platformCardContainer {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
        }

        .platformCard {
          width: 45%;
          margin: 10px;
          text-align: center;
        }

        .platformCard:hover {
          cursor: pointer;
        }

        .platformName {
          font-size: 26px;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .footer {
          display: flex;
          max-width: 100%;
          justify-content: center;
        }
        .footer:hover {
          cursor: pointer;
        }
      `}</style>
      <div className="topOuterContainer">
        <div className="topInnerContainer">
          <div className="ratingDomainContainer">
            <h2>{overallRating || 0}/5</h2>
            <h2>{domainName}</h2>
          </div>
          <div className="rating">
            <StarRatings
              rating={Number(overallRating)}
              starRatedColor={
                ratingColor[Math.round(Number(overallRating)) || 0]
              }
              starDimension="60px"
              starSpacing="2px"
              numberOfStars={5}
              name="rating"
            />
          </div>
        </div>
      </div>
      <div className="shareExperienceContainer mb_50">
        <div className="shareExperienceText">
          <h4>Share your experience:</h4>
        </div>
        <div className="platformCardContainer mt_50">
          {(reviewPlatforms || []).map(platform => {
            return (
              <div
                className="platformCard"
                onClick={() =>
                  handlePlatformClick(_get(platform, "social_media_app_id", 0))
                }
              >
                <Card className={classes.card} raised={true}>
                  <span className="platformName">
                    {_get(platform, "name", "")}
                  </span>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
      <div className="footer">
        <Tooltip
          title={
            <span style={{ fontSize: "14px" }}>
              Click to see the profile of {domainName}
            </span>
          }
        >
          <div
            onClick={() => {
              if (window) {
                window.location.assign(domainProfileUrl);
              }
            }}
          >
            <img src="/static/images/logo_footer.png" />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default ReviewPlatforms;
