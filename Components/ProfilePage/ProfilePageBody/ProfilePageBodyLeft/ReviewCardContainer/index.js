import React, { Component } from "react";
import { connect } from "react-redux";
import WriteReviewCard from "../WriteReviewCard";
import ReviewCard from "../../../../Widgets/CommonReviewCard";
import ReviewCardPlaceholder from "./ReviewCardPlaceholder";
import RenderSocialPlatforms from "./SocialPlatformReviews";
import Paper from "../../../../MaterialComponents/Paper";
import { isValidArray } from "../../../../../utility/commonFunctions";
import _get from "lodash/get";
import uuid from "uuid/v1";
import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";
import _sortBy from "lodash/sortBy";

class ReviewCardContainer extends Component {
  state = {
    wotReviewsToShow: [],
    trustSearchReviewsToShow: [],
    isLoading: true,
    reviewsFound: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showNoReviewsFound: true, isLoading: false });
    }, 60000);
    this.checkIsLoading();
    const { wotReviews, trustSearchReviews } = this.props;
    this.setState({
      wotReviewsToShow: this.calReviewsToShow(wotReviews),
      trustSearchReviewsToShow: this.calReviewsToShow(trustSearchReviews)
    });
  }

  calReviewsToShow = reviews => {
    let reviewsToShow = [];
    if (reviews.length > 30) {
      reviewsToShow = reviews.slice(0, 30);
    } else {
      reviewsToShow = reviews;
    }
    return reviewsToShow;
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps && this.state.isLoading !== false) {
      this.checkIsLoading();
    }
    if (
      !_isEqual(
        _sortBy(_get(this.props, "wotReviews", [])),
        _sortBy(_get(prevProps, "wotReviews", []))
      ) ||
      !_isEqual(
        _sortBy(_get(this.props, "trustSearchReviews", [])),
        _sortBy(_get(prevProps, "trustSearchReviews", []))
      )
    ) {
      const { wotReviews, trustSearchReviews } = this.props;
      this.setState({
        wotReviewsToShow: this.calReviewsToShow(wotReviews),
        trustSearchReviewsToShow: this.calReviewsToShow(trustSearchReviews)
      });
    }
  }

  checkIsLoading = () => {
    const {
      wotReviews,
      trustSearchReviews,
      socialPlatformReviews
    } = this.props;
    let isLoading = true;
    let reviewsFound = false;
    if (isValidArray(wotReviews) || isValidArray(trustSearchReviews)) {
      isLoading = false;
      reviewsFound = true;
    }
    if (socialPlatformReviews) {
      (Object.keys(socialPlatformReviews) || []).forEach(socialPlatform => {
        let reviewsObject = socialPlatformReviews[socialPlatform] || {};
        if (isValidArray(_get(reviewsObject, "data.data.reviews", []))) {
          isLoading = false;
          reviewsFound = true;
        }
      });
    }
    this.setState({ isLoading, reviewsFound });
  };

  //? common method for rendering reviews, need to handle pagination
  renderReviews = (reviews, provider) => {
    if (isValidArray(reviews)) {
      return (reviews || []).map(review => {
        return (
          <div style={{ marginBottom: "25px" }} key={uuid()}>
            <ReviewCard review={review || {}} provider={provider} />
          </div>
        );
      });
    }
  };

  handleShowMoreClick = (propName, stateName) => {
    const reviews = _get(this.props, propName, []);
    const reviewsToShow = _get(this.state, stateName, []);
    if (reviews.length <= reviewsToShow.length) {
      console.log("Nothing to do!");
    }
    if (reviewsToShow.length === 30) {
      this.setState({
        [stateName]: [
          ...reviewsToShow,
          ...reviews.slice(
            reviewsToShow.length,
            reviews.length < 30 ? reviews.length : reviewsToShow.length + 30
          )
        ]
      });
    } else if (reviewsToShow.length > 30) {
      this.setState({
        [stateName]: [
          ...reviewsToShow,
          ...reviews.slice(
            reviewsToShow.length,
            reviews.length < reviewsToShow.length + 30
              ? reviews.length
              : reviewsToShow.length + 30
          )
        ]
      });
    }
  };

  render() {
    const { wotReviews, trustSearchReviews } = this.props;
    const {
      wotReviewsToShow,
      trustSearchReviewsToShow,
      isLoading,
      reviewsFound
    } = this.state;
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
            color: #4285f4;
          }

          .showMore {
            color: #4285f4;
            cursor: pointer;
            font-weight: bold;
            font-size: 1rem;
          }

          .violet {
            color: #4285f4;
          }

          .showMore:hover {
            color: #21bc61;
          }
        `}</style>
        <WriteReviewCard trustClicked={this.props.trustClicked} />
        {/* These two platforms(TrustSearch, WOT) are different then other social
        platforms so that's why they are being rendered differently */}
        {isLoading ? (
          <ReviewCardPlaceholder />
        ) : reviewsFound ? (
          <>
            {this.renderReviews(trustSearchReviewsToShow, "trustsearch")}
            {trustSearchReviews.length <= 30 ||
            trustSearchReviewsToShow.length ===
              trustSearchReviews.length ? null : (
              <div className="showMoreContainer">
                <span
                  className="showMore"
                  onClick={this.handleShowMoreClick(
                    "trustSearchReviews",
                    "trustSearchReviewsToShow"
                  )}
                >
                  Show more
                </span>
              </div>
            )}
            {/* this will render reviews of all social platforms except trustSearch and wot */}
            <RenderSocialPlatforms />
            {this.renderReviews(wotReviewsToShow, "wot")}
            {wotReviewsToShow.length === wotReviews.length ? null : (
              <div className="showMoreContainer">
                <span
                  className="showMore"
                  onClick={() => {
                    this.handleShowMoreClick("wotReviews", "wotReviewsToShow");
                  }}
                >
                  Show more
                </span>
              </div>
            )}
          </>
        ) : (
          <>
            <Paper>
              <div className="noReviewFound">
                <h1 className="noReviewFoundText">No Reviews Found</h1>
              </div>
            </Paper>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { profileData } = state;
  const { domainProfileData, socialPlatformReviews } = profileData;
  let trustSearchReviews = _get(domainProfileData, "domainReviews.data", []);
  let wotReviews = _get(domainProfileData, "wotReviews.data", []);
  if (!isValidArray(trustSearchReviews)) {
    trustSearchReviews = [];
  }
  if (!isValidArray(wotReviews)) {
    wotReviews = [];
  }

  return {
    domainProfileData,
    wotReviews,
    trustSearchReviews,
    socialPlatformReviews
  };
};

export default connect(mapStateToProps)(ReviewCardContainer);

//? need to write loading logic and no reviews found logic also check unicorn loader
