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

class ReviewCardContainer extends Component {
  state = {
    wotReviewsToShow: [],
    trustSearchReviewsToShow: [],
    showNoReviewsFound: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showNoReviewsFound: true });
    }, 40000);
    const { trustSearchReviews, wotReviews } = this.props;
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
    if (
      _get(this.props, "wotReviews", []) !==
        _get(prevProps, "wotReviews", []) ||
      _get(this.props, "trustSearchReviews", []) !==
        _get(prevProps, "trustSearchReviews", [])
    ) {
      const { trustSearchReviews, wotReviews } = this.props;
      this.setState({
        wotReviewsToShow: this.calReviewsToShow(wotReviews),
        trustSearchReviewsToShow: this.calReviewsToShow(trustSearchReviews)
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
            return <ReviewCard review={review} provider="google" />;
          })
        );
      }
    }
  };

  renderTrustPilotReviews = () => {
    const { trustPilotReviewsToShow } = this.state;
    if (trustPilotReviewsToShow) {
      if (trustPilotReviewsToShow.length > 0) {
        return (
          trustPilotReviewsToShow &&
          trustPilotReviewsToShow.map(review => {
            return <ReviewCard review={review} provider="trustpilot" />;
          })
        );
      }
    }
  };

  renderTrustedShopReviews = () => {
    const { trustedShopReviewsToShow } = this.state;
    if (trustedShopReviewsToShow) {
      if (trustedShopReviewsToShow.length > 0) {
        return (
          trustedShopReviewsToShow &&
          trustedShopReviewsToShow.map(review => {
            return <ReviewCard review={review} provider="trustedshops" />;
          })
        );
      }
    }
  };

  renderWotReviews = () => {
    const { wotReviewsToShow } = this.state;
    if (wotReviewsToShow) {
      if (wotReviewsToShow.length > 0) {
        return (
          wotReviewsToShow &&
          wotReviewsToShow.map(review => {
            return <ReviewCard review={review} provider="wot" />;
          })
        );
      }
    }
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

  handleShowMore = () => {
    const { googleReviewsToShow } = this.state;
    const { googleReviewsData } = this.props;

    if (googleReviewsData.length <= googleReviewsToShow.length) {
    }
    if (googleReviewsToShow.length === 30) {
      this.setState({
        googleReviewsToShow: [
          ...googleReviewsToShow,
          ...googleReviewsData.slice(
            googleReviewsToShow.length,
            googleReviewsData.length < 30
              ? googleReviewsData.length
              : googleReviewsToShow.length + 30
          )
        ]
      });
    } else if (googleReviewsToShow.length > 30) {
      this.setState({
        googleReviewsToShow: [
          ...googleReviewsToShow,
          ...googleReviewsData.slice(
            googleReviewsToShow.length,
            googleReviewsData.length < googleReviewsToShow.length + 30
              ? googleReviewsData.length
              : googleReviewsToShow.length + 30
          )
        ]
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

  handletrustedShopShowMoreClick = () => {
    const { trustedShopReviewsToShow } = this.state;
    const { trustedShopReviewsData } = this.props;
    if (trustedShopReviewsData.length <= trustedShopReviewsToShow.length) {
    }
    if (trustedShopReviewsToShow.length === 8) {
      this.setState({
        trustedShopReviewsToShow: [
          ...trustedShopReviewsToShow,
          ...trustedShopReviewsData.slice(
            trustedShopReviewsToShow.length,
            trustedShopReviewsData.length < 8
              ? trustedShopReviewsData.length
              : trustedShopReviewsToShow.length + 8
          )
        ]
      });
    } else if (trustedShopReviewsToShow.length > 8) {
      this.setState({
        trustedShopReviewsToShow: [
          ...trustedShopReviewsToShow,
          ...trustedShopReviewsData.slice(
            trustedShopReviewsToShow.length,
            trustedShopReviewsData.length < trustedShopReviewsToShow.length + 8
              ? trustedShopReviewsData.length
              : trustedShopReviewsToShow.length + 8
          )
        ]
      });
    }
  };

  handleTrustPilotShowMoreClick = () => {
    const { trustPilotReviewsToShow } = this.state;
    const { trustPilotReviewsData } = this.props;
    if (trustPilotReviewsData.length <= trustPilotReviewsToShow.length) {
    }
    if (trustPilotReviewsToShow.length === 8) {
      this.setState({
        trustPilotReviewsToShow: [
          ...trustPilotReviewsToShow,
          ...trustPilotReviewsData.slice(
            trustPilotReviewsToShow.length,
            trustPilotReviewsData.length < 8
              ? trustPilotReviewsData.length
              : trustPilotReviewsToShow.length + 8
          )
        ]
      });
    } else if (trustPilotReviewsToShow.length > 8) {
      this.setState({
        trustPilotReviewsToShow: [
          ...trustPilotReviewsToShow,
          ...trustPilotReviewsData.slice(
            trustPilotReviewsToShow.length,
            trustPilotReviewsData.length < trustPilotReviewsToShow.length + 8
              ? trustPilotReviewsData.length
              : trustPilotReviewsToShow.length + 8
          )
        ]
      });
    }
  };

  handleTrustedShopShowMoreClick = () => {
    const { trustedShopReviewsToShow } = this.state;
    const { trustedShopReviewsData } = this.props;
    if (trustedShopReviewsData.length <= trustedShopReviewsToShow.length) {
    }
    if (trustedShopReviewsToShow.length === 8) {
      this.setState({
        trustedShopReviewsToShow: [
          ...trustedShopReviewsToShow,
          ...trustedShopReviewsData.slice(
            trustedShopReviewsToShow.length,
            trustedShopReviewsData.length < 8
              ? trustedShopReviewsData.length
              : trustedShopReviewsToShow.length + 8
          )
        ]
      });
    } else if (trustedShopReviewsToShow.length > 8) {
      this.setState({
        trustedShopReviewsToShow: [
          ...trustedShopReviewsToShow,
          ...trustedShopReviewsData.slice(
            trustedShopReviewsToShow.length,
            trustedShopReviewsData.length < trustedShopReviewsToShow.length + 8
              ? trustedShopReviewsData.length
              : trustedShopReviewsToShow.length + 8
          )
        ]
      });
    }
  };

  render() {
    const { wotReviews, trustSearchReviews } = this.props;
    const { wotReviewsToShow, trustSearchReviewsToShow } = this.state;
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

          .showmore: hover {
            color: #21bc61;
          }
        `}</style>
        <WriteReviewCard trustClicked={this.props.trustClicked} />
        {/* These two platforms(TrustSearch, WOT) are different then other social
        platforms so that's why they are being rendered differently */}
        {this.renderReviews(trustSearchReviewsToShow, "trustsearch")}
        {trustSearchReviews.length <= 30 ||
        trustSearchReviewsToShow.length === trustSearchReviews.length ? null : (
          <div className="showMoreContainer">
            <span
              className="showMore"
              onClick={this.handleShowMoreClick(
                "trustSearchReviews",
                "trustSearchReviewsToShow"
              )}
            >
              Show more <span className="violet">TrustSearch</span> reviews
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
              onClick={this.handleShowMoreClick(
                "wotReviews",
                "wotReviewsToShow"
              )}
            >
              Show more <span className="violet">WOT</span> reviews
            </span>
          </div>
        )}
        {/* {isLoading ? (
          <ReviewCardPlaceholder />
        ) : domainReviewsWillCome ||
          googleReviewsData.length > 0 ||
          wotReviewsData.length > 0 ? (
          <>
            {domainReviewsWillCome
              ? this.renderTrustSearchReviews(domainReviewsData, isLoading)
              : null}
            {googleReviewsData.length > 0 ? (
              <>
                {this.renderGoogleReviews()}
                {googleReviewsData.length <= 8 ||
                googleReviewsToShow.length ===
                  googleReviewsData.length ? null : (
                  <div className="showMoreContainer">
                    <span className="showMore" onClick={this.handleShowMore}>
                      Show more <span className="violet">Google</span> reviews
                    </span>
                  </div>
                )}
              </>
            ) : null}
            {trustPilotReviewsData.length > 0 ? (
              <>
                {this.renderTrustPilotReviews()}
                {trustPilotReviewsData.length <= 8 ||
                wotReviewsToShow.length ===
                  trustPilotReviewsData.length ? null : (
                  <div className="showMoreContainer">
                    <span
                      className="showMore"
                      onClick={this.handleTrustPilotShowMoreClick}
                    >
                      Show more <span className="violet">Trustpilot</span> reviews
                    </span>
                  </div>
                )}
              </>
            ) : null}
            {trustedShopReviewsData.length > 0 ? (
              <>
                {this.renderTrustedShopReviews()}
                {trustedShopReviewsData.length <= 8 ||
                wotReviewsToShow.length ===
                  trustedShopReviewsData.length ? null : (
                  <div className="showMoreContainer">
                    <span
                      className="showMore"
                      onClick={this.handletrustedShopShowMoreClick}
                    >
                      Show more <span className="violet">TrustedShop</span> reviews
                    </span>
                  </div>
                )}
              </>
            ) : null}
            {wotReviewsData.length > 0 ? (
              <>
                {this.renderWotReviews()}
                {wotReviewsData.length <= 8 ||
                wotReviewsToShow.length === wotReviewsData.length ? null : (
                  <div className="showMoreContainer">
                    <span
                      className="showMore"
                      onClick={this.handleWotShowMoreClick}
                    >
                      Show more <span className="violet">WOT</span> reviews
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
           
          </>
        )} */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { profileData, googleReviews, aggregateData } = state;
  const { domainProfileData, isLoading } = profileData;
  let trustSearchReviews = _get(domainProfileData, "domainReviews.data", []);
  let wotReviews = _get(domainProfileData, "wotReviews.data", []);
  if (!isValidArray(trustSearchReviews)) {
    trustSearchReviews = [];
  }
  if (!isValidArray(wotReviews)) {
    wotReviews = [];
  }
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

  const wotReviewsFromRedux = _get(domainProfileData, "wotReviews.data", []);
  let wotReviewsData = [];
  if (
    Array.isArray(wotReviewsFromRedux) &&
    !_isEmpty(wotReviewsFromRedux) &&
    wotReviewsFromRedux
  ) {
    wotReviewsData = [...wotReviewsFromRedux];
  }

  const trustPilotReviewsFromRedux = _get(aggregateData, "18.data.reviews", []);
  let trustPilotReviewsData = [];
  if (
    Array.isArray(trustPilotReviewsFromRedux) &&
    !_isEmpty(trustPilotReviewsFromRedux) &&
    trustPilotReviewsFromRedux
  ) {
    trustPilotReviewsData = [...trustPilotReviewsFromRedux];
  }

  const trustedShopReviewsFromRedux = _get(
    aggregateData,
    "19.data.reviews",
    []
  );
  let trustedShopReviewsData = [];
  if (
    Array.isArray(trustedShopReviewsFromRedux) &&
    !_isEmpty(trustedShopReviewsFromRedux) &&
    trustedShopReviewsFromRedux
  ) {
    trustedShopReviewsData = [...trustedShopReviewsFromRedux];
  }

  return {
    domainProfileData,
    isLoading,
    googleReviewsData,
    wotReviewsData,
    trustPilotReviewsData,
    trustedShopReviewsData,
    trustSearchReviews,
    wotReviews
  };
};

export default connect(mapStateToProps)(ReviewCardContainer);

//? need to write loading logic and no reviews found logic also check unicorn loader
