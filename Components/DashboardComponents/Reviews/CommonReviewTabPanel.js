import React, { Component } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import dynamic from "next/dynamic";
import NoReviewsFound from "./noReviewsFound";
import ReviewCard from "../../Widgets/CommonReviewCard";
import PlatformDetails from "./PlatformDetails";
import { isValidArray } from "../../../utility/commonFunctions";
const Select = dynamic(() => import("react-select"), {
  ssr: false
});
const ReactPaginate = dynamic(() => import("react-paginate"), {
  ssr: false
});
import { CircularProgress } from "@material-ui/core";
import _get from "lodash/get";
import _map from "lodash/map";
import _find from "lodash/find";
import _isEmpty from "lodash/isEmpty";
import _groupBy from "lodash/groupBy";

class CommonReviewTabPanel extends Component {
  state = {
    totalReviews: [],
    reviews: [],
    reviewUrl: "",
    isLoading: false,
    success: undefined,
    likes: 0,
    followers: 0,
    rating: 0,
    total: 0,
    pageNo: 1,
    perPage: 10,
    showDelay: false,
    selectedPlace: {},
    defaultPlace: {}
  };

  componentDidMount() {
    const { primaryPlatform, platformReviews } = this.props;
    const profileId = _get(primaryPlatform, "value", 0);
    const reviewsOfPrimaryPlace = _get(platformReviews, profileId, {});
    const totalReviews = _get(reviewsOfPrimaryPlace, "data.data.reviews", []);
    const reviewUrl = _get(reviewsOfPrimaryPlace, "data.data.url", "");
    const isLoading = _get(reviewsOfPrimaryPlace, "isLoading", false);
    const success = _get(reviewsOfPrimaryPlace, "success", undefined);
    const likes = _get(reviewsOfPrimaryPlace, "data.data.likes", 0);
    const followers = _get(reviewsOfPrimaryPlace, "data.data.followers", 0);
    const rating = _get(reviewsOfPrimaryPlace, "data.data.rating", 0);
    let total = 0;
    const pageNo = 1;
    let perPage = 10;
    if (success && isValidArray(totalReviews)) {
      total = totalReviews.length;
      perPage = total >= 10 ? 10 : total;
    }
    this.setState(
      {
        defaultPlace: primaryPlatform,
        selectedPlace: primaryPlatform,
        reviewUrl,
        totalReviews,
        isLoading,
        success,
        likes,
        followers,
        rating,
        total,
        perPage,
        pageNo
      },
      () => {
        this.calReviews();
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      const { selectedPlace } = this.state;
      const { platformReviews } = this.props;
      let profileId = _get(selectedPlace, "value", "");
      let selectedPlaceReviews = _get(platformReviews, profileId, {});
      let totalReviews = _get(selectedPlaceReviews, "data.data.reviews", []);
      let reviewUrl = _get(selectedPlaceReviews, "data.data.url", "");
      let isLoading = _get(selectedPlaceReviews, "isLoading", false);
      let success = _get(selectedPlaceReviews, "success", undefined);
      const likes = _get(selectedPlaceReviews, "data.data.likes", 0);
      const followers = _get(selectedPlaceReviews, "data.data.followers", 0);
      const rating = _get(selectedPlaceReviews, "data.data.rating", 0);
      let total = 0;
      let pageNo = 1;
      let perPage = 10;
      if (success && isValidArray(totalReviews)) {
        total = totalReviews.length;
        perPage = total >= 10 ? 10 : total;
      }
      this.setState(
        {
          totalReviews,
          reviewUrl,
          isLoading,
          success,
          likes,
          followers,
          rating,
          total,
          perPage,
          pageNo
        },
        () => {
          this.calReviews();
        }
      );
    }
  }

  calReviews = () => {
    const { totalReviews, pageNo, perPage } = this.state;
    if (isValidArray(totalReviews) && pageNo && perPage) {
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

  handleSelectedPlace = selectedObj => {
    const { platformReviews } = this.props;
    let profileId = _get(selectedObj, "value", "");
    let selectedPlaceReviews = _get(platformReviews, profileId, {});
    let totalReviews = _get(selectedPlaceReviews, "data.data.reviews", []);
    let reviewUrl = _get(selectedPlaceReviews, "data.data.url", "");
    let isLoading = _get(selectedPlaceReviews, "isLoading", false);
    let success = _get(selectedPlaceReviews, "success", undefined);
    const likes = _get(selectedPlaceReviews, "data.data.likes", 0);
    const followers = _get(selectedPlaceReviews, "data.data.followers", 0);
    const rating = _get(selectedPlaceReviews, "data.data.rating", 0);
    let total = 0;
    let pageNo = 1;
    let perPage = 10;
    if (success && isValidArray(totalReviews)) {
      total = totalReviews.length;
      perPage = total >= 10 ? 10 : total;
    }
    this.setState(
      {
        selectedPlace: selectedObj,
        totalReviews,
        reviewUrl,
        isLoading,
        success,
        likes,
        followers,
        rating,
        total,
        perPage,
        pageNo
      },
      () => {
        this.calReviews();
      }
    );
  };

  delayForSometime = ms => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  };

  showLoadingEffect = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  };

  render() {
    const {
      dropDownData,
      reviewsPlatforms,
      socialMediaAppId,
      isReviewsPusherConnected
    } = this.props;
    const {
      reviews,
      total,
      isLoading,
      perPage,
      success,
      likes,
      followers,
      rating,
      reviewUrl,
      showDelay,
      selectedPlace,
      defaultPlace
    } = this.state;
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
        {socialMediaAppId === 22 ? (
          <>
            <Select
              isSearchable={true}
              name="allPlaces"
              options={dropDownData || []}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={this.handleSelectedPlace}
              defaultValue={defaultPlace}
              value={selectedPlace}
              placeholder="Select your place"
            />
          </>
        ) : null}
        <div className="reviewsContainer">
          {isLoading === true && isReviewsPusherConnected === true ? (
            <div className="loaderContainer">
              <CircularProgress color="secondary" />
            </div>
          ) : isLoading === false ? (
            !success ? (
              <>
                {/* If any of the data is available then we want to show
                platform details otherwise not. */}

                {reviewUrl || likes || followers || total || rating ? (
                  <PlatformDetails
                    reviewUrl={reviewUrl || ""}
                    likes={likes || 0}
                    followers={followers || 0}
                    totalReviews={total || 0}
                    rating={rating || 0}
                  />
                ) : null}
                <NoReviewsFound />
              </>
            ) : !showDelay ? (
              <>
                {/* If any of the data is available then we want to show
                platform details otherwise not. */}

                {reviewUrl || likes || followers || total || rating ? (
                  <PlatformDetails
                    reviewUrl={reviewUrl || ""}
                    likes={likes || 0}
                    followers={followers || 0}
                    totalReviews={total || 0}
                    rating={rating || 0}
                  />
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
                  let provider = "";
                  if (socialMediaAppId in reviewsPlatforms) {
                    provider = reviewsPlatforms[socialMediaAppId];
                  }
                  //! provider will be dynamic
                  return (
                    <ReviewCard review={reviewToSend} provider={provider} />
                  );
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
  const { dashboardData } = state;
  const socialMediaAppId = _get(ownProps, "socialMediaAppId", 0);
  const reviews = _get(dashboardData, "reviews", {});
  const platformReviews = _get(reviews, socialMediaAppId, {});
  const isReviewsPusherConnected = _get(
    dashboardData,
    "isReviewsPusherConnected",
    undefined
  );
  return {
    platformReviews: platformReviews,
    isReviewsPusherConnected
  };
};

export default connect(mapStateToProps)(CommonReviewTabPanel);