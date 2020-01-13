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
        let reviewPlatformData = reviewPlatforms[reviewPlatform];
        let primaryReviewPlatform = _find(reviewPlatformData, [
          "is_primary",
          1
        ]);
        if (primaryReviewPlatform) {
          reviewPlatformsJSX = [
            ...reviewPlatformsJSX,
            <ReviewPlatformCard
              primaryReviewPlatform={primaryReviewPlatform}
              name={_get(primaryReviewPlatform, "name", "")}
              url={_get(primaryReviewPlatform, "url", "")}
              id={_get(primaryReviewPlatform, "id", "")}
              socialMediaAppId={socialMediaAppId}
              handleEditClick={() => {
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
          .text_center;
        `}</style>

        <Grid item xs={6} md={6} lg={6}>
          <h4 className="ml-5">Review Platforms : </h4>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <div style={{ textAlign: "right" }}>
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
