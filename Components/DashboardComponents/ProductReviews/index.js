import React, { Component } from "react";
import SetupProductReviews from "./SetupProductReviews";
import ShowProductReviews from "./ShowProductReviews";

// state transition diagram for this component :
// ProductReviews =>  Already configured  => yes => SetupProductReviews
//                                           no  => ShowProductReviews

class ProductReviews extends Component {
  render() {
    return (
      <div>
        <SetupProductReviews />
      </div>
    );
  }
}

export default ProductReviews;
