import React from "react";
import ReviewCard from "../../../../Widgets/CommonReviewCard";
import { connect } from "react-redux";
import _get from "lodash/get";
import { isValidArray } from "../../../../../utility/commonFunctions";

const reviewsOrder = [22, 1, 18, 19, 20, 13];

const SocialPlatformReviews = props => {
  const { socialPlatformReviews } = props;
  //?  need to handle pagination, we may create new action creator to which we'll pass next link and it will add new reviews
  const renderReviews = () => {
    return reviewsOrder.map(platformId => {
      if (platformId in socialPlatformReviews) {
        let reviewsObj = _get(socialPlatformReviews, platformId, {});
        let reviews = _get(reviewsObj, "data.data.reviews", []);
        if (isValidArray(reviews)) {
          return reviews.map(review => {
            //! will change provider
            return <ReviewCard review={review} provider={platformId} />;
          });
        }
      }
    });
  };
  return <div>{renderReviews()}</div>;
};

const mapStateToProps = state => {
  const { profileData } = state;
  const socialPlatformReviews = _get(profileData, "socialPlatformReviews", {});
  return { socialPlatformReviews };
};

export default connect(mapStateToProps)(SocialPlatformReviews);
