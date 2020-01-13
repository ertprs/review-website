import React, { Component } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import _map from "lodash/map";
import ReactPaginate from "react-paginate";
import Head from "next/head";
import Snackbar from "../../Widgets/Snackbar";
import { CircularProgress, Typography } from "@material-ui/core";
import ReviewCard from "../../Widgets/CommonReviewCard";
import NoReviewsFound from "./noReviewsFound";
import _find from "lodash/find";
import _isEmpty from "lodash/isEmpty";
import Link from "next/link";
import _groupBy from "lodash/groupBy";

class CommonReviewTabPanel extends Component {
  state = {
    totalReviews: [],
    reviews: [],
    total: 0,
    pageNo: 1,
    perPage: 10,
    showSnackbar: false,
    variant: "success",
    snackbarMsg: "",
    showDelay: false
  };

  calReviews = () => {
    const { totalReviews, pageNo, perPage } = this.state;
    if (totalReviews && pageNo && perPage) {
      let slicedReviews = totalReviews.slice(
        (pageNo - 1) * perPage,
        pageNo * perPage
      );
      this.setState({ reviews: slicedReviews });
    }
  };

  handlePageChange = ({ selected }) => {
    this.setState({ pageNo: selected + 1 }, () => {
      this.calReviews();
      window.scrollTo(0, 0);
      this.setState({ showDelay: true });
      this.delayForSometime(400).then(() => {
        this.setState({ showDelay: false });
      });
    });
  };

