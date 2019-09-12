import React from "react";
import { productReviewStepTwoStyles } from "./productReviewStepTwoStyles";
import ReviewCard from "../../Widgets/ReviewCard/ReviewCard";
import RatingIndicators from "../../Widgets/RatingIndicators/RatingIndicators";
import FormField from "../../Widgets/FormField/FormField";
class ProductReviewStepTwo extends React.Component {
  state = {
    ratings: {
      mainRating: 0
    },
    formData: {
      review: {
        element: "textarea",
        value: "",
        placeholder:
          "Tell us what you think about this product. Use at least 25 characters.",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 25
        },
        name: "review"
      }
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderHeader = () => {
    const { step, selectedProductKeys } = this.props;
    return (
      <div className="reviewHeader">
        <style jsx>{productReviewStepTwoStyles}</style>
        <h6>
          Review {step} of {selectedProductKeys.length}
        </h6>
      </div>
    );
  };

  renderHeroSection = () => {
    const { productToRate } = this.props;
    const additionalData = (
      <RatingIndicators
        rating={4.5}
        typeOfWidget="star"
        widgetRatedColors="#21bc61"
        widgetDimensions="35px"
        widgetSpacings="2px"
      />
    );
   
    return (
      <div className="finalReviewSection">
        <style jsx>{productReviewStepTwoStyles}</style>
        <div className="finalReviewSectionHeader">
          <ReviewCard
            variant="productCard"
            image="/static/images/product.jpg"
            title={productToRate.name}
            body={productToRate.description}
            productPicStyles={{ height: "150px", width: "auto" }}
            additionalData={additionalData}
          />
        </div>
        <div className="finalReviewSectionBody">
          {this.renderRateProductAttributes()}
          {this.renderReviewTextBox()}
          {/* {this.renderCheckBoxAndBtn()} */}
          <button
            className="nextBtn"
            onClick={() => {
              this.props.goToNextStep();
            }}
          >
            Next <i className="fa fa-arrow-right"></i>
          </button>
        </div>
      </div>
    );
  };

  renderReviewTextBox = () => {
    const { errors } = this.state;
    return (
      <div className="reviewTextBoxContainer">
        <style jsx>{productReviewStepTwoStyles}</style>
        <div className="reviewTextBoxHeader">
          <h5>Write review</h5>
        </div>
        <FormField
          {...this.state.formData.review}
          handleChange={(e, id) => {
            this.handleFormDataChange(e, id);
          }}
          id="review"
          rows="5"
          col="5"
          styles={{}}
        />
        {/* <div className="reviewError">
          {(errors["review"] && !this.state.formData.review.valid) ||
          (!this.state.formData.review.valid &&
            this.state.formData.review.touched) ? (
            <span>Atleast 25 characters</span>
          ) : null}
        </div> */}
      </div>
    );
  };

  renderAttributeItems = () => {
    let output = [];
    const attributes = this.props.productToRate.attributes;
    for (let item in attributes) {
      output = [
        ...output,
        <div className="col-md-4">
          <div className="rateProdAttrBody">
            <div className="rateProdAttrBodyHeader">
              <h6 style={{ textTransform: "capitalize" }}>
                {attributes[item]}
              </h6>
              <RatingIndicators
                rating={this.state.ratings.quality || 0}
                typeOfWidget="star"
                widgetRatedColors="#21bc61"
                widgetHoverColors="#21bc61"
                widgetDimensions="22px"
                widgetSpacings="1px"
              />
            </div>
          </div>
        </div>
      ];
    }
    return output;
  };

  renderRateProductAttributes = () => {
    const { errors } = this.state;
    const { productToRate } = this.props;
    return (
      <div className="rateProdAttrContainer">
        <style jsx>{productReviewStepTwoStyles}</style>
        <div className="rateProdAttrHeader">
          <h5 style={{ marginTop: "3%", marginBottom: "5%" }}>
            Rate this product's attributes
          </h5>
        </div>
        <div className="row">{this.renderAttributeItems()}</div>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderHeroSection()}
      </div>
    );
  }
}
export default ProductReviewStepTwo;
