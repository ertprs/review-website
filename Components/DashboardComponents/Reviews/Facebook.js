import React, { Component } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import _map from "lodash/map";
import { getThirdPartyReviews } from "../../../store/actions/dashboardActions";
import ReactPaginate from "react-paginate";
import Head from "next/head";
import Snackbar from "../../Widgets/Snackbar";
import { CircularProgress, Typography } from "@material-ui/core";
import ReviewCard from "../../Widgets/CommonReviewCard";
import NoReviewsFound from "./noReviewsFound";

class Facebook extends Component {
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
      areFacebookReviewsFetching,
      isReviewsPusherConnected
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

        {/* We are using areFacebookReviewsFetching to update the reviews from pusher */}

        <div className="reviewsContainer">
          {isLoading === true || areFacebookReviewsFetching === true ? (
            <div className="loaderContainer">
              <CircularProgress color="secondary" />
            </div>
          ) : isLoading === false ? (
            !success ? (
              <NoReviewsFound />
            ) : !showDelay ? (
              <>
                {_map(reviews, review => {
                  let reviewToSend = {
                    name: _get(review, "user", ""),
                    text: _get(review, "text", ""),
                    rating: _get(review, "rating", 0)
                  };
                  return (
                    <ReviewCard review={reviewToSend} provider="facebook" />
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
            total === 0 ||
            reviews === 0 ||
            areFacebookReviewsFetching ||
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
        {/* <Snackbar
          open={this.state.showSnackbar}
          variant={this.state.variant}
          handleClose={() => this.setState({ showSnackbar: false })}
          message={this.state.snackbarMsg}
        /> */}
      </>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData } = state;
  const totalReviews = _get(dashboardData, "facebookReviews.data.reviews", []);
  const success = _get(dashboardData, "facebookReviews.success", undefined);
  const isLoading = _get(dashboardData, "facebookReviews.isLoading", false);
  const errorMsg = _get(dashboardData, "facebookReviews.errorMsg", "");
  const areFacebookReviewsFetching = _get(
    dashboardData,
    "reviewsObject.facebook",
    false
  );
  const isReviewsPusherConnected = _get(
    dashboardData,
    "isReviewsPusherConnected",
    false
  );
  return {
    totalReviews,
    success,
    isLoading,
    errorMsg,
    areFacebookReviewsFetching,
    isReviewsPusherConnected
  };
};

export default connect(mapStateToProps, { getThirdPartyReviews })(Facebook);
