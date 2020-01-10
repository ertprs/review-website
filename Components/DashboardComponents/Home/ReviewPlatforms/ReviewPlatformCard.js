import React from "react";
import { reviewChannelBoxStyles } from "../../GetStarted/reviewChannelBoxStyles";
//? material-ui imports
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton/IconButton";
import EditIcon from "@material-ui/icons/Edit";

export default function ReviewPlatformCard({
  url,
  name,
  socialMediaAppId,
  handleEditClick
}) {
  return (
    <>
      <Grid item xs={12} md={6} lg={6}>
        <div>
          <IconButton
            key="edit"
            aria-label="edit"
            color="inherit"
            onClick={handleEditClick}
          >
            <EditIcon />
          </IconButton>
        </div>
        <div className="reviewBoxItemContainer">
          <style jsx>{reviewChannelBoxStyles}</style>
          {/* Uncomment when start getting logo for platforms */}
          {/* <div>
            <div className="reviewBoxItemLogoContainer">
              <img src={`/static/images/${imageLogo}`} />
            </div>
          </div> */}
          <div className="reviewBoxItemTextBoxContainer">
            <span>{name}</span>
            <div>
              <a target="_blank">{url}</a>
            </div>
            <div className="reviewBoxRatingContainer">
              {/* <StarRatings
                rating={Number(ratings)}
                starRatedColor="#FFDC0F"
                starDimension="20px"
                starSpacing="0.5px"
                numberOfStars={5}
                name="rating"
              /> */}
            </div>
            {/* {socialMediaAppId === 1 ? (
              <div className="row" style={{ marginTop: "15px" }}>
                {likes ? (
                  <div className="col-md-6">
                    <span style={{ fontWeight: "bold" }}>Likes : {likes}</span>{" "}
                  </div>
                ) : null}
                {followers ? (
                  <div className="col-md-6">
                    {" "}
                    <span style={{ fontWeight: "bold" }}>
                      Followers : {followers}
                    </span>{" "}
                  </div>
                ) : null}
              </div>
            ) : null} */}
            {/* {name === "trustpilotReviews" ||
            name === "facebookReviews" ||
            name === "trustedshopsReviews" ? (
              <div className="row" style={{ marginTop: "15px" }}>
                {ratings ? (
                  <div className="col-md-6">
                    <span style={{ fontWeight: "bold" }}>
                      Ratings : {ratings}
                    </span>{" "}
                  </div>
                ) : null}
                {/* {totalReviews ? ( */}
            {/* <div className="col-md-6">
              {" "}
              <span style={{ fontWeight: "bold" }}>
                Total reviews : {totalReviews}
              </span>{" "}
            </div> */}
            {/* ) : null} */}
          </div>
          {/* ) : null} */}
        </div>

        {/* uncomment when loading logic is ready */}
        {/* {reviewsObject[reviewPlatformName] ? (
            <div style={{ bottom: 0, right: 0 }}>
              <CircularProgress size={20} />
            </div>
          ) : null}{" "} */}
      </Grid>
    </>
  );
}

// Start Rating for some platforms
// Trustedshops = "#FFDC0F"
// Trustpilot = <img
// src={`/static/images/tpstars-${Math.round(
//   Number(ratings)
// ) || 0}.svg`}
// alt=""
// />
// Facebook = "#3A559F"
