import React, { Component } from "react";
import ReviewCard from "../../Widgets/MyReviewsBusiness/ReviewCard";
import { connect } from "react-redux";
import { fetchReviews } from "../../../store/actions/dashboardActions";

class MyReviewsBusiness extends Component {
  componentDidMount() {
    fetchReviews();
  }

  render() {
    return (
      <div className="container">
        <style jsx>{`
          .reviewsContainer {
            margin: 20px 40px;
          }
        `}</style>
        <div className="reviewsContainer">
          <ReviewCard rating={4} />
          <ReviewCard rating={3} />
          <ReviewCard rating={4.5} />
          <ReviewCard rating={3} />
          <ReviewCard rating={5} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData } = state;
  return { dashboardData };
};

export default connect(
  mapStateToProps,
  { fetchReviews }
)(MyReviewsBusiness);
