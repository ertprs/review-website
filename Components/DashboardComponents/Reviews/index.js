import React, { Component } from "react";
import ReviewCard from "../../Widgets/MyReviewsBusiness/ReviewCard";
import { connect } from "react-redux";
import _get from "lodash/get";
import _map from "lodash/map";
import { fetchReviews } from "../../../store/actions/dashboardActions";
import ReactPaginate from "react-paginate";
import CircularProgress from "@material-ui/core/CircularProgress";
import Head from "next/head";
class MyReviewsBusiness extends Component {
  state = {
    perPage: 10
  };

  handlePageChange = ({ selected }) => {
    const { fetchReviews, token } = this.props;
    fetchReviews(token, selected + 1);
  };

  render() {
    const { reviews, total, isFetching } = this.props;
    const { perPage } = this.state;
    return (
      <>
      <Head>
      <link rel="stylesheet" href="/static/reviews.css" />
      </Head>
        <div className="container">
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
            .listItem{
              display:none;
            }
          `}</style>
          <div className="reviewsContainer">
            {isFetching === true ? (
              <div className="loaderContainer">
                <CircularProgress color="secondary" />
              </div>
            ) : isFetching === false ? (
              reviews.length < 1 ? (
                "No Reviews Found!"
              ) : (
                _map(reviews, review => {
                  return <ReviewCard review={review} />;
                })
              )
            ) : null}
          </div>
        </div>

        <div style={{display:"flex", flex:"1", justifyContent:"center", marginTop:"35px"}}>
        <ReactPaginate
          pageCount={total / perPage}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          initialPage={0}
          onPageChange={this.handlePageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          pageClassName={'listItem'}
          nextClassName={'listItem'}
          previousClassName={'listItem'}
          pageLinkClassName={'listLink'}
          nextLinkClassName={'listLink'}
          previousLinkClassName={'listLink'}
        />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData, auth } = state;
  const token = _get(auth, "logIn.token", "");
  const ratings = _get(dashboardData, "reviewsData.rating", 0);
  const reviews = _get(dashboardData, "reviewsData.reviews", []);
  const total = _get(dashboardData, "reviewsData.total", 0);
  const nextReviews = _get(dashboardData, "reviewsData.next", "");
  const prevReviews = _get(dashboardData, "reviewsData.prev", "");
  const isFetching = _get(dashboardData, "fetchingReviews", "undefined");
  const type = _get(dashboardData, "type", "");
  return {
    token,
    ratings,
    reviews,
    total,
    nextReviews,
    prevReviews,
    type,
    isFetching
  };
};

export default connect(
  mapStateToProps,
  { fetchReviews }
)(MyReviewsBusiness);
