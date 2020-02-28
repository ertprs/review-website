import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./AddEditProduct/ProductCard";
import ShowProductReviews from "./ShowProductReviews";
import { getAllProductReviewsPlatforms } from "../../../store/actions/dashboardActions";
class ProductReviews extends Component {
  componentDidMount() {
    const { getAllProductReviewsPlatforms, scrollToTopOfThePage } = this.props;
    if (scrollToTopOfThePage) {
      scrollToTopOfThePage();
    }
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
