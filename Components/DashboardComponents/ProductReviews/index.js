import React, { Component } from "react";
import { connect } from "react-redux";
import AddProduct from "./AddProduct";
import ShowProductReviews from "./ShowProductReviews";
import { getAllProductReviewsPlatforms } from "../../../store/actions/dashboardActions";
class ProductReviews extends Component {
  componentDidMount() {
    const { getAllProductReviewsPlatforms } = this.props;
    getAllProductReviewsPlatforms();
  }
  render() {
    return (
      <div>
        <ShowProductReviews />
      </div>
    );
  }
}

export default connect(null, { getAllProductReviewsPlatforms })(ProductReviews);
