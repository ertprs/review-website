import React, { Component } from "react";
import WriteReviewCard from "../WriteReviewCard";
import _get from "lodash/get";
import Paper from "../../../../MaterialComponents/Paper";
import { connect } from "react-redux";
import uuid from "uuid/v1";
import ReviewCardPlaceholder from "./ReviewCardPlaceholder";
import ReviewCard from "../../../../Widgets/CommonReviewCard";
import _isEmpty from "lodash/isEmpty";

class ReviewCardContainer extends Component {
  state = {
    googleReviewsToShow: [],
    wotReviewsToShow: [],
    trustPilotReviewsToShow: [],
    trustedShopReviewsData: [],
    showNoReviewsFound: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showNoReviewsFound: true });
    }, 40000);
    const {
      googleReviewsData,
      wotReviewsData,
      trustPilotReviewsData,
      trustedShopReviewsData
    } = this.props;
    const calGoogleReviewsToShow = () => {
      let googleReviewsToShow = [];
      if (googleReviewsData.length > 8) {
        googleReviewsToShow = googleReviewsData.slice(0, 8);
      } else {
        googleReviewsToShow = googleReviewsData;
      }
      return googleReviewsToShow;
    };

    const calWotReviewsToShow = () => {
      let wotReviewsToShow = [];
      if (wotReviewsData.length > 8) {
        wotReviewsToShow = wotReviewsData.slice(0, 8);
      } else {
        wotReviewsToShow = wotReviewsData;
      }
      return wotReviewsToShow;
    };

    const calTrustpilotReviewsToShow = () => {
      let trustPilotReviewsToShow = [];
      if (trustPilotReviewsData.length > 8) {
        trustPilotReviewsToShow = trustPilotReviewsData.slice(0, 8);
      } else {
        trustPilotReviewsToShow = trustPilotReviewsData;
      }
      return trustPilotReviewsToShow;
    };

    const calTrustedShopReviewsToShow = () => {
      let trustedShopReviewsToShow = [];
      if (trustedShopReviewsData.length > 8) {
        trustedShopReviewsToShow = trustPilotReviewsData.slice(0, 8);
      } else {
        trustedShopReviewsToShow = trustedShopReviewsData;
      }
      return trustedShopReviewsToShow;
    };

    this.setState({
      googleReviewsToShow: calGoogleReviewsToShow(),
      wotReviewsToShow: calWotReviewsToShow(),
      trustPilotReviewsToShow: calTrustpilotReviewsToShow(),
      trustedShopReviewsToShow: calTrustedShopReviewsToShow()
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      const {
        googleReviewsData,
        wotReviewsData,
        trustPilotReviewsData,
        trustedShopReviewsData
      } = this.props;
      const calGoogleReviewsToShow = () => {
        let googleReviewsToShow = [];
        if (googleReviewsData.length > 8) {
          googleReviewsToShow = googleReviewsData.slice(0, 8);
        } else {
          googleReviewsToShow = googleReviewsData;
        }
        return googleReviewsToShow;
      };

      const calWotReviewsToShow = () => {
        let wotReviewsToShow = [];
        if (wotReviewsData.length > 8) {
          wotReviewsToShow = wotReviewsData.slice(0, 8);
        } else {
          wotReviewsToShow = wotReviewsData;
        }
        return wotReviewsToShow;
      };

      const calTrustpilotReviewsToShow = () => {
        let trustPilotReviewsToShow = [];
        if (trustPilotReviewsData.length > 8) {
          trustPilotReviewsToShow = trustPilotReviewsData.slice(0, 8);
        } else {
          trustPilotReviewsToShow = trustPilotReviewsData;
        }
        return trustPilotReviewsToShow;
      };

      const calTrustedShopReviewsToShow = () => {
        let trustedShopReviewsToShow = [];
        if (trustedShopReviewsData.length > 8) {
          trustedShopReviewsToShow = trustedShopReviewsData.slice(0, 8);
        } else {
          trustedShopReviewsToShow = trustedShopReviewsData;
        }
        return trustedShopReviewsToShow;
      };

      this.setState({
        googleReviewsToShow: calGoogleReviewsToShow(),
        wotReviewsToShow: calWotReviewsToShow(),
        trustPilotReviewsToShow: calTrustpilotReviewsToShow(),
        trustedShopReviewsToShow: calTrustedShopReviewsToShow()
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

  renderTrustSearchReviews = (domainReviewsData, isLoading) => {
    return (
      domainReviewsData &&
      domainReviewsData.map(review => {
        return (
          <div style={{ marginBottom: "25px" }} key={uuid()}>
            <ReviewCard
              isLoading={isLoading}
              review={review || {}}
              provider="trustsearch"
            />
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

  handleWotShowMoreClick = () => {
    const { wotReviewsToShow } = this.state;
    const { wotReviewsData } = this.props;
    if (wotReviewsData.length <= wotReviewsToShow.length) {
    }
    if (wotReviewsToShow.length === 8) {
      this.setState({
        wotReviewsToShow: [
          ...wotReviewsToShow,
          ...wotReviewsData.slice(
            wotReviewsToShow.length,
            wotReviewsData.length < 8
              ? wotReviewsData.length
              : wotReviewsToShow.length + 8
          )
        ]
      });
    } else if (wotReviewsToShow.length > 8) {
      this.setState({
        wotReviewsToShow: [
          ...wotReviewsToShow,
          ...wotReviewsData.slice(
            wotReviewsToShow.length,
            wotReviewsData.length < wotReviewsToShow.length + 8
              ? wotReviewsData.length
              : wotReviewsToShow.length + 8
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
    const {
      domainProfileData,
      isLoading,
      googleReviewsData,
      wotReviewsData,
      trustPilotReviewsData,
      trustedShopReviewsData
    } = this.props;
    const domainReviewsData =
      ((domainProfileData || {}).domainReviews || {}).data || [];
    const domainReviewsWillCome =
      ((domainProfileData || {}).domainReviews || {}).willCome || false;
    const is_verified = _get(
      domainProfileData,
      "headerData.data.is_verified",
      false
    );
    const {
      googleReviewsToShow,
      wotReviewsToShow,
      trustPilotReviewsToShow,
      trustedShopReviewsToShow
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
            color: #4285F4;
          }

          .showMore {
            color: #4285F4;
            cursor: pointer;
            font-weight:bold;
            font-size:1.0rem;
          }

          .violet{
            color:#4285F4;
          }

          .showmore: hover {
            color: #21bc61;
          }
        `}</style>
        <WriteReviewCard trustClicked={this.props.trustClicked} />
        {isLoading ? (
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
            {/* {this.state.showNoReviewsFound ? ( */}
            <Paper>
              <div className="noReviewFound">
                <h1 className="noReviewFoundText">No Reviews Found</h1>
              </div>
            </Paper>
            {/* ) : (
              <ReviewCardPlaceholder />
            )} */}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { profileData, googleReviews, aggregateData } = state;
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
    "18.data.reviews",
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
    trustedShopReviewsData
  };
};

export default connect(mapStateToProps)(ReviewCardContainer);
