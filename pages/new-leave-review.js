import React from "react";
import Router from "next/router";
import { newLeaveReviewPageStyles } from "../Components/Styles/newLeaveReviewPageStyles";
import Ratings from "react-ratings-declarative";
import ReviewCard from "../Components/Widgets/ReviewCard/ReviewCard";
import RatingIndicators from "../Components/Widgets/RatingIndicators/RatingIndicators";
import FormField from "../Components/Widgets/FormField/FormField";
import CustomModal from "../Components/Widgets/CustomModal/CustomModal";
import UniversalLoader from "../Components/Widgets/UniversalLoader/UniversalLoader";
import Footer from '../Components/Footer/Footer';
import validate from "../utility/validate";

class NewLeaveReview extends React.Component {
  state = {
    reviewSent: "no",
    ratings: {
      mainRating: 0
    },
    showModal: false,
    errors: {},
    agreement: "no",
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

  handleModalVisibilityToggle = () => {
    this.setState(currentState => {
      return { showModal: !currentState.showModal };
    });
  };

  handleRatingChange = (id, newRating) => {
    const { ratings } = this.state;
    this.setState({ ratings: { ...ratings, [id]: newRating } });
  };

  handleFormDataChange = (e, id) => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [id]: {
          ...formData[id],
          value: e.target.value,
          valid: validate(e.target.value, formData[id].validationRules),
          touched: true
        }
      }
    });
  };

  validateAllFields = () => {
    const { formData } = this.state;
    const { agreement } = this.state;
    const { ratings } = this.state;
    let errorObj = {};
    let validRatings = true;
    let validFormData = true;
    for (let rating in ratings) {
      //ToDo: change and check for strings
      validRatings = validRatings && ratings[rating] > 0;
    }
    validFormData = validFormData && formData.review.valid;
    if (!validRatings) {
      //true means key is not valid
      errorObj = { ...errorObj, ratings: true };
    }
    if (!validFormData) {
      errorObj = { ...errorObj, review: true };
    }
    if (agreement === "no") {
      errorObj = { ...errorObj, agreement: true };
    }

    return errorObj;
  };

  handleFormSubmit = () => {
    //validating before submitting
    const errors = this.validateAllFields();
    const { formData } = this.state;
    const { ratings } = this.state;
    if (Object.keys(errors).length === 0) {
      //mimic data post
      const dataToSubmit = {
        ...ratings,
        review: formData.review.value,
        agreement: true
      };
      this.setState({ showModal: true, reviewSent: "in-progress" }, () => {
        //axios post dataToSubmit
        setTimeout(() => {
          this.setState({ reviewSent: "success" });

          setTimeout(()=>{
            Router.push("/")
          }, 2000);
        }, 3000);
      });
    } else {
      this.setState({ errors: { ...errors } });
    }
  };

  renderReviewHeader = () => {
    return (
      <div className="reviewHeader">
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="reviewHeaderLogoContainer">
          <img
            src="/static/business/index/images/gradientLogo.png"
            className="reviewHeaderLogoImage"
          />
        </div>
      </div>
    );
  };

  renderReviewHeroSection = () => {
    return (
      <div className="reviewHeroContainer">
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="reviewHeroHeading">
          <h3>Review your recent purchase</h3>
        </div>
        <div className="reviewHeroSubheading">
          <h6>Your feedback helps others make good choices</h6>
        </div>
      </div>
    );
  };

  renderMainReviewSection = () => {
    return (
      <div className="mainReviewSection">
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="mainReviewImageContainer">
          <img src="/static/images/capture.png" />
        </div>
        <div className="mainReviewHeading">
          <h4>https://google.com</h4>
        </div>
        <div className="mainReviewRatingsContainer">
          <Ratings
            rating={this.state.ratings.mainRating}
            widgetRatedColors="#21bc61"
            widgetHoverColors="#21bc61"
            widgetDimensions="40px"
            widgetSpacings="2px"
            changeRating={newRating => {
              this.handleRatingChange("mainRating", newRating);
            }}
          >
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
          </Ratings>
        </div>
        <div className="mainReviewRatingsCaption">
          How would you rate this product?
        </div>
      </div>
    );
  };

  renderFinalReviewSection = () => {
    const reviewCardBody = (
      <RatingIndicators
        rating={this.state.ratings.mainRating}
        typeOfWidget="star"
        widgetRatedColors="#21bc61"
        widgetDimensions="35px"
        widgetSpacings="2px"
      />
    );
    return (
      <div className="finalReviewSection">
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="finalReviewSectionHeader">
          <ReviewCard
            variant="productCard"
            image="/static/images/capture.png"
            title="google.com"
            body={reviewCardBody}
          />
        </div>
        <div className="finalReviewSectionBody">
          {this.renderRateProductAttributes()}
          {this.renderReviewTextBox()}
          {this.renderCheckBoxAndBtn()}
        </div>
      </div>
    );
  };

  renderRateProductAttributes = () => {
    const { errors } = this.state;
    return (
      <div className="rateProdAttrContainer">
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="rateProdAttrHeader">
          <h5 style={{ marginTop: "3%" }}>Rate this product's attributes</h5>
          {/* ToDo: replace with dynamic key, value pairs- create dynamic keys and values in the ratings state */}
        </div>
        <div className="rateProdAttrBody">
          <div className="rateProdAttrBodyHeader">
            {/* change with dynamic key */}
            <h6>Quality</h6>
            {/* Change with dynamic state key and value */}
            <RatingIndicators
              rating={this.state.ratings.quality || 0}
              typeOfWidget="star"
              widgetRatedColors="#21bc61"
              widgetHoverColors="#21bc61"
              widgetDimensions="22px"
              widgetSpacings="1px"
              changeRating={newRating => {
                this.handleRatingChange("quality", newRating);
              }}
            />
          </div>
        </div>
        <div className="rateProdAttrError">
          {errors["ratings"] ? (
            <span>Please rate all the attributes</span>
          ) : null}
        </div>
      </div>
    );
  };

  renderReviewTextBox = () => {
    const { errors } = this.state;
    return (
      <div className="reviewTextBoxContainer">
        <style jsx>{newLeaveReviewPageStyles}</style>
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
        <div className="reviewError">
          {errors["review"] && !this.state.formData.review.valid ? (
            <span>Atleast 25 characters</span>
          ) : null}
        </div>
      </div>
    );
  };

  renderCheckBox = () => {
    const { agreement } = this.state;
    const { errors } = this.state;
    return (
      <>
        <style jsx>{newLeaveReviewPageStyles}</style>
        <label style={{ verticalAlign: "middle" }}>
          <input
            type="checkbox"
            onChange={e =>
              this.setState({
                agreement: e.target.value === "yes" ? "no" : "yes"
              })
            }
            style={{
              height: "1.01rem",
              width: "1.01rem",
              verticalAlign: "middle"
            }}
            value={agreement}
            checked={agreement === "yes" ? true : false}
          />{" "}
          I accept the <a href="/">Terms &amp; conditions</a> and{" "}
          <a href="/">Privacy Policy.</a>
        </label>
        <div className="checkBoxError">
          {errors["agreement"] && this.state.agreement !== "yes" ? (
            <span>Please accept terms &amp; conditions</span>
          ) : null}
        </div>
      </>
    );
  };

  renderSubmitBtn = () => {
    return (
      <>
        <style jsx>{newLeaveReviewPageStyles}</style>
        <button className="reviewSubmitBtn" onClick={this.handleFormSubmit}>
          Submit your review
        </button>
      </>
    );
  };

  renderCheckBoxAndBtn = () => {
    return (
      <div className="checkBoxAndBtnContainer">
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="checkBoxContainer">{this.renderCheckBox()}</div>
            </div>
            <div className="col-md-6">
              <div className="submitBtnContainer">{this.renderSubmitBtn()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderUniversalLoader = () => {
    return (
      <UniversalLoader status={this.state.reviewSent}>
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
        <div style={{ textAlign: "center", color: "#21bc61" }}>
          Thank you for your review - we will contact with you soon{" "}
          <i className="fa fa-check"></i>
        </div>
        {/* third child for error state */}
        <div style={{ textAlign: "center", color: "red" }}>
          Some error occured, please try again later{" "}
          <i className="fa fa-close"></i>
        </div>
      </UniversalLoader>
    );
  };

  renderModal = () => {
    return (
      <CustomModal
        showModal={this.state.showModal}
        handleModalClose={this.handleModalVisibilityToggle}
        modalCustomStyles={{
          background: "#f9f9f9",
          border: "1px solid #fff",
          maxWidth: "450px"
        }}
      >
        <div style={{marginBottom:"5%", marginBottom:"5%"}}>
          <h6>The TrustSearch - Internet users check online reputation of websites.</h6>
        </div>
        <div style={{marginBottom:"5%"}}>
          {this.renderUniversalLoader()}
        </div>
      </CustomModal>
    );
  };

  render() {
    const { mainRating } = this.state.ratings;
    return (
      <div style={{ background: "#f5f5f5" }}>
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="container">
          {this.renderModal()}
          {this.renderReviewHeader()}
          {this.renderReviewHeroSection()}
          <div className="reviewContainerInner">
            {mainRating > 0
              ? this.renderFinalReviewSection()
              : this.renderMainReviewSection()}
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default NewLeaveReview;