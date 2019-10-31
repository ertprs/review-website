import React, { Component } from "react";
import ReviewCard from "./ReviewCard";
import WriteReviewCard from "../WriteReviewCard";
import _get from "lodash/get";
import Paper from "../../../../MaterialComponents/Paper";
import { connect } from "react-redux";
import uuid from "uuid/v1";
import ReviewCardPlaceholder from "./ReviewCardPlaceholder";
import ClaimYourWebsite from "../../../ClaimYourWebsite/ClaimYourWebsite";

class ReviewCardContainer extends Component {
  render() {
    const { domainProfileData, isLoading } = this.props;
    const domainReviewsData =
      ((domainProfileData || {}).domainReviews || {}).data || [];
    const domainReviewsWillCome =
      ((domainProfileData || {}).domainReviews || {}).willCome || false;
    const is_verified = _get(
      domainProfileData,
      "headerData.data.is_verified",
      false
    );
    return (
      <div>
        <style jsx>{`
          .noReviewFound {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 5px;
          }
          .noReviewFoundText {
            font-size: 22px;
          }
        `}</style>
        <WriteReviewCard />
        {isLoading ? (
          <ReviewCardPlaceholder />
        ) : domainReviewsWillCome ? (
          domainReviewsData.map(review => {
            return (
              <div style={{ marginBottom: "25px" }} key={uuid()}>
                <ReviewCard isLoading={isLoading} review={review || {}} />
                {!is_verified ? <ClaimYourWebsite variant="big" /> : null}
              </div>
            );
          })
        ) : (
          <>
            <Paper>
              <div className="noReviewFound">
                <h1 className="noReviewFoundText">No Reviews Found</h1>
              </div>
            </Paper>
            {!is_verified ? <ClaimYourWebsite variant="big" /> : null}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { profileData } = state;
  const { domainProfileData, isLoading } = profileData;
  return { domainProfileData, isLoading };
};

export default connect(mapStateToProps)(ReviewCardContainer);
