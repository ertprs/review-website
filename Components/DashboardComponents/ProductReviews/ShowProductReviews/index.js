import React, { Component } from "react";
import ProductReviewCard from "./ProductReviewCard/index";
import ReviewsFilter from "./ReviewsFilter";
import ProductsFilter from "./ProductsFilter";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import ProductManagementDialog from "./ProductManagement/ProductManagementDialog";

class ShowProductReviews extends Component {
  state = {
    dialogOpen: false
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const { dialogOpen } = this.state;
    return (
      <>
        <div>
          <div className="row">
            <div className="col-md-4" style={{ textAlign: "center" }}>
              <ReviewsFilter />
            </div>
            <div className="col-md-4" style={{ textAlign: "center" }}>
              <ProductsFilter />
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
                Setup product reviews
              </Button>
            </div>
          </div>
          <div style={{ margin: "25px 0 15px 0" }}>
            <ProductReviewCard />
          </div>
        </div>
        <ProductManagementDialog
          open={dialogOpen}
          handleClose={this.handleDialogClose}
        />
      </>
    );
  }
}

export default ShowProductReviews;
