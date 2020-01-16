import React from "react";
import { reviewChannelBoxStyles } from "../../GetStarted/reviewChannelBoxStyles";
//? material-ui imports
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import _get from "lodash/get";
import StarRatings from "react-star-ratings";
import { reviewURLObjects } from "../../../../utility/constants/reviewURLObjects";
import CircularProgress from "@material-ui/core/CircularProgress";

class ReviewPlatformCard extends React.Component {
  renderPlatformCard = () => {
    const {
      url,
      name,
      socialMediaAppId,
      handleEditClick,
      reviews,
      id
    } = this.props;
    let primaryReviewData = {},
      isLoading = false,
      ratings = "",
      maxRating = "",
      likes = "",
      followers = "",
      totalReviews = "",
      reviewsArray = [],
      imageLogo = "";
    if (reviews[socialMediaAppId]) {
      if (reviews[socialMediaAppId][id]) {
        primaryReviewData = reviews[socialMediaAppId][id];
        isLoading = _get(primaryReviewData, "isLoading", false);
        ratings = _get(primaryReviewData, "data.data.rating", "");
        maxRating = _get(primaryReviewData, "data.data.max_rating");
        likes = _get(primaryReviewData, "data.data.likes", "");
        followers = _get(primaryReviewData, "data.data.followers", "");
        reviewsArray = _get(primaryReviewData, "data.data.reviews", []);
        totalReviews = (reviewsArray || []).length;
        imageLogo = "";
        if (Number(socialMediaAppId)) {
          if (reviewURLObjects[Number(socialMediaAppId)]) {
            if (reviewURLObjects[Number(socialMediaAppId)].imageLogo) {
              imageLogo = reviewURLObjects[Number(socialMediaAppId)].imageLogo;
            }
          }
        }
      }
    }
    return (
      <Grid item xs={12} md={6} lg={6}>
        <div className="reviewBoxItemContainer">
          <style jsx>{reviewChannelBoxStyles}</style>
          <div>
            <div className="reviewBoxItemLogoContainer">
              {imageLogo ? (
                <img src={`/static/images/${imageLogo}`} />
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="reviewBoxItemTextBoxContainer">
            <h6>{name}</h6>
            <div>
              <a target="_blank" href={url}>
                {url}
              </a>
            </div>
            <div className="reviewBoxRatingContainer">
              {ratings ? (
                <StarRatings
                  rating={Number(ratings)}
                  starRatedColor="#FFDC0F"
                  starDimension="20px"
                  starSpacing="0.5px"
                  numberOfStars={5}
                  name="rating"
                />
              ) : null}
            </div>
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
            <div className="row" style={{ marginTop: "0px" }}>
              {ratings ? (
                <div className="col-md-6">
                  <span style={{ fontWeight: "bold" }}>
                    Ratings : {ratings}
                  </span>{" "}
                </div>
              ) : null}
              <div className="col-md-6">
                <span style={{ fontWeight: "bold" }}>
                  Total Reviews : {totalReviews || 0}
                </span>{" "}
              </div>
            </div>
          </div>
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
          {isLoading ? (
            <div style={{ bottom: 0, right: 0 }}>
              <CircularProgress size={20} />
            </div>
          ) : null}
        </div>
      </Grid>
    );
  };

  render() {
    const reviews = _get(this.props, "reviews", {});
    return (
      <>
        {Object.keys(reviews).length > 0
          ? this.renderPlatformCard(reviews)
          : null}
      </>
    );
  }
}
const mapStateToProps = state => {
  const reviews = _get(state, "dashboardData.reviews", {});
  return { reviews };
};
export default connect(mapStateToProps)(ReviewPlatformCard);

// Start Rating for some platforms
// Trustedshops = "#FFDC0F"
// Trustpilot = <img
// src={`/static/images/tpstars-${Math.round(
//   Number(ratings)
// ) || 0}.svg`}
// alt=""
// />
// Facebook = "#3A559F"
