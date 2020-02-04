import React, { Component } from "react";
import { connect } from "react-redux";
import WriteReviewCard from "../WriteReviewCard";
import ReviewCard from "../../../../Widgets/CommonReviewCard";
import ReviewCardPlaceholder from "./ReviewCardPlaceholder";
import RenderSocialPlatforms from "./SocialPlatformReviews";
import Paper from "../../../../MaterialComponents/Paper";
import { isValidArray } from "../../../../../utility/commonFunctions";
import _get from "lodash/get";
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
      this.setState({ isLoading: false });
    }, 60000);
    this.updateLoadingAndReviewsFoundState();
    const { wotReviews, trustSearchReviews } = this.props;
    this.setState({
      wotReviewsToShow: this.calReviewsToShow(wotReviews),
      trustSearchReviewsToShow: this.calReviewsToShow(trustSearchReviews)
    });
  }
  //? this will slice first 30 reviews
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
      this.updateLoadingAndReviewsFoundState();
    }
    //? this will check if current wotReviews or trustSearch reviews are not equal to old reviews and then just slicing first 30 reviews if condition is true
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

  //? this will set isLoading to false and reviewsFound to true if any reviews found of any platform
  updateLoadingAndReviewsFoundState = () => {
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

  //? common method for rendering reviews
  renderReviews = (reviews, provider) => {
    if (isValidArray(reviews)) {
      return (reviews || []).map(review => {
        return <ReviewCard review={review || {}} provider={provider} />;
      });
    }
  };

  //? this will add next 30 reviews in reviewsToShow state of that platform
  handleShowMoreClick = (propName, stateName) => {
    const reviews = _get(this.props, propName, []);
    const reviewsToShow = _get(this.state, stateName, []);
    if (reviews.length <= reviewsToShow.length) {
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

        {/* loader is true and reviewsFound is false initially, if any platform reviews are available then loader will be false and reviewsFound will be true otherwise loader will automatically be false after 5 minutes and it will show no reviews found */}
        {isLoading ? (
          <ReviewCardPlaceholder />
        ) : reviewsFound ? (
          <>
            {/* These two platforms(TrustSearch, WOT) are different then other social
            platforms so that's why they are being rendered differently */}
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
            {/* this will render reviews of all social platforms except trustSearch and wot as they have separate methods to render(above and below)*/}
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