  delayForSometime = ms => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  };

  componentDidMount() {
    const { success, totalReviews } = this.props;
    if (success && totalReviews) {
      let total = totalReviews.length;
      let perPage = total >= 10 ? 10 : total;
      if (total > 0) {
        this.setState({ totalReviews, total, perPage, pageNo: 1 }, () => {
          this.calReviews();
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      const { error, success, reviews, totalReviews } = this.props;
      const { perPage } = this.state;
      // if (error && !success) {
      //   this.setState({
      //     showSnackbar: true,
      //     variant: "error",
      //     snackbarMsg: error
      //   });
      // }
      if (totalReviews !== prevProps.totalReviews) {
        const { success, totalReviews } = this.props;
        if (success && totalReviews) {
          let total = totalReviews.length;
          let perPage = total >= 10 ? 10 : total;
          if (total > 0) {
            this.setState({ totalReviews, total, perPage, pageNo: 1 }, () => {
              this.calReviews();
            });
          }
        }
      }
    }
  }

  showLoadingEffect = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  };

  render() {
    const {
      isLoading,
      success,
      areTrustedShopsReviewsFetching,
      isReviewsPusherConnected,
      reviewUrl,
      totalReviews
    } = this.props;
    const { perPage, total, reviews, showDelay } = this.state;
    return (
      <>
        <Head>
          <link rel="stylesheet" href="/static/css/reviews.css" />
        </Head>
        <style jsx>{`
          .reviewsContainer {
            margin: 20px 40px;
          }
          .pagination {
            list-style-type: none;
            display: inline-block;
            background-color: red;
          }
          .active {
            color: red;
          }

          .loaderContainer {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .listItem {
            display: none;
          }

          .paginationContainer {
            display: flex;
            flex: 1;
            justify-content: center;
            margin-top: 35px;
          }

          .loaderContainer {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .listItem {
            display: none;
          }
          .hiddenPagination {
            display: none;
          }
          .invitation_link {
            color: blue;
            cursor: pointer;
          }
          .invitation_link:hover {
            text-decoration: underline;
          }

          @media only screen and (max-width: 420px) {
            .reviewsContainer {
              margin: 0;
              font-size: 0.8rem;
            }
          }
        `}</style>

        {/* We are using areTrustedShopsReviewsFetching to update the reviews from pusher */}

        <div className="reviewsContainer">
          {isLoading === true || areTrustedShopsReviewsFetching === true ? (
            <div className="loaderContainer">
              <CircularProgress color="secondary" />
            </div>
          ) : isLoading === false ? (
            !success ? (
              <NoReviewsFound />
            ) : !showDelay ? (
              <>
                {reviewUrl ? (
                  <div className="bold">
                    Review url :
                    <Link href={reviewUrl}>
                      <a style={{ marginLeft: "10px" }} target="_blank">
                        {reviewUrl}
                      </a>
                    </Link>
                  </div>
                ) : null}
                {_map(reviews, review => {
                  let name =
                    _get(review, "user", "") || _get(review, "name", "");
                  let reviewToSend = {
                    name: name === "N/A" ? "" : name,
                    text: _get(review, "review", ""),
                    rating: _get(review, "rating", 0),
                    date: _get(review, "date", ""),
                    replyURL: _get(review, "review_url", "")
                  };
                  return <ReviewCard review={reviewToSend} provider="google" />;
                })}
              </>
            ) : (
              this.showLoadingEffect()
            )
          ) : null}
        </div>
        <div
          className={`${
            isLoading ||
            success == false ||
            total < 11 ||
            reviews === 0 ||
            areTrustedShopsReviewsFetching ||
            showDelay
              ? "hiddenPagination"
              : "paginationContainer"
          }`}
        >
          <ReactPaginate
            pageCount={total / perPage}
            pageRangeDisplayed={4}
            marginPagesDisplayed={1}
            initialPage={0}
            onPageChange={this.handlePageChange}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            pageClassName={"listItem"}
            nextClassName={"listItem"}
            previousClassName={"listItem"}
            pageLinkClassName={"listLink"}
            nextLinkClassName={"listLink"}
            previousLinkClassName={"listLink"}
            activeClassName={"selectedPage"}
            activeLinkClassName={"selectedPage"}
            disabledClassName={"disabledButtons"}
            disableInitialCallback={true}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { dashboardData, auth } = state;
  const socialMediaAppId = _get(ownProps, "socialMediaAppId", 0);
  const reviews = _get(dashboardData, "reviews", {});
  const platformReviews = _get(reviews, socialMediaAppId, {});
  const socialArray = _get(
    auth,
    "logIn.userProfile.business_profile.social",
    []
  );
  const socialArrayGroupedById = _groupBy(socialArray, "social_media_app_id");
  console.log(socialArrayGroupedById, "Social_Array_grouped_by_ID");
  const dropDownData = (socialArrayGroupedById[socialMediaAppId] || []).map(
    arr => {
      return { label: _get(arr, "name", ""), value: _get(arr, "id", "") };
    }
  );

  const reviewPlatformArray = socialArrayGroupedById[socialMediaAppId] || [];
  const primaryReviewPlatform = _find(reviewPlatformArray, ["is_primary", 1]);
  const primaryReviewPlatformId = _get(primaryReviewPlatform, "id", "");

  const primaryPlatformReviewObj = _get(
    platformReviews,
    primaryReviewPlatformId,
    {}
  );

  const totalReviews = _get(primaryPlatformReviewObj, "data.data.reviews", []);
  console.log(totalReviews, socialMediaAppId);
  const success = _get(primaryPlatformReviewObj, "data.success", undefined);
  const isLoading = _get(primaryPlatformReviewObj, "isLoading", false);
  const errorMsg = _get(primaryPlatformReviewObj, "errorMsg", "");
  //   const areTrustedShopsReviewsFetching = _get(
  //     primaryPlatformReviewObj,
  //     "reviewsObject.trustedshops",
  //     false
  //   );
  const isReviewsPusherConnected = _get(
    primaryPlatformReviewObj,
    "isReviewsPusherConnected",
    undefined
  );
  let reviewUrl = _get(primaryPlatformReviewObj, "data.data.url");
  return {
    totalReviews,
    success,
    isLoading,
    errorMsg,
    // areTrustedShopsReviewsFetching,
    isReviewsPusherConnected,
    reviewUrl
  };
};

export default connect(mapStateToProps)(CommonReviewTabPanel);
