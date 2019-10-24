import React, { Component } from "react";
import ReviewCard from "../../Widgets/MyReviewsBusiness/ReviewCard";
import { connect } from "react-redux";
import _get from "lodash/get";
import _map from "lodash/map";
import { fetchReviews } from "../../../store/actions/dashboardActions";
import ReactPaginate from "react-paginate";
import CircularProgress from "@material-ui/core/CircularProgress";
import Head from "next/head";
import NoReviewsFound from "./noReviewsFound";
import Snackbar from "../../Widgets/Snackbar";
import { Paper } from "@material-ui/core";

class Reviews extends Component {
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
    const { reviews, total, isFetching, success, directReviewUrl } = this.props;
    const { perPage } = this.state;
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
          @media only screen and (max-width: 420px) {
            .reviewsContainer {
              margin: 0;
              font-size: 0.8rem;
            }
          }
        `}</style>
        <div className="reviewsContainer">
          {isFetching === true ? (
            <div className="loaderContainer">
              <CircularProgress color="secondary" />
            </div>
          ) : isFetching === false ? (
            !success ? (
              <NoReviewsFound />
            ) : (
              <>
                <Paper style={{ padding: "15px 30px" }}>
                  <a href={directReviewUrl} target="_blank">
                    Google Review Url: {directReviewUrl}
                  </a>
                </Paper>
                {_map(reviews, review => {
                  return <ReviewCard review={review} />;
                })}
              </>
            )
          ) : null}
        </div>
        <div
          className={`${
            isFetching || success == false
              ? "hiddenPagination"
              : "paginationContainer"
          }`}
        >
          <ReactPaginate
            pageCount={total / perPage}
            pageRangeDisplayed={total / perPage}
            marginPagesDisplayed={0}
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
  const directReviewUrl = _get(
    auth,
    "logIn.userProfile.business_profile.google_places.directReviewUrl",
    ""
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
    directReviewUrl
  };
};

export default connect(
  mapStateToProps,
  { fetchReviews }
)(Reviews);
