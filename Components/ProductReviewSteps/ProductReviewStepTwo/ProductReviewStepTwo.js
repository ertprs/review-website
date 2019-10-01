import React from "react";
import { productReviewStepTwoStyles } from "./productReviewStepTwoStyles";
import ReviewCard from "../../Widgets/ReviewCard/ReviewCard";
import RatingIndicators from "../../Widgets/RatingIndicators/RatingIndicators";
import FormField from "../../Widgets/FormField/FormField";
import Ratings from "react-ratings-declarative";
import VideoUploadForm from "../../Widgets/VideoUploadForm/VideoUploadForm";
import UniversalLoader from "../../Widgets/UniversalLoader/UniversalLoader";

import uuid from "uuid/v1";
class ProductReviewStepTwo extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productToRate !== this.props.productToRate) {
      window.scrollTo(0, 0);
    }
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
    const {
      productToRate,
      goToNextStep,
      ratings,
      reviewSent,
      reviewChoice,
      videoUploaded,
      videoDataSent
    } = this.props;
    const additionalData = (
      <Ratings
        rating={ratings.mainRating || 0}
        widgetRatedColors="#21bc61"
        widgetHoverColors="#21bc61"
        widgetDimensions="40px"
        widgetSpacings="2px"
        changeRating={newRating => {
          this.props.handleRatingChange("mainRating", newRating);
        }}
      >
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
      </Ratings>
    );

    return (
      <div className="finalReviewSection">
        <style jsx>{productReviewStepTwoStyles}</style>
        {reviewSent === "no" && videoDataSent === "no" ? (
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
        ) : null}
        <div className="finalReviewSectionBody">
          {/* display the below components only till the text_review / video_review is not submitted */}
          {reviewSent === "no" && videoDataSent === "no"
            ? this.renderRateProductAttributes()
            : null}

          {reviewSent === "no" && videoUploaded === "no" ? (
            <div className="reviewChoice">
              {this.renderReviewChoiceSection()}
            </div>
          ) : null}

          {reviewSent === "no" && reviewChoice === "text_review"
            ? this.renderReviewTextBox()
            : null}
          {reviewChoice === "text_review" ? this.renderCheckBoxAndBtn() : null}
        </div>
      </div>
    );
  };

  renderReviewChoiceSection = () => {
    const { reviewChoice } = this.props;
    return (
      <div className="finalReviewSectionHeader">
        <style jsx>{productReviewStepTwoStyles}</style>
        <div className="rateProdAttrHeader">
          <h5 style={{ marginTop: "3%", marginBottom: "5%" }}>
            Please choose the review mode from below -
          </h5>
          <div className="reviewChoiceContainer">
            <div>
              <label className="reviewChoiceLabel">
                <input
                  type="radio"
                  value="text_review"
                  name="reviewChoice"
                  checked={reviewChoice === "text_review" ? true : false}
                  onChange={e =>
                    this.props.handleReviewChoiceChange(e, "reviewChoice")
                  }
                />{" "}
                Text Review
              </label>
            </div>
            <div>
              <label className="reviewChoiceLabel">
                <input
                  type="radio"
                  value="video_review"
                  name="reviewChoice"
                  onChange={e =>
                    this.props.handleReviewChoiceChange(e, "reviewChoice")
                  }
                  checked={reviewChoice === "video_review" ? true : false}
                />{" "}
                Video Review
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderCheckBox = ({ id, text }) => {
    const checkBoxVal = this.props[id];
    // const { errors } = this.state;
    return (
      <>
        <style jsx>{productReviewStepTwoStyles}</style>
        <label style={{ verticalAlign: "middle" }}>
          <input
            type="checkbox"
            onChange={e => this.props.handleCheckBoxChange(e, id)}
            style={{
              height: "1.01rem",
              width: "1.01rem",
              verticalAlign: "middle"
            }}
            value={checkBoxVal}
            checked={checkBoxVal === "yes" ? true : false}
          />{" "}
          {id === "agreement" ? (
            <span>
              I accept the <a href="/">Terms &amp; conditions</a> and{" "}
              <a href="/">Privacy Policy.</a>
            </span>
          ) : (
            text
          )}
        </label>
        {/* <div className="checkBoxError">
          {errors[id] && this.state[id] !== "yes" ? <span>{error}</span> : null}
        </div> */}
      </>
    );
  };

  renderCheckBoxAndBtn = () => {
    const { reviewSent, productToRate, productsAlreadyTagged } = this.props;
    // const videoReview = {
    //   id: "showVideoForm",
    //   text: "I also want to upload a video review.",
    //   error: ""
    // };
    return (
      <div className="checkBoxAndBtnContainer">
        <style jsx>{productReviewStepTwoStyles}</style>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="checkBoxContainer">
                {/* {reviewSent === "no" &&
                this.checkAlreadyTagged(
                  productsAlreadyTagged,
                  productToRate.id
                ) === undefined
                  ? this.renderCheckBox(videoReview)
                  : null} */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="submitBtnContainer">{this.renderSubmitBtn()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderUniversalLoader = () => {
    const {
      productToRate,
      showVideoForm,
      videoUploaded,
      reviewChoice
    } = this.props;
    return (
      <UniversalLoader status={this.props.reviewSent}>
        {/* First child for loading state */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              height: "32px",
              width: "32px",
              textAlign: "center",
              margin: "0 auto"
            }}
          >
            <img
              src="/static/images/dotsLoader.gif"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>
        {/* Second child for success state */}
        {reviewChoice === "text_review" ? (
          <div style={{ textAlign: "center", color: "#21bc61" }}>
            Text review for product {productToRate.name} submitted, please click
            on the button below to proceed
          </div>
        ) : null}

        {/* third child for error state */}
        <div style={{ textAlign: "left", color: "red" }}>
          Some error occured, please try again later{" "}
          <i className="fa fa-close"></i>
        </div>
      </UniversalLoader>
    );
  };

  renderSubmitBtn = () => {
    const { reviewBtnClicked, handleReviewFormSubmit } = this.props;
    return (
      <>
        <style jsx>{productReviewStepTwoStyles}</style>
        {reviewBtnClicked ? (
          this.renderUniversalLoader()
        ) : (
          <button className="reviewSubmitBtn" onClick={handleReviewFormSubmit}>
            Submit your review
          </button>
        )}
      </>
    );
  };

  renderReviewTextBox = () => {
    const { reviewFormSubmissionErrors } = this.props;
    return (
      <div className="reviewTextBoxContainer">
        <style jsx>{productReviewStepTwoStyles}</style>
        <div className="reviewTextBoxHeader">
          <h5>Write review</h5>
        </div>
        <FormField
          {...this.props.formData.review}
          handleChange={(e, id) => {
            this.props.handleFormDataChange(e, id);
          }}
          id="review"
          rows="5"
          col="5"
          styles={{}}
        />
        <div className="reviewError">
          {(reviewFormSubmissionErrors["review"] &&
            !this.props.formData.review.valid) ||
          (!this.props.formData.review.valid &&
            this.props.formData.review.touched) ? (
            <span>Atleast 25 characters</span>
          ) : null}
        </div>
      </div>
    );
  };

  renderAttributeItems = () => {
    let output = [];
    const attributes = this.props.productToRate.attributes;
    for (let item in attributes) {
      output = [
        ...output,
        <div className="col-md-4" key={uuid()}>
          <div className="rateProdAttrBody">
            <div className="rateProdAttrBodyHeader">
              <h6 style={{ textTransform: "capitalize" }}>
                {/* might be only key in future i.e. attributes[item] to item */}
                {attributes[item]}
              </h6>
              <RatingIndicators
                rating={this.props.ratings[attributes[item]] || 0}
                typeOfWidget="star"
                widgetRatedColors="#21bc61"
                widgetHoverColors="#21bc61"
                widgetDimensions="22px"
                widgetSpacings="1px"
                changeRating={newRating => {
                  this.props.handleRatingChange(attributes[item], newRating);
                }}
              />
            </div>
          </div>
        </div>
      ];
    }
    return output;
  };

  renderRateProductAttributes = () => {
    const { productToRate, reviewFormSubmissionErrors } = this.props;
    return (
      <div className="rateProdAttrContainer">
        <style jsx>{productReviewStepTwoStyles}</style>
        <div className="rateProdAttrHeader">
          <h5 style={{ marginTop: "3%", marginBottom: "5%" }}>
            Rate this product's attributes
          </h5>
        </div>
        <div className="row">{this.renderAttributeItems()}</div>
        <div className="rateProdAttrError">
          {reviewFormSubmissionErrors["ratings"] ? (
            <span>Please rate all the attributes</span>
          ) : null}
        </div>
      </div>
    );
  };

  checkAlreadyTagged = (productsAlreadyTagged, item) => {
    return productsAlreadyTagged.find(taggedProduct => {
      return taggedProduct.id === item;
    });
  };

  getSelectOptions = (productsTagged, selectedProducts) => {
    let options = [];
    const { productToRate, productsAlreadyTagged } = this.props;
    for (let item in selectedProducts) {
      //check if already present in productsTagged
      let alreadyTagged = this.checkAlreadyTagged(
        productsAlreadyTagged,
        Number(item)
      );
      if (alreadyTagged === undefined && productToRate.id !== Number(item)) {
        options = [
          ...options,
          { value: item, label: selectedProducts[item].name }
        ];
      }
    }
    return options;
  };

  renderVideoUploadForm = () => {
    const {
      formData,
      videoUploaded,
      productToRate,
      productsTagged,
      selectedProducts,
      productsAlreadyTagged
    } = this.props;
    let selectOptions = this.getSelectOptions(
      productsTagged,
      selectedProducts,
      productsAlreadyTagged
    );

    const errors = {};
    return videoUploaded === "no" ? (
      <VideoUploadForm
        formData={{ ...formData }}
        handleFormDataChange={this.props.handleFormDataChange}
        handleVideoUploadSubmit={this.props.handleVideoUploadSubmit}
        errors={errors}
        ref={this.props.innerRef}
        videoFile={this.props.videoFile}
        videoDataSent={this.props.videoDataSent}
        select={true}
        selectOptions={selectOptions}
        onSelectChange={this.props.handleProductTagsChanged}
      />
    ) : (
      <UniversalLoader status={videoUploaded}>
        <div></div>
        <div
          style={{
            color: "green",
            marginTop: "50px",
            height: "50vh",
            textAlign: "center"
          }}
        >
          Video for {productToRate.name} was uploaded successfully, please click
          on the button below to proceed.
        </div>
        <div
          style={{
            color: "red",
            marginTop: "50px",
            height: "50vh",
            textAlign: "center"
          }}
        >
          Some error occured while uploading video review, please try again
          later
        </div>
      </UniversalLoader>
    );
  };

  renderNextBtn = () => {
    return (
      <>
        <style jsx>{productReviewStepTwoStyles}</style>
        <button
          className="nextBtn"
          onClick={() => {
            this.props.goToNextStep();
          }}
        >
          Next <i className="fa fa-arrow-right"></i>
        </button>
      </>
    );
  };

  renderMajorSections = () => {
    const {
      showVideoForm,
      reviewSent,
      videoUploaded,
      reviewChoice,
      videoDataSent
    } = this.props;
    return (
      <>
        {this.renderHeader()}
        {this.renderHeroSection()}
        {reviewChoice === "video_review" &&
        reviewSent === "no" &&
        reviewSent !== "in-progress"
          ? this.renderVideoUploadForm()
          : null}
        {/* {this.renderNextBtn()} */}
        {videoDataSent === "yes" &&
        reviewSent !== "no" &&
        reviewSent !== "in-progress"
          ? this.renderVideoUploadForm()
          : null}
      </>
    );
  };

  render() {
    const {
      showVideoForm,
      reviewSent,
      videoUploaded,
      reviewChoice,
      videoDataSent,
      productToRate,
      productsAlreadyTagged,
      selectedProductKeys,
      step
    } = this.props;
    //Add you have already tagged this product, please click on next to continue
    // console.log(
    //   reviewSent === "no" &&
    //     videoDataSent === "no" &&
    //     videoUploaded === "no" &&
    //     this.checkAlreadyTagged(productsAlreadyTagged, productToRate.id) ===
    //       undefined
    // );
    return (
      <div>
        {/* {this.renderMajorSections()} */}
        {this.checkAlreadyTagged(productsAlreadyTagged, productToRate.id) ===
          undefined ||
        (reviewSent !== "no" ||
          videoDataSent !== "no" ||
          videoUploaded !== "no") ? (
          this.renderMajorSections()
        ) : (
          <div>
            <style jsx>{productReviewStepTwoStyles}</style>
            <h6 style={{ textAlign: "right" }}>
              Review {step} of {selectedProductKeys.length}
            </h6>
            <div style={{ margin: "50px 0 80px 0" }}>
              You have already tagged this product in a video review, please
              click on next button to proceed
            </div>
          </div>
        )}
        {(videoDataSent !== "no" && videoUploaded !== "no") ||
        reviewSent !== "no" ||
        this.checkAlreadyTagged(productsAlreadyTagged, productToRate.id) !==
          undefined
          ? this.renderNextBtn()
          : null}
      </div>
    );
  }
}
export default React.forwardRef((props, ref) => (
  <ProductReviewStepTwo innerRef={ref} {...props} />
));
