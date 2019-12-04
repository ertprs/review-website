import React, { Component } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import _map from "lodash/map";
import { fetchReviews } from "../../../store/actions/dashboardActions";
import ReactPaginate from "react-paginate";
import Head from "next/head";
import Snackbar from "../../Widgets/Snackbar";
import { CircularProgress, Typography } from "@material-ui/core";
import GoogleReviewCard from "../../Widgets/CommonReviewCard";
import NoReviewsFound from "./noReviewsFound";
import Link from "next/link";

class GoogleReviewsDs extends Component {
  state = {
    perPage: 10,
    showSnackbar: false,
    variant: "success",
    snackbarMsg: ""
  };

  handlePageChange = ({ selected }) => {
    const { fetchReviews, token } = this.props;
    fetchReviews(token, selected + 1);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      const { error, success } = this.props;
      if (error && !success) {
        this.setState({
          showSnackbar: true,
          variant: "error",
          snackbarMsg: error
        });
      }
    }
  }

  render() {
    const {
      reviews,
      total,
      isFetching,
      success,
      googleDirectReviewUrl,
      businessAddress,
      domain,
      googlePlaceId,
      areGoogleReviewsFetching,
      isReviewsPusherConnected
    } = this.props;
    const { perPage } = this.state;
    const googleReviewUrl =
      googleDirectReviewUrl ||
      `https://www.google.com/maps/search/?api=1&query=${domain}&query_place_id=${googlePlaceId}`;

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
        {/* We are using areGoogleReviewsFetching to update the reviews from pusher */}
        <div className="reviewsContainer">
          {isFetching === true || areGoogleReviewsFetching === true ? (
            <div className="loaderContainer">
              <CircularProgress color="secondary" />
            </div>
          ) : isFetching === false ? (
            !success ? (
              <NoReviewsFound />
            ) : (
              <>
                {businessAddress ? (
                  <div className="bold">
                    Google Direct Review url :
                    <Link href={googleReviewUrl}>
                      <a style={{ marginLeft: "10px" }} target="_blank">
                        {businessAddress}
                      </a>
                    </Link>
                  </div>
                ) : null}

                {_map(reviews, review => {
                  let reviewToSend = {
                    name: _get(review, "user", "") || _get(review, "name", ""),
                    text:
                      _get(review, "text", "") || _get(review, "review", ""),
                    rating: _get(review, "rating", 0),
                    date: _get(review, "date", "")
                  };
                  return (
                    <GoogleReviewCard review={reviewToSend} provider="google" />
                  );
                })}
              </>
            )
          ) : null}
        </div>
        <div
          className={`${
            isFetching || success == false || total < 11
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
        <Snackbar
          open={this.state.showSnackbar}
          variant={this.state.variant}
          handleClose={() => this.setState({ showSnackbar: false })}
          message={this.state.snackbarMsg}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData, auth } = state;
  const token = _get(auth, "logIn.token", "");
  const ratings = _get(dashboardData, "reviews.data.rating", 0);
  const reviews = _get(dashboardData, "reviews.data.reviews", []);
  const total = _get(dashboardData, "reviews.data.total", 0);
  const nextReviews = _get(dashboardData, "reviews.data.next", "");
  const prevReviews = _get(dashboardData, "reviews.data.prev", "");
  const isFetching = _get(dashboardData, "reviews.isFetching", "undefined");
  const success = _get(dashboardData, "reviews.success", false);
  const error = _get(dashboardData, "reviews.error", "");
  const type = _get(dashboardData, "type", "");
  const googleDirectReviewUrl = _get(
    auth,
    "logIn.userProfile.business_profile.google_places.directReviewUrl",
    ""
  );
  const businessAddress = _get(
    auth,
    "logIn.userProfile.business_profile.google_places.address",
    ""
  );
  let googlePlaceId = _get(
    auth,
    "logIn.userProfile.business_profile.google_places.placeId",
    ""
  );
  const domain = _get(auth, "logIn.userProfile.business_profile.domain", "");
  const areGoogleReviewsFetching = _get(
    dashboardData,
    "reviewsObject.google",
    false
  );
  const isReviewsPusherConnected = _get(
    dashboardData,
    "isReviewsPusherConnected",
    undefined
  );
  return {
    token,
    ratings,
    reviews,
    total,
    nextReviews,
    prevReviews,
    type,
    isFetching,
    error,
    success,
    googleDirectReviewUrl,
    businessAddress,
    googlePlaceId,
    domain,
    areGoogleReviewsFetching,
    isReviewsPusherConnected
  };
};

export default connect(mapStateToProps, { fetchReviews })(GoogleReviewsDs);
