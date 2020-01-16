import React, { Component } from "react";
import ReviewPlatformCard from "./ReviewPlatformCard";
//? material-ui imports
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
//? redux imports
import { connect } from "react-redux";
//? lodash imports
import _get from "lodash/get";
import _groupBy from "lodash/groupBy";
import _isEmpty from "lodash/isEmpty";
import _find from "lodash/find";
//?global function
import { isValidArray } from "../../../../utility/commonFunctions";
//?actions
import { setGetStartedShow } from "../../../../store/actions/dashboardActions";

class ReviewPlatforms extends Component {
  renderReviewPlatforms = () => {
    const { reviewPlatforms, setGetStartedShow } = this.props;
    let reviewPlatformsJSX = [];
    if (!_isEmpty(reviewPlatforms)) {
      for (let reviewPlatform in reviewPlatforms) {
        let socialMediaAppId = reviewPlatform;
        let platformAllProfiles = reviewPlatforms[reviewPlatform];
        let primaryReviewPlatform = {};
        if (isValidArray(platformAllProfiles)) {
          primaryReviewPlatform = _find(platformAllProfiles, ["is_primary", 1]);
          if (!primaryReviewPlatform) {
            primaryReviewPlatform = platformAllProfiles[0];
          }
        }
        // Card will not be displayed if we do not have any primary platform.
        if (primaryReviewPlatform) {
          reviewPlatformsJSX = [
            ...reviewPlatformsJSX,
            <ReviewPlatformCard
              platformAllProfiles={platformAllProfiles || []}
              name={_get(primaryReviewPlatform, "name", "")}
              url={_get(primaryReviewPlatform, "url", "")}
              profileId={_get(primaryReviewPlatform, "id", "")}
              socialMediaAppId={socialMediaAppId}
              handleEditClick={() => {
                //? sending him to get started page with social_media_app_id only
                setGetStartedShow(true, socialMediaAppId);
              }}
            />
          ];
        }
      }
    }
    return reviewPlatformsJSX;
  };

  render() {
    const { setGetStartedShow } = this.props;
    return (
      <>
        <style jsx>{`
          .ml-5 {
            margin-left: 5px;
          }
          .text_right {
            text-align: right;
          }
        `}</style>

        <Grid item xs={6} md={6} lg={6}>
          <h4 className="ml-5">Review Platforms : </h4>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <div className="text_right">
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={() => {
                setGetStartedShow(true);
              }}
            >
              Add/Edit Review Platforms
            </Button>
          </div>
        </Grid>
        {this.renderReviewPlatforms()}
      </>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  const reviewPlatforms = _get(
    auth,
    "logIn.userProfile.business_profile.social",
    []
  );

  let restructuredReviewPlatforms = [];
  if (isValidArray(reviewPlatforms)) {
    restructuredReviewPlatforms = _groupBy(
      reviewPlatforms,
      "social_media_app_id"
    );
  }
  return { reviewPlatforms: restructuredReviewPlatforms };
};

export default connect(mapStateToProps, { setGetStartedShow })(ReviewPlatforms);
