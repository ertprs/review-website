import React, { Component } from "react";
import ProductReviewCard from "./ProductReviewCard/index";
import ReviewsFilter from "./ReviewsFilter";
import ProductsFilter from "./ProductsFilter";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import ProductCRUDDialog from "../ProductCRUDDialog";
import { connect } from "react-redux";
import {
  fetchAllProducts,
  fetchProductReviews
} from "../../../../store/actions/dashboardActions";
import _get from "lodash/get";
import { isValidArray } from "../../../../utility/commonFunctions";
import uuid from "uuid/v1";
import CircularProgress from "@material-ui/core/CircularProgress";

class ShowProductReviews extends Component {
  state = {
    dialogOpen: false,
    selectedProduct: {},
    selectedProductPlatform: { value: "", label: "All platforms" }
  };

  componentDidMount() {
    const products = _get(this.props, "products", []);
    //!side effect for fetching all products if it's currently empty on mount
    if (products.length === 0) {
      this.props.fetchAllProducts();
    }
  }

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  //? change handler for product select
  handleSelectedProductChange = valObj => {
    this.setState({ selectedProduct: { ...valObj } }, () => {
      const productId = _get(this.state.selectedProduct, "value", "");
      const platformId = _get(this.state.selectedProductPlatform, "value", "");
      this.props.fetchProductReviews(productId, platformId);
    });
  };

  //? change handler for product platforms select
  handleSelectedProductPlatformChange = valObj => {
    this.setState({ selectedProductPlatform: { ...valObj } }, () => {
      const productId = _get(this.state.selectedProduct, "value", "");
      const platformId = _get(this.state.selectedProductPlatform, "value", "");
      this.props.fetchProductReviews(productId, platformId);
    });
  };

  render() {
    const { dialogOpen, selectedProduct, selectedProductPlatform } = this.state;
    const { productReviews, isLoadingProductReviews } = this.props;
    return (
      <>
        <div>
          <div className="row">
            <div className="col-md-4" style={{ textAlign: "center" }}>
              <ProductsFilter
                handleSelectedProductChange={this.handleSelectedProductChange}
                selectedProduct={selectedProduct}
              />
            </div>
            <div className="col-md-4">
              {(Object.keys(selectedProduct) || []).length > 0 ? (
                <ReviewsFilter
                  handleSelectedProductPlatformChange={
                    this.handleSelectedProductPlatformChange
                  }
                  selectedProductPlatform={selectedProductPlatform}
                />
              ) : null}
            </div>
            <div className="col-md-4" style={{ textAlign: "right" }}>
              <Button
                color="primary"
                variant="contained"
                endIcon={<SettingsIcon />}
                onClick={() => {
                  this.setState({ dialogOpen: true });
                }}
              >
                Manage Products
              </Button>
            </div>
          </div>
          <div style={{ margin: "25px 0 15px 0" }}>
            {isLoadingProductReviews ? (
              <div style={{ textAlign: "center", marginTop: "75px" }}>
                <CircularProgress />
              </div>
            ) : (Object.keys(selectedProduct) || []).length === 0 ? (
              <h5 style={{ textAlign: "left" }}>
                Trying to fetch products, please wait and if it takes longer,
                please refresh or visit this page later
              </h5>
            ) : productReviews.length > 0 ? (
              productReviews.map(review => (
                <div
                  style={{ textAlign: "center" }}
                  key={uuid()}
                  style={{ margin: "15px 0 15px 0" }}
                >
                  <ProductReviewCard review={review} />
                </div>
              ))
            ) : (
              <h4 style={{ textAlign: "center", marginTop: "40px" }}>
                No reviews found !
              </h4>
            )}
          </div>
        </div>
        <ProductCRUDDialog
          open={dialogOpen}
          handleClose={this.handleDialogClose}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  const products = _get(state, "dashboardData.products.data", []);
  let productReviews = _get(
    state,
    "dashboardData.productReviews.data.data",
    []
  );
  let isLoadingProductReviews = _get(
    state,
    "dashboardData.productReviews.isLoading",
    false
  );

  if (!isValidArray(productReviews)) {
    productReviews = [];
  }
  let slicedProductReviews = [];
  if ((productReviews || []).length > 100) {
    slicedProductReviews = productReviews.slice(0, 100);
    return {
      products,
      productReviews: slicedProductReviews,
      isLoadingProductReviews
    };
  }

  return {
    products,
    productReviews,
    isLoadingProductReviews
  };
};

export default connect(mapStateToProps, {
  fetchAllProducts,
  fetchProductReviews
})(ShowProductReviews);
