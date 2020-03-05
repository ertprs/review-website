import React, { Component } from "react";
import { connect } from "react-redux";
import AddProduct from "./AddEditProduct/AddProduct";
import ShowProductReviews from "./ShowProductReviews";
import { getAllProductReviewsPlatforms } from "../../../store/actions/dashboardActions";
import _get from "lodash/get";
import { isValidArray } from "../../../utility/commonFunctions";

class ProductReviews extends Component {
  componentDidMount() {
    const { getAllProductReviewsPlatforms, scrollToTopOfThePage } = this.props;
    if (scrollToTopOfThePage) {
      scrollToTopOfThePage();
    }
    getAllProductReviewsPlatforms();
  }
  render() {
    const { products } = this.props;
    return (
      <div>
        {isValidArray(products) && (products || []).length > 0 ? (
          <ShowProductReviews />
        ) : (
          <AddProduct initSetup={true} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const products = _get(state, "dashboardData.products.data", []);
  return { products };
};

export default connect(mapStateToProps, { getAllProductReviewsPlatforms })(
  ProductReviews
);
