import React, { Component } from "react";
import ReviewCard from "./ReviewCard";
import WriteReviewCard from "../WriteReviewCard";
import _get from "lodash/get";
import Paper from "../../../../MaterialComponents/Paper";
import { connect } from "react-redux";
import uuid from "uuid/v1";
import ReviewCardPlaceholder from "./ReviewCardPlaceholder";
import ClaimYourWebsite from "../../../ClaimYourWebsite/ClaimYourWebsite";
import GoogleReviewCard from "./GoogleReviewCard";
import _isEmpty from "lodash/isEmpty";

class ReviewCardContainer extends Component {
  state = {
    googleReviewsToShow: []
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      const { googleReviewsData } = this.props;
      const calGoogleReviewsToShow = () => {
        let googleReviewsToShow = [];
        if (googleReviewsData.length > 8) {
          googleReviewsToShow = googleReviewsData.slice(0, 8);
        } else {
          googleReviewsToShow = googleReviewsData;
        }
        return googleReviewsToShow;
      };
      this.setState({
        googleReviewsToShow: calGoogleReviewsToShow()
      });
    }
  }

  renderGoogleReviews = () => {
    const { googleReviewsToShow } = this.state;
    if (googleReviewsToShow) {
      if (googleReviewsToShow.length > 0) {
        return (
          googleReviewsToShow &&
          googleReviewsToShow.map(review => {
            return <GoogleReviewCard review={review} />;
          })
        );
      }
    }
  };

  renderTrustSearchReviews = domainReviewsData => {
    return (
      domainReviewsData &&
      domainReviewsData.map(review => {
        return (
          <div style={{ marginBottom: "25px" }} key={uuid()}>
            <ReviewCard isLoading={isLoading} review={review || {}} />
            {!is_verified ? <ClaimYourWebsite variant="big" /> : null}
          </div>
        );
      })
    );
  };

  handleShowMore = () => {
    const { googleReviewsToShow } = this.state;
    const { googleReviewsData } = this.props;
    if (googleReviewsData.length <= googleReviewsToShow.length) {
    }
    if (googleReviewsToShow.length === 8) {
      this.setState({
        googleReviewsToShow: [
          ...googleReviewsToShow,
          ...googleReviewsData.slice(
            googleReviewsToShow.length,
            googleReviewsData.length < 8
              ? googleReviewsData.length
              : googleReviewsToShow.length + 8
          )
        ]
      });
    } else if (googleReviewsToShow.length > 8) {
      this.setState({
        googleReviewsToShow: [
          ...googleReviewsToShow,
          ...googleReviewsData.slice(
            googleReviewsToShow.length,
            googleReviewsData.length < googleReviewsToShow.length + 8
              ? googleReviewsData.length
              : googleReviewsToShow.length + 8
          )
        ]
      });
    }
  };

  render() {
    const { domainProfileData, isLoading, googleReviewsData } = this.props;
    const domainReviewsData =
      ((domainProfileData || {}).domainReviews || {}).data || [];
    const domainReviewsWillCome =
      ((domainProfileData || {}).domainReviews || {}).willCome || false;
    const is_verified = _get(
      domainProfileData,
      "headerData.data.is_verified",
      false
    );
    const { googleReviewsToShow } = this.state;
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
          .showMoreContainer {
            text-align: center;
            margin-bottom: 30px;
          }

          .showMoreContainer:hover {
            text-decoration: underline;
            color: #21bc61;
          }

          .showMore {
            color: #21bc61;
            cursor: pointer;
          }

          .showmore: hover {
            color: #21bc61;
          }
        `}</style>
        <WriteReviewCard />
        {isLoading ? (
          <ReviewCardPlaceholder />
        ) : true ? (
          <>
            {domainReviewsWillCome
              ? this.renderTrustSearchReviews(domainReviewsData)
              : null}
            {googleReviewsData.length > 0 ? (
              <>
                {this.renderGoogleReviews()}
                {googleReviewsData.length <= 8 ||
                googleReviewsToShow.length ===
                  googleReviewsData.length ? null : (
                  <div className="showMoreContainer">
                    <span className="showMore" onClick={this.handleShowMore}>
                      Show more
                    </span>
                  </div>
                )}
              </>
            ) : null}
          </>
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
  const { profileData, googleReviews } = state;
  const { domainProfileData, isLoading } = profileData;
  const googleReviewsFromRedux = _get(
    googleReviews,
    "reviews.data.reviews",
    []
  );
  let googleReviewsData = [];
  if (
    Array.isArray(googleReviewsFromRedux) &&
    !_isEmpty(googleReviewsFromRedux) &&
    googleReviewsFromRedux
  ) {
    googleReviewsData = [...googleReviewsFromRedux];
  }
  return {
    domainProfileData,
    isLoading,
    googleReviewsData
  };
};

export default connect(mapStateToProps)(ReviewCardContainer);
