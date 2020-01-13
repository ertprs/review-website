import React, { Component } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), {
  ssr: false
});
import { isValidArray } from "../../../utility/commonFunctions";
import NoReviewsFound from "./noReviewsFound";
import ReviewCard from "../../Widgets/CommonReviewCard";
import _get from "lodash/get";
import _map from "lodash/map";
import _find from "lodash/find";
import _isEmpty from "lodash/isEmpty";
import _groupBy from "lodash/groupBy";
import { CircularProgress, Typography } from "@material-ui/core";

class CommonReviewTabPanel extends Component {
  state = {
    totalReviews: [],
    reviews: [],
    total: 0,
    pageNo: 1,
    perPage: 10,
    isLoading: false,
    success: undefined,
    showDelay: false,
    selectedPlace: {},
    defaultPlace: {}
  };

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

  delayForSometime = ms => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  };

  setInitialState = () => {
    const { success, isLoading, totalReviews, primaryDropdownObj } = this.props;
    console.log(primaryDropdownObj, "primaryDropdownObj");
    let total = 0;
    let pageNo = 1;
    let perPage = 10;
    if (success && isValidArray(totalReviews)) {
      total = totalReviews.length;
      perPage = total >= 10 ? 10 : total;
    }
    this.setState(
      {
        defaultPlace: primaryDropdownObj,
        totalReviews,
        isLoading,
        success,
        total,
        perPage,
        pageNo
      },
      () => {
        this.calReviews();
      }
    );
  };

  componentDidMount() {
    this.setInitialState();
  }

  componentDidUpdate(prevProps, prevState) {
    const { totalReviews } = this.props;
    if (totalReviews !== prevProps.totalReviews) {
      this.setInitialState();
    }
  }

  showLoadingEffect = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  };

  handleSelectedPlace = selectedObj => {
    this.setState({ selectedPlace: selectedObj });
    const { allPlacesReviews } = this.props;
    let profileId = _get(selectedObj, "value", "");
    let selectedPlaceObj = _get(allPlacesReviews, profileId, {});
    let totalReviews = _get(selectedPlaceObj, "data.data.reviews", []);
    let isLoading = _get(selectedPlaceObj, "isLoading", false);
    let success = _get(selectedPlaceObj, "success", undefined);
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
        isLoading,
        success,
        total,
        perPage,
        pageNo
      },
      () => {
        this.calReviews();
      }
    );
  };

  render() {
    const { reviewUrl, dropDownData, socialMediaAppId } = this.props;
    const {
      reviews,
      total,
      isLoading,
      perPage,
      success,
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
              name="reviews_platforms"
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
          {isLoading === true ? (
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
                    <a style={{ marginLeft: "10px" }} target="_blank">
                      {reviewUrl}
                    </a>
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
                  //! provider will be dynamic
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
  const allReviews = _get(dashboardData, "reviews", {});
  const platformReviews = _get(allReviews, socialMediaAppId, {});
  const socialArray = _get(
    auth,
    "logIn.userProfile.business_profile.social",
    []
  );
  const socialArrayGroupedById = _groupBy(socialArray, "social_media_app_id");
  let dropDownData = [];
  let socialArrayGroupedByPlatforms = [];
  if (socialMediaAppId in socialArrayGroupedById) {
    socialArrayGroupedByPlatforms = socialArrayGroupedById[socialMediaAppId];
    dropDownData = (socialArrayGroupedByPlatforms || []).map(platform => {
      return {
        label: _get(platform, "profile_name", ""),
        value: _get(platform, "id", "")
      };
    });
  }
  let primaryReviewPlatformPlace = {};
  primaryReviewPlatformPlace = _find(socialArrayGroupedByPlatforms, [
    "is_primary",
    1
  ]);
  if (
    !primaryReviewPlatformPlace &&
    (socialArrayGroupedByPlatforms || []).length === 1
  ) {
    primaryReviewPlatformPlace = socialArrayGroupedByPlatforms[0];
  }
  const primaryReviewPlatformPlaceId = _get(
    primaryReviewPlatformPlace,
    "id",
    ""
  );
  const primaryDropdownObj = _find(dropDownData, [
    "value",
    primaryReviewPlatformPlaceId
  ]);
  let primaryReviewPlatformReviews = [];
  let primaryReviewPlatformSuccess = undefined;
  let primaryReviewPlatformIsLoading = false;
  let primaryReviewPlatformReviewUrl = "";
  if (primaryReviewPlatformPlaceId in platformReviews) {
    const primaryReviewPlatformReviewsObj = _get(
      platformReviews,
      primaryReviewPlatformPlaceId,
      {}
    );
    primaryReviewPlatformReviews = _get(
      primaryReviewPlatformReviewsObj,
      "data.data.reviews",
      []
    );
    primaryReviewPlatformSuccess = _get(
      primaryReviewPlatformReviewsObj,
      "success",
      false
    );
    primaryReviewPlatformIsLoading = _get(
      primaryReviewPlatformReviewsObj,
      "isLoading",
      false
    );
    primaryReviewPlatformReviewUrl = _get(
      primaryReviewPlatformReviewsObj,
      "data.data.ur",
      ""
    );
  }
  return {
    allPlacesReviews: platformReviews,
    dropDownData,
    primaryDropdownObj,
    totalReviews: primaryReviewPlatformReviews,
    success: primaryReviewPlatformSuccess,
    isLoading: primaryReviewPlatformIsLoading,
    reviewUrl: primaryReviewPlatformReviewUrl
  };
};

export default connect(mapStateToProps)(CommonReviewTabPanel);
