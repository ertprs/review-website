import React from "react";
import AllProfileDataPopover from "./AllProfileDataPopover";
import { reviewChannelBoxStyles } from "../../GetStarted/reviewChannelBoxStyles";
import { reviewURLObjects } from "../../../../utility/constants/reviewURLObjects";
import { isValidArray } from "../../../../utility/commonFunctions";
import { ratingColor } from "../../../../utility/ratingTypeColor";
//? material-ui imports
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import _get from "lodash/get";
import StarRatings from "react-star-ratings";
import CircularProgress from "@material-ui/core/CircularProgress";

class ReviewPlatformCard extends React.Component {
  state = {
    popoverAnchorEl: null
  };

  renderPlatformCard = () => {
    const {
      url,
      name,
      socialMediaAppId,
      handleEditClick,
      reviews,
      profileId
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
      if (reviews[socialMediaAppId][profileId]) {
        primaryReviewData = reviews[socialMediaAppId][profileId];
        isLoading = _get(primaryReviewData, "isLoading", false);
        ratings = _get(primaryReviewData, "data.data.rating", "");
        maxRating = _get(primaryReviewData, "data.data.max_rating", 5);
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
        <style>{`
          .showAllProfile {
            color: blue;
          }
          .showAllProfile:hover {
            text-decoration: underline;
            cursor: pointer;
          }
      `}</style>
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
              <div className="platformNameContainer">
                {ratings ? (
                  <StarRatings
                    rating={Number(ratings)}
                    starRatedColor={
                      ratingColor[Math.round(Number(ratings)) || 0]
                    }
                    starDimension="20px"
                    starSpacing="0.5px"
                    numberOfStars={5}
                    name="rating"
                  />
                ) : null}
              </div>
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
                <div style={{ fontWeight: "bold" }}>
                  Total Reviews : {totalReviews || 0}
                  {/* Only for google as right google only have multiple places */}
                  {socialMediaAppId === "22" ? (
                    <div
                      className="showAllProfile"
                      onClick={event => {
                        this.setState({ popoverAnchorEl: event.currentTarget });
                      }}
                    >
                      Show All Profiles
                    </div>
                  ) : null}
                </div>
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
    const { popoverAnchorEl } = this.state;
    const { allPlatformProfilesData } = this.props;
    return (
      <>
        {this.renderPlatformCard()}
        <AllProfileDataPopover
          allPlatformProfilesData={allPlatformProfilesData || []}
          anchorEl={popoverAnchorEl}
          handleClose={() => {
            this.setState({ popoverAnchorEl: null });
          }}
        />
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const reviews = _get(state, "dashboardData.reviews", {});

  //# Creating data for popover of all profiles
  const platformAllProfiles = _get(ownProps, "platformAllProfiles", []);
  let allPlatformProfilesData = [];
  if (isValidArray(platformAllProfiles)) {
    allPlatformProfilesData = platformAllProfiles.map(profile => {
      let profileId = _get(profile, "id", 0);
      let socialMediaAppId = _get(profile, "social_media_app_id", 0);
      let name = _get(profile, "profile_name", "N/A");
      let url = _get(profile, "url", "");
      let isPrimary = _get(profile, "is_primary", 0);
      let platformReviewObj = _get(reviews, socialMediaAppId, {});
      let profileReviewObj = _get(platformReviewObj, profileId, {});
      let rating = Number(_get(profileReviewObj, "data.data.rating", 0));
      let reviewsArr = _get(profileReviewObj, "data.data.reviews", []);
      let totalReviews = 0;
      if (isValidArray(reviewsArr)) {
        totalReviews = (reviewsArr || []).length;
      }
      let isFetching = _get(profileReviewObj, "isLoading", false);
      return {
        name,
        // url,
        totalReviews,
        rating,
        isPrimary,
        isFetching
      };
    });
  }

  if (!isValidArray(allPlatformProfilesData)) {
    allPlatformProfilesData = [];
  }
  //# **************----------------************************

  return { reviews, allPlatformProfilesData };
};
export default connect(mapStateToProps)(ReviewPlatformCard);
